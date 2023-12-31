import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider, } from '@mui/material'
import { lightTheme } from '@/themes'
import { SWRConfig } from 'swr'
import UIProvider from '@/context/ui/UiProvider'
import CartProvider from '@/context/cart/CartProvider'
import AuthProvider from '@/context/auth/AuthProvider'
import { SessionProvider } from "next-auth/react"
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <PayPalScriptProvider  options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT || '' }}>
    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <AuthProvider>
      <CartProvider>
        <UIProvider>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </CartProvider>
      </AuthProvider>
    </SWRConfig>
    </PayPalScriptProvider>
    </SessionProvider>

  )

}
