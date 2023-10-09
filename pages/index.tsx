import { NextPage } from "next"
import { ShopLayouts } from "@/components/layouts"
import {  Button, Typography } from '@mui/material'
import { ProductList } from "@/components/product"
import { useProducts } from "@/hooks"
import { FullScreenLoading } from "@/components/ui"


const Home: NextPage = () => {


   const {products,  isLoading} = useProducts('/products',null)

  return (
    <>
      <ShopLayouts title="Teslo-Shop - Home" pageDescription="Encuentra los mejores productos" >
        <Typography variant="h1" component={'h1'} >Tienda</Typography>
        <Button onClick={()=> alert('sapo')}>SApo</Button>
        <Typography variant="h2" sx={{ mb: 1 }} component={'h1'} >Todos los productos</Typography>

        {isLoading
          ? <FullScreenLoading/>
          :<ProductList products={products} />
        }
      </ShopLayouts>

    </>
  )
}

export default Home