import { NextPage, GetServerSideProps } from "next"
import { ShopLayouts } from "@/components/layouts"
import { Typography, Box } from '@mui/material'
import { ProductList } from "@/components/product"
import { useProducts } from "@/hooks"
import { FullScreenLoading } from "@/components/ui"
import { dbProducts } from "@/database"
import { IProduct } from "@/interfaces"

interface Props {
    products: IProduct[]
    foundProducts: boolean
    query: string
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {



    return (
        <>
            <ShopLayouts title="Teslo-Shop - Search" pageDescription="Encuentra los mejores productos" >
                <Typography variant="h1" component={'h1'} >Buscar Producto</Typography>
                {
                    !foundProducts ?
                        <Typography variant="h2" sx={{ mb: 1 }} textTransform={'capitalize'} component={'h1'} >{query}</Typography>
                        :
                        <Box display={'flex'} mb={1}>
                            <Typography variant="h2" sx={{ mb: 1 }} component={'h1'} >No encontramos ningun producto</Typography>
                            <Typography variant="h2" color={'secondary'} sx={{ mb: 1 }} component={'h1'} >{query}</Typography>
                        </Box>

                }

                <ProductList products={products} />
            </ShopLayouts>
        </>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { query = '' } = params as { query: string } // your fetch function here 

    if (query.length === 0) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    //Se hace let para cubrir el caso en el que nohay productos
    let products = await dbProducts.getProductByTerm(query)
    console.log(products)
    const foundProducts = products.length === 0
    if (foundProducts) {
        products = await dbProducts.getAllProducts()
    }


    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
}

export default SearchPage