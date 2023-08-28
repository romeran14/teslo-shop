import { NextPage } from "next"
import { ShopLayouts } from "@/components/layouts"
import {  Typography } from '@mui/material'
import { ProductList } from "@/components/product"
import { useProducts } from "@/hooks"
import { FullScreenLoading } from "@/components/ui"


const MenPage: NextPage = () => {

   const {products, isError, isLoading} = useProducts('/products?gender=men',null)

  return (
    <>
      <ShopLayouts title="Teslo-Shop - Hombres" pageDescription="Encuentra los mejores productos para hombres" >
        <Typography variant="h1" component={'h1'} >Hombres</Typography>
        <Typography variant="h2" sx={{ mb: 1 }} component={'h1'} >Todos los productos - Hombres</Typography>

        {isLoading
          ? <FullScreenLoading/>
          :<ProductList products={products} />
        }
      </ShopLayouts>

    </>
  )
}

export default MenPage