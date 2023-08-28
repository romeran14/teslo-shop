import Head from "next/head"
import { FC, PropsWithChildren } from 'react'
import Navbar from "../ui/Navbar";
import { SideMenu } from "../ui";

interface Props {
    title: string;
    pageDescription: string;
    imageFullUrl?: string
}

export const ShopLayouts: FC<PropsWithChildren<Props>> = ({ children, title, pageDescription, imageFullUrl }) => {
    return (
        <>
            <Head>
                <title>{ title }</title>
                <meta name="description" content={pageDescription} />
                <meta name="og:title" content={title} />
                <meta name="og:description" content={pageDescription} />
                { 
                  imageFullUrl && <meta name="og:image" content={imageFullUrl} />
                }
            </Head>
            <nav>
                <Navbar/>
                <SideMenu/>
            </nav>
            <main style={{
                margin: '80px auto',
                maxWidth: '1440px',
                padding: '0px 30px'
            }} >
                {children}
            </main>
            <footer>

            </footer>
        </>
    )
}

export default ShopLayouts