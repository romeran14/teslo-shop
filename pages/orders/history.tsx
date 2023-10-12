import { Grid, Typography, Chip } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp, GridRenderCellParams } from '@mui/x-data-grid';
import { ShopLayouts } from '@/components/layouts';
import Link from 'next/link';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullname', headerName: 'Nombre Completo', width: 300 },
    {
        field: 'paid', headerName: 'Pagado', description: 'Muestra la informacion si esta pagada o no', width: 200,
        renderCell: (params: GridRenderCellParams) => {
            return (params.row.paid ?
                <Chip color='success' label={'pagada'} variant='outlined' /> :
                <Chip color='error' label={'no pagada'} variant='outlined' />)
        }
    },
    {
        field: 'orden', headerName: 'Ver Orden', width: 200, sortable: false,
        renderCell: (params: GridRenderCellParams) => {
            return (<Link href={`/orders/${params.row._id}`} >Ver Orden</Link>)
        }
    },
]

interface Props {
    orders: IOrder[]
}

const HistoryPage: NextPage<Props> = ({ orders }) => {

    const rows: GridRowsProp = orders.map((order, index) => (
        {
            id: index + 1,
            paid: order.isPaid,
            fullname: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
            _id: order._id
        }
    ))

    return (
        <ShopLayouts title='Historial de ordenes' pageDescription={'Historial de ordenes'}>
            <Typography variant='h1' component='h1'>Historial de ordenes</Typography>
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
        </ShopLayouts>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps, NextPage } from 'next'
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { dbOrders } from '@/database';
import { IOrder } from '../../interfaces/order';

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {


    const session: any = await getServerSession(req, res, authOptions);

    if (!session) {
        return {
            redirect: {
                destination: '/auth/login?p=/orders/hitory',
                permanent: false
            }
        }
    }

    const orders = await dbOrders.getOrdersByUser(session.user._id)

    return {
        props: {
            orders
        }
    }
}
export default HistoryPage;