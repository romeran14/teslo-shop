import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database';
import { Order } from '@/models';
import { IOrder } from '@/interfaces';

type Data = {
    message: string
} | IOrder[]

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            
           return getOrder(req,res)
    
        default:
            return  res.status(400).json({ message: 'Bad Request' })
    }
   
}

const  getOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    await db.connect()
    const orders = await Order.find().sort({ createdAt:'desc'}).populate('user','name email').lean()
    return  res.status(200).json(orders)
    await db.disconnect()
}
