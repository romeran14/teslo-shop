import { db } from '@/database';
import { IProduct } from '@/interfaces';
import { Product } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
} | IProduct[]

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
    case 'GET':
        
        return getAllProducts(req,res)
   case 'PUT':
    case 'POST':
    default:
        res.status(400).json({ message: 'Bad request' })
   }

    
}

const  getAllProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    await db.connect()
    const products = await Product.find().sort({ title: 'asc'}).lean()
    await db.disconnect()

    //TODO: actualizar imagenes

    res.status(200).json(products);
}
