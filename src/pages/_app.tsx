import '@/styles/app/app.css'
import { DefaultSeo } from 'next-seo';
import Head from "next/head";
import type { AppProps } from 'next/app'
import { Layout } from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="mainBgColor fontMainColor w-screen">

      <Head>
        <title>onuma-ryota.com</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <DefaultSeo
        defaultTitle="onuma-ryota.com"
        description="Welcome to onuma-ryota.com"
        openGraph={{
          type: "website",
          title: "onuma-ryota.com",
          description: "Welcome to onuma-ryota.com",
          site_name: "onuma-ryota.com",
          url: "https://www.onuma-ryota.com/",
          images: [
            {
              url: "/images/buntyo.png",
              width: 800,
              height: 600,
              alt: 'ogp onuma-ryota.com',
              type: 'image/png',
            },
          ],
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: "summary_large_image",
        }}
      />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main >
  )
}

export default MyApp
