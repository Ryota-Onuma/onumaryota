import '@/styles/app/app.css'

import Head from "next/head";
import type { AppProps } from 'next/app'
import { Layout } from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="mainBgColor fontMainColor w-screen">
      <Head>
        <title>onuma-ryota.com</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head >

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main >
  )
}

export default MyApp
