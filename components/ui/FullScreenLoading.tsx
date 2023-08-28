import { FC } from 'react';
import { Box, CircularProgress, Typography, Backdrop } from '@mui/material';


export const FullScreenLoading: FC = () => {
    return (
        <>

            <Backdrop
                open
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backdropFilter:'blur(5px)', backgroundColor:'#ffffff1f' }}
            >
                <Typography color={'black'} variant='h5' fontWeight={'500'} mr={1}>Cargando </Typography>
                <CircularProgress  color={'secondary'} thickness={4}></CircularProgress>
            </Backdrop>
        </>
    )
}