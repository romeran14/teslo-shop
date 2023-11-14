import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ShopLayouts } from '@/components/layouts';
import { ProductSlideShow, SizeSelector } from '@/components/product';
import { ItemCounter } from '@/components/ui';
import { IProduct, ICartProduct, ISize } from '@/interfaces';
import { NextPage } from 'next';
import { dbProducts } from '@/database';
import { GetStaticProps } from 'next'
import { useState, useContext } from 'react';
import { CartContext } from '@/context';
import { useRouter } from 'next/router';


interface Props {
  product: IProduct
}

const ProductPage: NextPage<Props> = ({ product }) => {

  const {addProductToCart} = useContext(CartContext)

   const router = useRouter()
 /*
   const { products:product, isLoading} = useProducts(`/products/${router.query.slug }`)*/

   const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price:product.price,
    size:undefined,
    slug:product.slug,
    title:product.title,
    gender:product.gender,
    quantity:1

   })

   const selectedSize = (size:ISize)=>{
    setTempCartProduct( currentProduct =>({
      ...currentProduct,
      size
    }))
   }

   const updateQuantity = (quantity:number)=>{
    setTempCartProduct( currentProduct =>({
      ...currentProduct,
      quantity
    }))
   }

   const onAddProduct = () => {
   
    if ( !tempCartProduct.size) {
      return
    }
    addProductToCart(tempCartProduct)
    router.push('/cart')
   }

  return (
    <ShopLayouts title={product.title} pageDescription={product.description}>

      <Grid container spacing={3}>

        <Grid item xs={12} sm={7}>
          <ProductSlideShow
            images={product.images}
          />

        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>

            {/* titulos */}
            <Typography variant='h1' component='h1'>{product.title}</Typography>
            <Typography variant='subtitle1' component='h2'>{`$${product.price}`}</Typography>

            {/* Cantidad */}
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Cantidad</Typography>
              <ItemCounter
              currentValue={tempCartProduct.quantity}
              updatedQuantity={updateQuantity}
              maxValue={product.inStock}
              />
              <SizeSelector
                selectedSize={ tempCartProduct.size}
                sizes={product.sizes}
                onSelectedSize={ (size)=> selectedSize(size)}
              />

            </Box>


            {/* Agregar al carrito */}
            {product.inStock > 0 ?
              <Button color="secondary" onClick={ onAddProduct } className='circular-btn'>
               {
                 tempCartProduct.size ?
                 'Agregar al carrito':'Seleccione una talla'}
              </Button>
              : <Chip label="No hay disponibles" color="error" variant='outlined' />
            }


            {/* */}

            {/* Descripción */}
            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle2'>Descripción</Typography>
              <Typography variant='body2'>{product.description}</Typography>
            </Box>

          </Box>
        </Grid>


      </Grid>

    </ShopLayouts>
  )
}
/*
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next'


export const getServerSideProps: GetServerSideProps = async ({params}) => {

  const {slug = ''} = params as { slug: string };
  const product = await dbProducts.getProductBylug(slug)

  if (!product) {
    return {
      redirect:{
        destination:'/404',
        permanent:false
      }
    };
  }

  return {
    props: {
      product
    }
  }
}
*/
export default ProductPage

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
import { GetStaticPaths } from 'next'

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const slugs = await dbProducts.getAllProductsSlugs()


  return {
    paths: slugs.map(({ slug }) => ({
      params: { slug }
    })),
    fallback: "blocking",
  }
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.


export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug.toString())

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24
  }
}