import {  Grid, Typography, Chip } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp,  GridRenderCellParams } from '@mui/x-data-grid';
import { ShopLayouts } from '@/components/layouts';
import Link from 'next/link';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullname', headerName: 'Nombre Completo', width: 300 },
    {
        field: 'paid', headerName: 'Pagado', description: 'Muestra la informacion si esta pagada o no', width: 200,
           renderCell: (params: GridRenderCellParams) => {
            return (params.row.paid ? 
              <Chip color='success' label={'pagada'} variant='outlined'/>:
              <Chip color='error' label={'no pagada'} variant='outlined'/>)
        }
    },
    {
        field: 'orden', headerName: 'Ver Orden', width: 200, sortable:false,
           renderCell: (params: GridRenderCellParams) => {
            return (<Link href={`/orders/${ params.row.id }`} >Ver Orden</Link>)
        }
    },
]

const rows: GridRowsProp = [
    { id: 1, paid: true, fullname: 'Fernando Herrera' },
    { id: 2, paid: true, fullname: 'Fernando Herrera' },
    { id: 3, paid: true, fullname: 'Fernando Herrera' },
    { id: 4, paid: true, fullname: 'Fernando Herrera' },
    { id: 5, paid: false, fullname: 'Fernando Herrera' },
]

const HistoryPage = () => {
    return (
        <ShopLayouts title='Historial de ordenes' pageDescription={'Historial de ordenes'}>
            <Typography variant='h1' component='h1'>Historial de ordenes</Typography>
            <Grid container>
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

export default HistoryPage;