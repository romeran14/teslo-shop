import { AppBar, Toolbar, Typography, Box, Button} from "@mui/material"
import Link from "next/link"
import { UIContext } from "@/context"
import { useContext} from 'react'


const AdminNavbar = () => {

    const { toggleSideMenu } = useContext(UIContext)

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

                <Button onClick={toggleSideMenu} >
                    Menu
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default AdminNavbar