import NextLink from 'next/link';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../../components/layouts'
import { tesloApi } from '@/api';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { validations } from '@/utils';
import { ErrorOutline } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context';

type FormData = {
    email: string;
    password: string;
    name:string;
  };


const RegisterPage = () => {

    const router = useRouter()
    const destination = router.query.p?.toString() || '/'
     console.log(destination)
    const { registerUser } = useContext(AuthContext)

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
    const [showError, setshowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onRegisterForm = async ({name, email,password,}:FormData)=>{
        setshowError(false)
        
        const {hasError, message} = await registerUser(name,email, password)
        
        if (hasError) {
            setshowError(true)
            setErrorMessage( message || '' )
            setTimeout(() => {
                setshowError(false)
            }, 3000);
            return
        }
        router.replace(`..${destination}`)
    }


  return (
    <AuthLayout title={'Ingresar'}>
        <form onSubmit={handleSubmit(onRegisterForm)}  >
        <Box sx={{ width: 350, padding:'10px 20px' }}>
            <Grid container spacing={2}>
            <Chip 
                    label={'no se reconoce este usuario o contrasena'}
                    color='error'
                    icon={<ErrorOutline/>}
                    className='fadeIn'
                    sx={{ display:showError ? 'flex':'none'}}
                    ></Chip>
                <Grid item xs={12}>
                    <Typography variant='h1' component="h1">Crear cuenta</Typography>
                </Grid>

                <Grid item xs={12}>
                <TextField type='text' {...register('name',{
                        required:'Este Campo es requerido',
                        minLength:{value:3, message:"Minimo 3 caracteres"}
                    })} label="Nombre" variant="filled" fullWidth 
                    error={!!errors.name}
                    helperText={errors.name?.message}></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField type='email' {...register('email',{
                        required:'Este Campo es requerido',
                        validate:(val)=>validations.isEmail(val)
                    })} label="Correo" variant="filled" fullWidth 
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField {...register('password',{
                        required:'Este Campo es requerido',
                        minLength:{value:6, message:"Minimo 6 caracteres"}
                    })}
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                    label="Contraseña" type='password' variant="filled" fullWidth />
                </Grid>

                <Grid item xs={12}>
                    <Button color="secondary" type='submit' className='circular-btn' size='large' fullWidth>
                        Registrar
                    </Button>
                </Grid>

                <Grid item xs={12} display='flex' justifyContent='end'>
                    <NextLink  href={`${router.query.p? `/auth/login?p=${router.query.p}`: '/auth/login'}`} >
                            ¿Ya tienes cuenta?
                    </NextLink>
                </Grid>
            </Grid>
        </Box>
        </form>

    </AuthLayout>
  )
}

export default RegisterPage