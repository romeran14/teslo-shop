import { ShopLayouts } from '@/components/layouts';
import { TextField, Typography, Grid, FormControl, InputLabel, Select, MenuItem, Button, Box, Divider } from '@mui/material';
import { NextPage } from 'next';
import { countries } from '@/utils';

const AddressPage: NextPage = () => {
    return (
        <ShopLayouts title='Direccion' pageDescription='Confirmar direccion del destino'>
            <Typography variant='h1' component={'h1'} >Direccion</Typography>
            <Divider/>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField label={'Nombre'} variant='filled' fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label={'Apellido'} variant='filled' fullWidth />
            </Grid>
            
            <Grid item xs={12} sm={6}>
                <TextField label={'Direccion'} variant='filled' fullWidth />
            </Grid>
            
            <Grid item xs={12} sm={6}>
                <TextField label={'Direccion 2 (Opcional)'} variant='filled' fullWidth />
            </Grid>
          
            <Grid item xs={12} sm={6}>
                <TextField label={'Codigo Postal'} variant='filled' fullWidth />
            </Grid>
          
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth >
                    <InputLabel>
                        Pais
                    </InputLabel>
                    <Select variant='filled' label='Pais' value={'cli'}
                    >
                        {
                            countries.map( country =>(
                                <MenuItem key={country.code} value={country.code}>
                                {country.name}
                            </MenuItem>
                            ))
                        }


                    </Select>
                </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
                <TextField label={'Ciudad'} variant='filled' fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label={'Telefono'} variant='filled' fullWidth />
            </Grid>
            </Grid>
            <Box mt={5} display={'flex'}>
                <Button size='large' color='secondary' >Revisar pedido</Button>
            </Box>
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