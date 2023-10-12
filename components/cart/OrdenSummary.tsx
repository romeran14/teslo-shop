import { CartContext } from '@/context';
import { currency } from '@/utils';
import { Typography, Grid } from '@mui/material';
import { FC, useContext } from 'react';

interface Props {
  summary?:{
    subTotal:number;
     total:number;
      tax:number,
       numberOfItems:number
  }
}


export const OrdenSummary:FC<Props>= ({summary}) => {

  const { subTotal, total, tax, numberOfItems } = useContext(CartContext)

  const summaryValues = summary? summary : { subTotal, total, tax, numberOfItems }

  return (
    <Grid className='fadeIn' container>
        <Grid item xs={6}>
            <Typography>No.Productos</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>{summaryValues.numberOfItems} {summaryValues.numberOfItems > 1 ? 'productos':'producto'}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Subtotal</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>{ currency.format(summaryValues.subTotal) }</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE)*100} %)</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography> {currency.format(summaryValues.tax) }</Typography>
        </Grid>
        <Grid item xs={6} sx={{mt:2}}>
            <Typography variant='subtitle1' >Total</Typography>
        </Grid>
        <Grid item xs={6} sx={{mt:2}}>
            <Typography variant='subtitle1' >{currency.format(summaryValues.total)}</Typography>
        </Grid>
    </Grid>
  )
}