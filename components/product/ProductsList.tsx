import { IProduct } from '@/interfaces/products';
import { FC } from 'react';
import { ProductCard } from '.';
import { Grid } from '@mui/material';

interface Props {
  products:IProduct[]
}

export const ProductList:FC<Props>= ({ products }) => {
  return (

    <>     
    <Grid container spacing={4}>
    {products.map(product => (
        <ProductCard key={ product.slug } product={ product } ></ProductCard>
      ))}
         </Grid>
</>
  )
}