import { NextPage } from "next"
import { ShopLayouts } from "@/components/layouts"
import {  Typography } from '@mui/material'
import { ProductList } from "@/components/product"
import { useProducts } from "@/hooks"
import { FullScreenLoading } from "@/components/ui"


const KidsPage: NextPage = () => {

   const {products, isError, isLoading} = useProducts('/products?gender=kids',null)

  return (
    <>
      <ShopLayouts title="Teslo-Shop - Hombres" pageDescription="Encuentra los mejores productos para ninos" >
        <Typography variant="h1" component={'h1'} >Ninos</Typography>
        <Typography variant="h2" sx={{ mb: 1 }} component={'h1'} >Todos los productos - Ninos</Typography>

        {isLoading
          ? <FullScreenLoading/>
          :<ProductList products={products} />
        }
      </ShopLayouts>

    </>
  )
}

export default KidsPage