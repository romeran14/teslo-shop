import { FC, PropsWithChildren, useReducer, useEffect } from 'react';
import { AuthContext, authReducer } from './';
import { IUser } from '@/interfaces';
import { tesloApi } from '@/api';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';

export interface AuthState {
    isLoggedIn:boolean;
    user?:IUser
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn:false,
    user:undefined
}


const AuthProvider:FC<PropsWithChildren> = ({children}) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)

    useEffect(() => {
        checkToken()
    }, [])
    
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
      Cookies.remove('token')
      Cookies.remove('cart')
      dispatch({type:'[Auth] - Logout'})
      router.reload
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