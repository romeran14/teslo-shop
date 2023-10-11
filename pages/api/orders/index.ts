import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import { IOrder } from '@/interfaces'
import { db, dbProducts } from '@/database';
import { Product, Order } from '@/models';
import mongoose from 'mongoose';

type Data =  { message: string } | IOrder


export default function (req: NextApiRequest, res: NextApiResponse<Data>) {


    switch (req.method) {
        case 'POST':
            return createOrder(req, res)

        default:
            res.status(400).json({ message: 'Bas Request' })
    }

}



const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { orderItems, total } = req.body as IOrder

    //Verificar la sesion del usuario
    const session: any = await getServerSession(req, res, authOptions);

    if (!session) {
        return res.status(401).json({ message: 'Debe estar autenticado' })
    }

    //Crear un arreglo con los productos del cliente
    const productsIds = orderItems.map(product => product._id)
    await db.connect()
    const dbProducts = await Product.find({ _id: { $in: productsIds } });
    
    try {
        const subTotal = orderItems.reduce((prev, current) => {
          
            const currentPrice = dbProducts.find(prod =>  new mongoose.Types.ObjectId(prod._id).toString() === current._id)!.price;

            if (!currentPrice) {
                throw new Error('verifique el carrito de nuevo, producto no existe')
            }

            return (currentPrice * current.quantity) + prev
        }, 0)

        const taxtRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
        const backendTotal = subTotal * (taxtRate + 1)

        if (total !== backendTotal) {
            throw new Error('El total no cuadra con el monto')
        }

        //Todo bien hasta este punto

        const userId = session.user._id
        const newOrder= new Order({...req.body, isPaid:false, user: userId})
        await newOrder.save()

        return res.status(201).json(newOrder)
    } catch (error: any) {
        await db.disconnect()
        console.log(error)
        res.status(400).json({
            message: error.message || 'Revise Logs del servidor'
        })
    }

    res.status(201).json(session)
}
