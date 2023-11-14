import { AdminLayouts } from '@/components/layouts'
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, CardMedia, Grid } from '@mui/material';
import { NextPage } from 'next';
import { DataGrid, GridColDef, GridRowsProp, GridRenderCellParams } from '@mui/x-data-grid';
import {  IProduct, IUser } from '@/interfaces';
import useSWR from 'swr';
import Link from 'next/link';

const columns: GridColDef[] = [
    { field: 'img', headerName: 'Foto',
    renderCell: (params: GridRenderCellParams) => {
        return (
           <a href={`/products/${ params.row.slug }`} target='_blank' rel='noreferrer'>
             <CardMedia component={'img'} className='fadeIn' image={`/products/${ params.row.img }`} />
           </a>
        )
    }},
    { field: 'title', headerName: 'Title', width: 250,
    renderCell: (params: GridRenderCellParams) => {
        return (
           <Link href={`/admin/products/${ params.row.slug }`} >
            {`${ params.row.title }`}
           </Link>
        )
    }
},
    { field: 'gender', headerName: 'Genero'},
    { field: 'type', headerName: 'Tipo' },
    { field: 'inStock', headerName: 'Inventario'},
    { field: 'price', headerName: 'Precio'},
    { field: 'sizes', headerName: 'Tallas', width: 250 },
]

const ProductsPage: NextPage = () => {

    const { data, error } = useSWR<IProduct[]>('/api/admin/products');

    if (!data && !error) {
        return <></>
    }

    const rows = data!.map( product => ({
        id    : product._id,
        img : product.images[0],
        title  : product.title,
        gender : product.gender,
        type: product.type,
        isStock: product.inStock,
        price: product.price,
        sizes:product.sizes.join(', '),
        slug:product.slug,
    }));


    return (
        <AdminLayouts title={`Productos (${ data?.length })`} subTitle={'mantenimiento de productos'} icon={<CategoryOutlined />}>
           <Box display={'flex'} justifyContent={'end'} sx={{ mb:2}}>
            <Button href='/admin/products/new' color='secondary' startIcon={<AddOutlined/>}>
                Crear Producto
            </Button>
           </Box>
            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{ height: 65, width: "100%" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 5 }
                            },
                        }}
                        pageSizeOptions={[5, 10, 25]}
                        autoHeight
                    />
                </Grid>
            </Grid>
        </AdminLayouts>
    )
}

export default ProductsPage