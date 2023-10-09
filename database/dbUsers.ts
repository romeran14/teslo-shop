import {db} from './'
import { User } from '@/models';
import bcrypt from 'bcryptjs';

export const checkUserEmailPassword = async(email:string, password:string)=>{
   
    await db.connect();
    const user = await User.findOne({email})
    console.log('FIRST',user)
    await db.disconnect();

   if (!user) {
    return null
   }

   if ( !bcrypt.compareSync( password, user.password!)) {
      return null
   }

   const { role, name, _id} = user
   return{
    _id,//Se envia 2 veces el id por cuestiones de tipado
    id:_id,
    email: email.toLocaleLowerCase(),
    name,
    role
   }
}

//Esta funcion crea i verifica el usuario de oAuth

export const oAuthToDbUser = async(oAuthEmail:string, oAuthname:string)=>{
   
    await db.connect();
    const user = await User.findOne({email:oAuthEmail})

   if (user) {
    await db.disconnect();
    const { role, name, _id, email} = user
    return { role, name, _id, email}
   }
  // console.log('A CREAR',newUser)
   const newUser = new User({ email:oAuthEmail, name:oAuthname, password:'@',role:'client' })

   await newUser.save()
   await db.disconnect();

   const { _id, name, email, role} = newUser
   return {_id,name,email,role}
}