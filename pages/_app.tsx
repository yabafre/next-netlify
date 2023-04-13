import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/pages/components/Layout'
import Head from 'next/head'
import Script from 'next/script'
import { SessionProvider } from "next-auth/react"


// pages/_app.js
import localFont from '@next/font/local'
import {useEffect} from "react";
import $ from 'jquery';


// Font files can be colocated inside of `pages`
const Satoshi = localFont({ src: '../styles/fonts/Satoshi-Regular.otf' })

export default function App({ Component, pageProps:{session,...pageProps} }: AppProps) {
    useEffect(() => {
        $('body').addClass('dark')
    }, [])
  return(
      <>
          {/* eslint-disable-next-line @next/next/no-script-component-in-head */}
          <Head>
                <Script src="https://code.jquery.com/jquery-3.6.4.min.js" integrity="sha256-oP6HI9z1XaZNBrJURtCoUT5SUnxFr8s3BzRl+cbzUq8="
                        crossOrigin="anonymous"></Script>
              <Script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></Script>
              <Script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></Script>
              <title>Portfolio</title>
          </Head>
          <style jsx global>
              {`
                :root {
                  --satoshi-font: ${Satoshi};
                }
          `}
          </style>
          <SessionProvider>
            <Layout><Component {...pageProps} /></Layout>
          </SessionProvider>
        </>
  )
}
