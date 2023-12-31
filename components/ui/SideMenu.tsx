'use client'
import { Box, Divider, Drawer, Icon, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, DashboardOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { AuthContext, UIContext } from "@/context"
import { useContext, useState } from 'react'
import { useRouter } from "next/router"

export const SideMenu = () => {
    const { isMenuOpen, toggleSideMenu } = useContext(UIContext)
    const { user, isLoggedIn, logout } = useContext(AuthContext)
    const [searchTerm, setSearchTerm] = useState('')

    const router = useRouter()

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return

        NavigateTo(`/search/${searchTerm}`)
    }

    const NavigateTo = (url: string) => {

        router.push(url)
        toggleSideMenu()
    }

    return (
        <Drawer
            open={isMenuOpen}
            onClose={toggleSideMenu}
            anchor='right'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
        >
            <Box sx={{ width: 250, paddingTop: 5 }}>

                <List>

                    <ListItem>
                        <Input
                            autoFocus
                            type='text'
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value) }}
                            onKeyUp={(e) => e.key === "Enter" ? onSearchTerm() : null}
                            placeholder="Buscar..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={onSearchTerm}
                                    >
                                        <SearchOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </ListItem>
                    {isLoggedIn ? <>
                        <ListItem >
                            <ListItemIcon>
                                <AccountCircleOutlined />
                            </ListItemIcon>
                            <ListItemText primary={'Perfil'} />
                        </ListItem>

                        <ListItem  onClick={()=> NavigateTo('/orders/history')} >
                            <ListItemIcon>
                                <ConfirmationNumberOutlined />
                            </ListItemIcon>
                            <ListItemText primary={'Mis Ordenes'} />
                        </ListItem>
                    </> : null}

                    {isLoggedIn ? <>
                        <ListItem onClick={logout} >
                            <ListItemIcon  >
                                <LoginOutlined />
                            </ListItemIcon>
                            <ListItemText primary={'Salir'} />
                        </ListItem>
                    </> : <ListItem onClick={() => NavigateTo(`${router.asPath !== '/'? `/auth/login?p=${router.asPath}`:'/auth/login'}`)} >
                        <ListItemIcon>
                            <VpnKeyOutlined />
                        </ListItemIcon>
                        <ListItemText  primary={'Ingresar'} />
                    </ListItem>}


                    <ListItem onClick={() => NavigateTo('/category/men')} sx={{ display: { xs: '', sm: 'none' } }}>
                        <ListItemIcon>
                            <MaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Hombres'} />
                    </ListItem>

                    <ListItem onClick={() => NavigateTo('/category/women')} sx={{ display: { xs: '', sm: 'none' } }}>
                        <ListItemIcon>
                            <FemaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Mujeres'} />
                    </ListItem>

                    <ListItem onClick={() => NavigateTo('/category/kids')} sx={{ display: { xs: '', sm: 'none' } }}>
                        <ListItemIcon>
                            <EscalatorWarningOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Niños'} />
                    </ListItem>


                    {/* Admin */}
                    <Divider />
                    {user?.role === 'admin' ? <>
                        <ListSubheader>Admin Panel</ListSubheader>

                        <ListItem onClick={ () => NavigateTo('/admin/') }  >
                            <ListItemIcon>
                                <DashboardOutlined />
                            </ListItemIcon>
                            <ListItemText primary={'DashBoard'} />
                        </ListItem>
                        <ListItem onClick={ () => NavigateTo('/admin/products') } >
                            <ListItemIcon>
                                <CategoryOutlined />
                            </ListItemIcon>
                            <ListItemText primary={'Productos'} />
                        </ListItem>
                        <ListItem onClick={ () => NavigateTo('/admin/orders') } >
                            <ListItemIcon>
                                <ConfirmationNumberOutlined />
                            </ListItemIcon>
                            <ListItemText primary={'Ordenes'} />
                        </ListItem>

                        <ListItem onClick={ () => NavigateTo('/admin/users') }>
                            <ListItemIcon>
                                <AdminPanelSettings />
                            </ListItemIcon>
                            <ListItemText primary={'Usuarios'} />
                        </ListItem>
                    </> : null}

                </List>
            </Box>
        </Drawer>
    )
}