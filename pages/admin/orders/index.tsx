import { AdminLayouts } from '@/components/layouts'
import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Chip, Grid } from '@mui/material';
import { NextPage } from 'next';
import { DataGrid, GridColDef, GridRowsProp, GridRenderCellParams } from '@mui/x-data-grid';
import { IOrder, IUser } from '@/interfaces';
import useSWR from 'swr';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Orden Id', width: 250 },
    { field: 'email', headerName: 'Correo', width: 250 },
    { field: 'name', headerName: 'Nombre', width: 300 },
    { field: 'total', headerName: 'Monto Total', width: 300 },
    {
        field: 'iPaid', headerName: 'Pagada', width: 300,
        renderCell: (params: GridRenderCellParams) => {
            return (
                params.row.isPaid ? (<Chip variant='outlined' label='Pagada' color='success'></Chip>) :
                    (<Chip variant='outlined' label='Pendiente' color='error'></Chip>)
            )
        }
    },
    { field: 'noProducts', headerName: 'No.Productos', width: 100, align: 'center' },
    {
        field: 'check', headerName: 'Ver Orden', width: 150,
        renderCell: (params: GridRenderCellParams) => {
            return (<a href={`/admin/orders/${params.row.id}`} target='_blank' rel='noreferrer'>
                Ver Orden
            </a>)
        }
    },
    { field: 'createdAt', headerName: 'Creadad en:', width: 300 },

]

const OrdersPage: NextPage = () => {

    const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

    if (!data && !error) {
        return <></>
    }

    const rows = data!.map( order => ({
        id    : order._id,
        email : (order.user as IUser).email,
        name  : (order.user as IUser).name,
        total : order.total,
        isPaid: order.isPaid,
        noProducts: order.numberOfItems,
        createdAt: order.createdAt,
    }));


    return (
        <AdminLayouts title={'Ordenes'} subTitle={'mantenimiento ordenes'} icon={<ConfirmationNumberOutlined />}>
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

export default OrdersPage