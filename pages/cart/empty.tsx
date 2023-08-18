import { NextPage } from "next"
import { ShopLayouts } from "@/components/layouts"
import { Box, Typography } from "@mui/material"
import { RemoveShoppingCartOutlined } from "@mui/icons-material"
import Link from "next/link"

const EmptyPage: NextPage = () => {
    
    return (
        <ShopLayouts title="Carrito Vacio" pageDescription="No hay articulos en el carrito de compras">
            <Box sx={{ flexDirection: { xs: 'column', sm: 'row' } }} display={'flex'} justifyContent={'center'} alignItems={'center'} height='calc(100vh - 200px)' >
                <RemoveShoppingCartOutlined />
                <Box display={'flex'} flexDirection={'column'} alignItems={'center'} >
                    <Typography ml={1}>Su carrito esta vacio</Typography>
                    <Link href={'/'}>Regresar</Link>
                </Box>

            </Box>
        </ShopLayouts>
    )
}

export default EmptyPage