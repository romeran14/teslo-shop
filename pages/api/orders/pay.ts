import { db } from '@/database'
import { IPayPal } from '@/interfaces'
import { Order } from '@/models'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

type Data = {
    message: string
}

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch ( req.method) {
        case 'POST':
            
            return payOrder(req,res)
    
        default:
            res.status(400).json({ message: 'Bad Request' })
    }
    
}

const getPaypalBearerToken = async():Promise<string|null>=>{

    const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET

    const base64Token = Buffer.from(`${PAYPAL_CLIENT}:${PAYPAL_SECRET}`, 'utf-8').toString('base64')
    const body = new URLSearchParams('grant_type=client_credentials')

try {

    const {data} = await axios.post( process.env.PAYPAL_OAUTH_URL || '', body, {
        headers:{
            Authorization:`Basic ${base64Token}`,
            'Content-Type':'application/x-www-form-urlencoded',
        },
    });

    return data.access_token;
    
} catch (error) {
    if (axios.isAxiosError(error)) {
        console.log('axios',error.response?.data)
    }else{
       console.log(error)
    }
    return null
}}

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>)=> {

        //Verificar la sesion del usuario
        const session: any = await getServerSession(req, res, authOptions);

        if (!session) {
            return res.status(401).json({ message: 'Debe estar autenticado' })
        }

    const paypalBearerToken = await getPaypalBearerToken ()
    
    if (!paypalBearerToken) {
       return res.status(400).json({ message: 'No se pudo confirmar el token de paypal' })
    }

    const { transactionId='' , orderId='' } = req.body

    const {data}  = await axios.get<IPayPal.PaypalOrderStatusResponse>( `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`,{
            headers:{
                Authorization:`Bearer ${paypalBearerToken}`,//Cambie de Basic a Bearer
            },}
        )

  
    if ( data.status !== 'COMPLETED') {
        return res.status(401).json({ message: 'Orden no reconocida' })
    }

    await db.connect()
    const dbOrder = await Order.findById(orderId);

    if (!dbOrder) {
        await db.disconnect()
        return res.status(400).json({ message: 'Orden no existe' })
    }

    if( dbOrder.total !== Number(data.purchase_units[0].amount.value)){
        await db.disconnect()
        return res.status(400).json({ message: 'Los montos de la base de datos y paypal no coinciden' })
    }

    dbOrder.transactionId = transactionId
    dbOrder.isPaid = true
    await dbOrder.save()

    await db.disconnect()

    return res.status(200).json({ message: 'Orden pagada' })
}
