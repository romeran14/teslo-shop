import { FC, PropsWithChildren, useReducer, useEffect } from 'react';
import { AuthContext, authReducer } from './';
import { IUser } from '@/interfaces';
import { tesloApi } from '@/axiosApi';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';


export interface AuthState {
    isLoggedIn:boolean;
    user?:IUser
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn:false,
    user:undefined
}


const AuthProvider:FC<PropsWithChildren> = ({children}) => {

  const {data, status} = useSession()
  
  useEffect(() => {
    if ( status === "authenticated") {
      dispatch({type: '[Auth] - Login', payload: data?.user as IUser})
     console.log(data)
    }
  }, [status,data])
  

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)
    //SE CAMBIO LA AUTENTICACION A NEXTAUTH
/* 
    useEffect(() => {
        checkToken()
    }, [])
  */  
    const router = useRouter()

    const checkToken =async ()=>{
      if (!Cookies.get('token')) {
        return  
      }
       
        try {

            const {data} = await tesloApi.get('/user/validate_token')
            const {token:newToken, user } = data
            Cookies.set('token',newToken)
            dispatch({type:'[Auth] - Login',payload:user})
          } catch (error) {
            Cookies.remove('token')
          }
    }

    const loginUser = async ( email:string, password:string):Promise<boolean>=>{
      try {
        const {data} = await tesloApi.post('/user/login',{ email, password})
        const {token, user } = data
        Cookies.set('token',token)
        dispatch({type:'[Auth] - Login',payload:user})
        return true
      } catch (error) {
        return false
      }
    }

    const logout = async ()=>{
     // Cookies.remove('token')
      Cookies.remove('cart')
      Cookies.remove('firstName')
      Cookies.remove('lastName')
      Cookies.remove('address')
      Cookies.remove('address2')
      Cookies.remove('zip')
      Cookies.remove('city')
      Cookies.remove('country')
      Cookies.remove('phone')
      dispatch({type:'[Auth] - Logout'})
    //  router.reload
      signOut()
    }

    const registerUser = async (name:string, email:string, password:string ):Promise<{hasError:boolean, message?:string}>=>{
        try {
          const {data} = await tesloApi.post('/user/register',{name, email, password})
          const {token, user } = data
          Cookies.set('token',token)
          dispatch({type:'[Auth] - Login',payload:user})
          return{
            hasError:false,
        }
        } catch (error) {

            if (axios.isAxiosError(error)) {
                return{
                    hasError:true,
                    message:error.response?.data.message
                }
            }
            return{
                hasError:true,
                message:'No se pudo crear el usuario'
            }
        }
      }

  return (
  <AuthContext.Provider value={{
    ...state,
    //Methods
    loginUser,
    registerUser,
    logout
    }}>
    {children}
  </AuthContext.Provider>
  )
}

export default AuthProvider