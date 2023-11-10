import { db } from '@/database';
import { IUser } from '@/interfaces';
import { User } from '@/models';
import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'


type Data = {
    message: string
} | IUser[]

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  
    switch (req.method) {
        case 'GET':
            return getUsers(req, res);
        case 'PUT':
            return updateUser(req, res);



        default:
            return res.status(400).json({ message: 'Bad Request' })
    }
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect()
    const users = await User.find().select('-password').lean()
    await db.disconnect()

    return res.status(200).json(users)
}

const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { userId = '', role = '' } = req.body

    if (!isValidObjectId(userId)) {
        return res.status(400).json({ message: 'no existe usuario' })
    }

    const validRoles = ['admin', 'super-user', 'SEO', 'client'];


    if (!validRoles.includes(role)) {
        return res.status(400).json({ message: 'rol no permitido' })
    }

    await db.connect()
    const user = await User.findById(userId)

    if (!user) {
        await db.disconnect()
        return res.status(400).json({ message: 'rol no permitido' })
    }

    user.role = role
    await user.save();
    await db.disconnect()

    return res.status(200).json({ message: 'usuario actualizado' })
}

