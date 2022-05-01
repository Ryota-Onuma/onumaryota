import '../styles/reset.css'  //この行を追加
import '../styles/globals.scss'
import Header from '../components/Header'
import Head from "next/head";
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="default">
      <Head>
        <title>onuma-ryota.com</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
