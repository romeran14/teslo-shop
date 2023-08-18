import { Typography, Grid } from '@mui/material';
import { FC } from 'react';

interface Props {
  props?:string
}

export const OrdenSummary:FC<Props>= ({props}) => {
  return (
    <Grid>
        <Grid item xs={6}>
            <Typography>No.Productos</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Subtotal</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Impuestos(15%)</Typography>
        </Grid>
        <Grid item xs={6} sx={{mt:2}}>
            <Typography variant='subtitle1' >Total</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant='subtitle1' >{`$${1255.55}`}</Typography>
        </Grid>
    </Grid>
  )
}