import { ShopLayouts } from '@/components/layouts';
import { TextField, Typography, Grid, FormControl, InputLabel, Select, MenuItem, Button, Box, Divider } from '@mui/material';
import { NextPage } from 'next';
import { countries } from '@/utils';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { CartContext } from '@/context';
import { useContext } from 'react';

type FormData = {
    firstName: string;
    lastName: string;
    address: string;
    address2: string;
    zip: string;
    city: string;
    country: string;
    phone: string;

}

const getAddressFromCookies = (): FormData => {
    return {
        firstName: Cookies.get('firstName') || '',
        lastName: Cookies.get('lastName') || '',
        address: Cookies.get('address') || '',
        address2: Cookies.get('address2') || '',
        zip: Cookies.get('zip') || '',
        city: Cookies.get('city') || '',
        country: Cookies.get('country') || countries[0].code,
        phone: Cookies.get('phone') || '',
    }
}

const AddressPage: NextPage = () => {

    const router = useRouter()

    const {updateAddress} = useContext(CartContext)

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
        defaultValues: getAddressFromCookies()
    });

    const onSubmitAddress = (data: FormData) => {


        updateAddress(data)
        router.push('/checkout/summary')
    }


    return (
        <ShopLayouts title='Direccion' pageDescription='Confirmar direccion del destino'>
            <form onSubmit={handleSubmit(onSubmitAddress)} >


                <Typography variant='h1' component={'h1'} >Direccion</Typography>
                <Divider />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label={'Nombre'} variant='filled' fullWidth
                            {...register('firstName', {
                                required: 'Este Campo es requerido',
                            })}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label={'Apellido'} variant='filled' fullWidth
                            {...register('lastName', {
                                required: 'Este Campo es requerido',
                            })}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label={'Direccion'} variant='filled' fullWidth
                            {...register('address', {
                                required: 'Este Campo es requerido',
                            })}
                            error={!!errors.address}
                            helperText={errors.address?.message}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label={'Direccion 2 (Opcional)'} variant='filled' fullWidth
                            {...register('address2', {
                                required: 'Este Campo es requerido',
                            })}
                            error={!!errors.address2}
                            helperText={errors.address2?.message}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label={'Codigo Postal'} variant='filled' fullWidth
                            {...register('zip', {
                                required: 'Este Campo es requerido',
                            })}
                            error={!!errors.zip}
                            helperText={errors.zip?.message}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth >
                            <InputLabel>
                                Pais
                            </InputLabel>
                            <TextField
                                select
                                defaultValue={countries[0].code}
                                variant='filled' label='Pais'
                                {...register('country', {
                                    required: 'Este Campo es requerido',
                                })}
                                error={!!errors.country}

                            >
                                {
                                    countries.map(country => (
                                        <MenuItem key={country.code} value={country.code}>
                                            {country.name}
                                        </MenuItem>
                                    ))
                                }


                            </TextField>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label={'Ciudad'} variant='filled' fullWidth
                            {...register('city', {
                                required: 'Este Campo es requerido',
                            })}
                            error={!!errors.city}
                            helperText={errors.city?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label={'Telefono'} variant='filled' fullWidth
                            {...register('phone', {
                                required: 'Este Campo es requerido',
                            })}
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                        />
                    </Grid>
                </Grid>
                <Box mt={5} display={'flex'}>
                    <Button type='submit' size='large' color='secondary' >Revisar pedido</Button>
                </Box>
            </form>
        </ShopLayouts>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
/*import { GetServerSideProps } from 'next'
import { isValidToken } from '../../utils/jwt';
import { jwt } from '@/utils';


export const getServerSideProps: GetServerSideProps = async ({req}) => {
    const {token = ''} = req.cookies;
    let userId = '';
    let isValidToken = false

    try {
        userId = await jwt.isValidToken(token)
        isValidToken = true
    } catch (error) {
        isValidToken = false
    }

    if ( !isValidToken) {
        return{
            redirect:{
                destination:"/auth/login?p=/checkout/address",
                permanent:false
            }
        }
    }

    return {
        props: {
            
        }
    }
}
*/
export default AddressPage