import { FC, useContext } from 'react';
import { initialData } from '@/database/seed-data';
import { Typography, Grid, CardActionArea, CardMedia, Box, Button } from '@mui/material';
import Link from 'next/link';
import { ItemCounter } from '../ui';
import { CartContext } from '@/context';
import { useProducts } from '@/hooks';
import { ICartProduct, IOrderItem } from '@/interfaces';

interface Props {
    editable?: boolean
    products?:IOrderItem[]
}


export const CartList: FC<Props> = ({editable = false, products }) => {

   const {cart,updateCartQuantity, removeCartProduct} = useContext(CartContext)

   const onNewCartQuantityValue  =(product:ICartProduct, newQuantityValue: number)=>{
      product.quantity = newQuantityValue
      updateCartQuantity(product)
   }

   const productsToShow = products? products : cart

    return (
        <>{
            productsToShow.map(product => (
                <Grid container spacing={2} sx={{ mb: 1 }} key={product.slug + product.size} >
                    <Grid item xs={3}>
                        <Link href={`/products/${product.slug}`} >
                            <CardActionArea>
                                <CardMedia
                                    image={product.image}
                                    component={'img'}
                                    sx={{ borderRadius:'5px' }}
                                />
                            </CardActionArea>
                        </Link>
                    </Grid>
                    <Grid item xs={7}>
                       <Box display='flex' flexDirection={'column'} >
                        <Typography variant='body1' >{product.title}</Typography>
                        <Typography variant='body1' >Talla<strong>{product.size}</strong></Typography>
                        { editable?  <ItemCounter currentValue={product.quantity}
                         maxValue={ 10} updatedQuantity={(value)=>onNewCartQuantityValue(product as ICartProduct, value)} />:<Typography variant='h5' >3 Items</Typography>}
                       
                       </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant='subtitle1' >{`$${ product.price }`}</Typography>
                        {editable && <Button onClick={()=>removeCartProduct(product as ICartProduct)} variant='text' color='secondary' >Remover</Button>}
                        
                    </Grid>
                </Grid>
            ))
        }</>
    )
}