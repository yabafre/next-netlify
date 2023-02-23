import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {Layout} from './components/Layout/layout'

// pages/_app.js
import localFont from '@next/font/local'

// Font files can be colocated inside of `pages`
const Satoshi = localFont({ src: '../styles/fonts/Satoshi-Regular.otf' })

export default function App({ Component, pageProps }: AppProps) {
  return(
      <>
          <style jsx global>
              {`
                :root {
                  --satoshi-font: ${Satoshi};
                }
          `}
          </style>
          <Layout><Component {...pageProps} /></Layout>
      </>
  )
}
