import { NextPage } from "next"
import { ShopLayouts } from "@/components/layouts"
import {  Typography } from '@mui/material'
import { initialData } from "@/database/products"
import { ProductList } from "@/components/product"

const Home: NextPage = () => {
  return (
    <>
      <ShopLayouts title="Teslo-Shop - Home" pageDescription="Encuentra los mejores productos" >
        <Typography variant="h1" component={'h1'} >Tienda</Typography>
        <Typography variant="h2" sx={{ mb: 1 }} component={'h1'} >Todos los productos</Typography>

        <ProductList products={initialData.products as any} ></ProductList>
      </ShopLayouts>

    </>
  )
}

export default Home