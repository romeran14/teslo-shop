import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { IconButton, Box, Typography } from '@mui/material';
import { FC } from 'react';

interface Props {
  props?:string
}

export const ItemCounter:FC<Props>= ({props}) => {
  return (
    <>
    <Box display='flex' >
        <IconButton>
            <RemoveCircleOutline/>
        </IconButton>
        <Typography sx={{ width:40, textAlign:'center'}}>1</Typography>
        <IconButton>
            <AddCircleOutline/>
        </IconButton>
    </Box>
    </>
  )
}