import NextLink from 'next/link';
import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../../components/layouts'
import { useForm } from 'react-hook-form';
import { validations } from '@/utils';
import { tesloApi } from '@/axiosApi';
import { ErrorOutline, Route } from '@mui/icons-material';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/context';
import { useRouter } from 'next/router';
import {signIn, getSession, getProviders} from 'next-auth/react'


type FormData = {
    email: string,
    password: string,
  };

const LoginPage = () => {

    const router = useRouter()
    //Destino a pagina de la cual proviene el usuario
 //   const destination = router.query.p?.toString() || '/'

  //  const { loginUser } = useContext(AuthContext)

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
    const [showError, setshowError] = useState(false)

    const [providers, setProviders] = useState<any>({})

    useEffect(() => {
      getProviders().then( prov =>{
        console.log({prov})
        setProviders(prov)
      })
    }, [])
    

const onLoginUser = async({email,password}:FormData)=>{

    setshowError(false)
/*
    const isValidLogin = await loginUser(email,password)
    if (!isValidLogin) {
        setshowError(true)
        setTimeout(() => {
            setshowError(false)
        }, 3000);
    }
    
    router.replace(destination)
    */
   signIn('credentials', {email,password})
}
    
  return (
    <AuthLayout title={'Ingresar'}>
        <form onSubmit={handleSubmit(onLoginUser)}>
        <Box sx={{ width: 350, padding:'10px 20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <br></br>
                    <br></br>
                    <Typography variant='h1' component="h1">Iniciar Sesión</Typography>
                    <Chip 
                    label={'no se reconoce este usuario o contrasena'}
                    color='error'
                    icon={<ErrorOutline/>}
                    className='fadeIn'
                    sx={{ display:showError ? 'flex':'none'}}
                    ></Chip>
                </Grid>

                <Grid item xs={12}>
                    <TextField type='email' {...register('email',{
                        required:'Este Campo es requerido',
                        validate:(val)=>validations.isEmail(val)
                    })} label="Correo" variant="filled" fullWidth 
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    >fernando@google.com</TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                     {...register('password',{
                        required:'Este Campo es requerido',
                        minLength:{value:6, message:"Minimo 6 caracteres"}
                    })}
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                    label="Contraseña" type='password' variant="filled" fullWidth >
                        123456</TextField>
                </Grid>

                <Grid item xs={12}>
                    <Button type='submit' color="secondary" className='circular-btn' size='large' fullWidth>
                        Ingresar
                    </Button>
                </Grid>

                <Grid item xs={12} display='flex' justifyContent='end'>
                    <NextLink  href={`${router.query.p? `/auth/register?p=${router.query.p}`: '/auth/register'}`} >
                        
                            ¿No tienes cuenta?
                       
                    </NextLink>
                </Grid>
                <Grid item xs={12} display={'flex'} flexDirection={'column'} justifyContent={'end'}>
                    <Divider sx={{width:'100%',mb:2}}></Divider>
                    {
                        Object.values(providers).map((provider:any)=>{

                           if (provider.id=== 'credentials') return(<div key='credentials'></div>)

                           return(
                           <Button
                           key={provider.id}
                           variant='outlined'
                           fullWidth
                           color='primary'
                           sx={{mb:1}}
                           onClick={()=>signIn(provider.id)}
                           >
                            {provider.name}
                           </Button>)
                        })
                    }
                </Grid>
            </Grid>
        </Box>
        </form>

    </AuthLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({req,query}) => {
    const session = await getSession({req}) // your fetch function here 

    const { p='/'} = query;
    if( session ) {
        return{
            redirect:{
                destination:p.toString(),
                permanent:false
            }
        }
    }
    return {
        props: { }
    }
}

export default LoginPage