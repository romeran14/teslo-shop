import { SearchOutlined, ShoppingCart } from "@mui/icons-material"
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Badge } from "@mui/material"
import Link from "next/link"

const Navbar = () => {
    return (
        <AppBar>
            <Toolbar>
                <Link href={'/'} >
                    <Typography variant="h6" >
                        Teslo
                    </Typography>
                    <Typography sx={{ marginLeft: 0.5 }} >
                        Shop
                    </Typography>
                </Link>
                <Box flex={1} />
                <Box sx={{ display: {xs:'none', sm:'block'}}} >
                    <Link href={'/category/men'}>
                        <Button>
                            Hombres
                        </Button>
                    </Link>
                    <Link href={'/category/women'}>
                        <Button>
                            Mujeres
                        </Button>
                    </Link>
                    <Link href={'/category/kids'}>
                        <Button>
                            Ninos
                        </Button>
                    </Link>
                </Box>
                <Box flex={1} />
                <IconButton>
                    <SearchOutlined/>
                </IconButton>
                <Link href={'cart'} >
                <IconButton>
                    <Badge badgeContent={2} color="secondary" >
                    <ShoppingCart/>
                    </Badge>
                    
                </IconButton>
                </Link>
                <Button>
                    Menu
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar