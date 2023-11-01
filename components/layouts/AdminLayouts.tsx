
import { FC, PropsWithChildren } from 'react'
import Navbar from "../ui/Navbar";
import { SideMenu } from "../ui";
import AdminNavbar from '../admin/AdminNavbar';
import { Box, Typography } from '@mui/material';


interface Props {
    title: string;
    subTitle: string;
    icon?: JSX.Element;

}

export const AdminLayouts: FC<PropsWithChildren<Props>> = ({ children, title, subTitle, icon }) => {
    return (
        <>

            <nav>
                <AdminNavbar />
                <SideMenu />
            </nav>
            <main style={{
                margin: '80px auto',
                maxWidth: '1440px',
                padding: '0px 30px'
            }} >
                <Box display={'flex'} flexDirection={'column'}>
                    <Typography variant='h1' component={'h1'}>
                        {icon}
                        {title}
                    </Typography>
                    <Typography variant='h2' sx={{ mb: 1 }}>{subTitle}</Typography>
                </Box>
                <Box>
                    {children}
                </Box>

            </main>
            <footer>

            </footer>
        </>
    )
}

export default AdminLayouts