import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { db } from "@/database";
import { Product } from "../../../models";
import { IProduct } from "@/interfaces";


type Data =
    | { message: string } |
    IProduct | null 


export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {

        case 'GET':

            return returnProduct(req, res);

        default:
            return res.status(400).json({ message: 'Metodo no existe' })
    }

}

const returnProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { slug } = req.query;

    await db.connect()
    const product = await Product.findOne({slug}).lean()
    await db.disconnect()

    if (!product) {
        return res.status(400).json({ message: 'No hay ese producto' })
    }


    try {

        product.images = product.images.map(image => {
            return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`
        })
       res.status(200).json(product)

    } catch (error:any) {
        console.log(error)
        res.status(400).json({ message: error.errors.status.message})
    }

    
}