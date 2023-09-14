import { NextPage } from 'next';
import { ShopLayouts } from '@/components/layouts';
import { CardContent, Divider, Typography, Card, Grid, Button, Box } from '@mui/material';
import { CartList, OrdenSummary } from '@/components/cart';
import { useContext, useEffect } from 'react';
import { CartContext, cartReducer } from '@/context';
import { useRouter } from 'next/router';

const CartPage: NextPage = () => {

    const router = useRouter()

   const {isLoaded, numberOfItems, cart} = useContext(CartContext)

   useEffect(() => {
     if (isLoaded && cart.length === 0) {
        router.replace('/cart/empty')
     }
   }, [isLoaded, cart, router])
   
   if (!isLoaded || cart.length === 0) return (<></>)
    console.log('ssapo')
    return (
        <ShopLayouts title='Carrito - 3' pageDescription='Carrito de compras de la tienda'>
            <Typography variant='h1' component={'h1'}>Carrito</Typography>
            <Grid container>
                <Grid  item xs={12} sm={7}>
                   <CartList editable/>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summaryCard'>
                        <CardContent>
                            <Typography>Orden </Typography>
                                <Divider sx={{ my: 1 }}/>
                                <OrdenSummary/>
                                <Box sx={{ mt:3 }}>
                                    <Button href='/checkout/address' color="secondary" className='circular-btn' fullWidth> Checkout</Button>
                                </Box>
                           
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayouts>
    )
}

export default CartPage