import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { IconButton, Box, Typography } from '@mui/material';
import { FC } from 'react';

interface Props {
  currentValue: number;
  maxValue: number;
  updatedQuantity: (quantity: number) => void

}

export const ItemCounter: FC<Props> = ({ currentValue, maxValue, updatedQuantity }) => {

  const addProduct = () => {

    if (currentValue < maxValue) {
      updatedQuantity(currentValue + 1)
    }
  }

  const removeProduct = () => {
    if (currentValue > 1) {
      updatedQuantity(currentValue - 1)
    }

  }

  return (
    <>
      <Box display='flex' >
        <IconButton onClick={removeProduct} >
          <RemoveCircleOutline />
        </IconButton>
        <Typography sx={{ width: 40, textAlign: 'center' }}>{currentValue}</Typography>
        <IconButton onClick={addProduct}>
          <AddCircleOutline />
        </IconButton>
      </Box>
    </>
  )
}