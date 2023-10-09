import NextLink from 'next/link';
import { Link, Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import { ShopLayouts } from '@/components/layouts';
import { CartList, OrdenSummary } from '@/components/cart';
import { useContext, useEffect, useMemo } from 'react';
import { CartContext } from '@/context';
import { countries } from '@/utils';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const SummaryPage = () => {
    const router = useRouter()
    const {shippingAddress, numberOfItems} = useContext(CartContext)

    useEffect(() => {
      if ( !Cookies.get('firstName')) {
        router.push('/checkout/address')
      }
    }, [router])
    

    if (!shippingAddress) {
        return <></>
    }

  const country =  countries.find( item => item.code === shippingAddress.country)
  const countryName = country?.name

  return (
    <ShopLayouts title='Resumen de orden' pageDescription={'Resumen de la orden'}>
        <Typography variant='h1' component='h1'>Resumen de la orden</Typography>

        <Grid container>
            <Grid item xs={ 12 } sm={ 7 }>
                <CartList editable={false} />
            </Grid>
            <Grid item xs={ 12 } sm={ 5 }>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resumen ({numberOfItems})</Typography>
                        <Divider sx={{ my:1 }} />

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Dirección de entrega</Typography>
                            <NextLink href='/checkout/address' >
                                    Editar
                            </NextLink>
                        </Box>

                        
                        <Typography>{shippingAddress.firstName} {shippingAddress.lastName}</Typography>
                        <Typography>{shippingAddress.address}</Typography>
                        <Typography>{shippingAddress.address2}</Typography>
                        <Typography>{shippingAddress.city} {shippingAddress.zip}</Typography>
                        <Typography>{countryName}</Typography>
                        <Typography>{shippingAddress.phone}</Typography>

                        <Divider sx={{ my:1 }} />

                        <Box display='flex' justifyContent='end'>
                            <NextLink href='/cart' >
                                    Editar
                            </NextLink>
                        </Box>

                        <OrdenSummary />

                        <Box sx={{ mt: 3 }}>
                            <Button color="secondary" className='circular-btn' fullWidth>
                                Confirmar Orden
                            </Button>
                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>


    </ShopLayouts>
  )
}

export default SummaryPage;