import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {Layout} from './components/Layout/layout'
import Head from 'next/head'
import Script from 'next/script'

// pages/_app.js
import localFont from '@next/font/local'

// Font files can be colocated inside of `pages`
const Satoshi = localFont({ src: '../styles/fonts/Satoshi-Regular.otf' })

export default function App({ Component, pageProps }: AppProps) {
  return(
      <>
          <Head >
              <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
              <title>Portfolio</title>
          </Head>
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
