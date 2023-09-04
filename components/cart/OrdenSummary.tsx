import { CartContext } from '@/context';
import { currency } from '@/utils';
import { Typography, Grid } from '@mui/material';
import { FC, useContext } from 'react';

interface Props {
  props?:string
}

export const OrdenSummary:FC<Props>= ({props}) => {

  const { subTotal, total, tax, numberOfItems } = useContext(CartContext)
  return (
    <Grid container>
        <Grid item xs={6}>
            <Typography>No.Productos</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>{numberOfItems} {numberOfItems > 1 ? 'productos':'producto'}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Subtotal</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>{ currency.format(subTotal) }</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE)*100} %)</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography> {currency.format(tax) }</Typography>
        </Grid>
        <Grid item xs={6} sx={{mt:2}}>
            <Typography variant='subtitle1' >Total</Typography>
        </Grid>
        <Grid item xs={6} sx={{mt:2}}>
            <Typography variant='subtitle1' >{currency.format(total)}</Typography>
        </Grid>
    </Grid>
  )
}