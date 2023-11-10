import { tesloApi } from '@/api';
import { AdminLayouts } from '@/components/layouts'
import { IUser } from '@/interfaces';
import { PeopleOutline } from '@mui/icons-material'
import { Grid, MenuItem, Select } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp, GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

const UsersPage = () => {

    const { data, error } = useSWR<IUser[]>('/api/admin/users');

    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
        if (data) {
            setUsers(data)
        }
    }, [data])


    if (!data && !error) {
        return <></>
    }

    const onRoleUpdated = async (userId: string, newRole: string) => {

        const previousUser = users.map(user => ({ ...user }))
        const updatedUsers = users.map(user => ({
            ...user,
            role: userId === user._id ? newRole : user.role
        }))

        setUsers(updatedUsers)

        try {
            await tesloApi.put('/admin/users', { userId, role: newRole })
        } catch (error) {
            console.log('no se pudo actualizar el rol del usuario')
            setUsers(previousUser)
        }
    }

    const columns: GridColDef[] = [
        { field: 'email', headerName: 'Correo', width: 250 },
        { field: 'name', headerName: 'Nombre', width: 300 },
        {
            field: 'role', headerName: 'Correo', width: 300,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <Select
                        value={params.row.role}
                        label="Rol"
                        onChange={({ target }) => onRoleUpdated(params.row.id, target.value)}
                        sx={{ width: '300px' }}
                    >
                        <MenuItem value='admin' >Admin</MenuItem>
                        <MenuItem value='client' >Client</MenuItem>
                        <MenuItem value='super-user' >Super User</MenuItem>
                        <MenuItem value='SEO' >SEO</MenuItem>
                    </Select>
                )
            }
        },]

    const rows = users!.map(user => ({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
    }))


    return (
        <AdminLayouts title={'Usuarios'} subTitle={'Mantenimientode usuarios'} icon={<PeopleOutline />}>
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

export default UsersPage