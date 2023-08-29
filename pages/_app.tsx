import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider, } from '@mui/material'
import { lightTheme } from '@/themes'
import useSWR, { SWRConfig } from 'swr'
import UIProvider from '@/context/ui/UiProvider'
import CartProvider from '@/context/cart/CartProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <CartProvider>
        <UIProvider>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </CartProvider>


    </SWRConfig>
  )

}
