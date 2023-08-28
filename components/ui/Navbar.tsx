import { ClearOutlined, SearchOutlined, ShoppingCart } from "@mui/icons-material"
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Badge, InputAdornment, Input } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import { UIContext } from "@/context"
import { useContext, useState } from 'react'


const Navbar = () => {
    const { toggleSideMenu } = useContext(UIContext)
    const { pathname, push } = useRouter()

    const [searchTerm, setSearchTerm] = useState('')
    const [isSearchVisible, setIsSearchVisible] = useState(false)

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return
        push(`/search/${searchTerm}`)
    }

    return (
        <AppBar>
            <Toolbar>
                <Link href={'/'} >
                    <Typography variant="h6" >
                        Teslo |
                    </Typography>
                    <Typography sx={{ marginLeft: 0.5 }} >
                        Shop
                    </Typography>
                </Link>
                <Box flex={1} />

                <Box className="fadeIn" sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }} >
                    <Link href={'/category/men'}>
                        <Button color={pathname === '/category/men' ? 'primary' : 'info'}>
                            Hombres
                        </Button>
                    </Link>
                    <Link href={'/category/women'}>
                        <Button color={pathname === '/category/women' ? 'primary' : 'info'}>
                            Mujeres
                        </Button>
                    </Link>
                    <Link href={'/category/kids'}>
                        <Button color={pathname === '/category/kids' ? 'primary' : 'info'}>
                            Ninos
                        </Button>
                    </Link>
                </Box>
                <Box flex={1} />
                {/*Pantallas grandes */}
                {
                    isSearchVisible ? (
                        <Input
                            autoFocus
                            type='text'
                            className="fadeIn"
                            value={searchTerm}
                            sx={{ display: { xs: 'none', sm: 'flex' } }} 
                            onChange={(e) => { setSearchTerm(e.target.value) }}
                            onKeyUp={(e) => e.key === "Enter" ? onSearchTerm() : null}
                            placeholder="Buscar..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setIsSearchVisible(false)}
                                    >
                                        <ClearOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    ) : (
                        <IconButton
                            onClick={() => setIsSearchVisible(true)}
                            className="fadeIn"
                            sx={{ display: { xs: 'none', sm: 'flex' } }} 
                        >
                            <SearchOutlined />
                        </IconButton>
                    )
                }

                {/*Pantallas pequenas */}
                <IconButton
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                    onClick={toggleSideMenu}
                >
                    <SearchOutlined />
                </IconButton>
                <Link href={'cart'} >
                    <IconButton>
                        <Badge badgeContent={2} color="secondary" >
                            <ShoppingCart />
                        </Badge>

                    </IconButton>
                </Link>
                <Button onClick={toggleSideMenu} >
                    Menu
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar