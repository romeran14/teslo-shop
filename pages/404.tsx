import { ShopLayouts } from "@/components/layouts"
import { Box, Typography } from "@mui/material"
const Custom404 = () => {
    return (
        <ShopLayouts title="Page not found" pageDescription="no hay nada que mostrar aqui">
            <Box display={'flex'} flexDirection={{xs:"column", sm:'row'}} justifyContent={'center'} alignItems={'center'} height='calc(100vh - 200px)' >
                <Typography variant="h1" component={'h1'} fontSize={'150'} fontWeight={'200'}>404 | </Typography>
                <Typography ml={1}>No se encontro ninguna pagina</Typography>
            </Box>
        </ShopLayouts>
    )
}

export default Custom404