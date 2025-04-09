import ResetCSS from 'ResetCSS'
import { ToastListener } from 'contexts'
import BigNumber from 'bignumber.js'
import { ScrollToTopButtonV2 } from 'components/ScrollToTopButton'
import { PageMeta } from 'components/Layout/Page'
import { DisclaimerModal } from 'components'
// import { NetworkModal } from 'components/NetworkModal'
import { useAccountEventListener } from 'hooks/useAccountEventListener'
import useThemeCookie from 'hooks/useThemeCookie'
import useUserAgent from 'hooks/useUserAgent'
import { NextPage } from 'next'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import { Fragment, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { PersistGate } from 'redux-persist/integration/react'
import $ from 'jquery'
import { persistor, useStore } from 'state'
import { usePollBlockNumber } from 'state/block/hooks'
import { Updaters } from '..'
import { SEO } from '../../next-seo.config'
import Providers from '../Providers'
import Menu from '../components/Menu'
import GlobalStyle from '../Global'

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

function GlobalHooks() {
  usePollBlockNumber()
  useUserAgent()
  useAccountEventListener()
  useThemeCookie()
  return null
}

function MPGlobalHooks() {
  usePollBlockNumber()
  useUserAgent()
  useAccountEventListener()
  return null
}

function MyApp(props: AppProps<{ initialReduxState: any; dehydratedState: any }>) {
  const { pageProps, Component } = props
  const store = useStore(pageProps.initialReduxState)

  useEffect(() => {
    // accordion
    $('.accordion > li:eq(0) a').addClass('active').next().slideDown()

    $('.accordion a').click(function (j) {
      // eslint-disable-next-line no-var
      var dropDown = $(this).closest('li').find('p')

      $(this).closest('.accordion').find('p').not(dropDown).slideUp()

      if ($(this).hasClass('active')) {
        $(this).removeClass('active')
      } else {
        $(this).closest('.accordion').find('a.active').removeClass('active')
        $(this).addClass('active')
      }

      dropDown.stop(false, true).slideToggle()

      j.preventDefault()
    })
  })
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
        />
        <meta
          name="description"
          content="Discover CHL, the leading DEX on KaiChain with the best rewarding in DeFi."
        />
        <meta name="theme-color" content="#1FC7D4" />
        {(Component as NextPageWithLayout).mp && (
          // eslint-disable-next-line @next/next/no-sync-scripts
          <script src="https://public.bnbstatic.com/static/js/mp-webview-sdk/webview-v1.0.0.min.js" id="mp-webview" />
        )}
        <link rel="stylesheet" href="/main.css" />
      </Head>
      <DefaultSeo {...SEO} />
      <Providers store={store} dehydratedState={pageProps.dehydratedState}>
        <PageMeta />
        {(Component as NextPageWithLayout).Meta && (
          // @ts-ignore
          <Component.Meta {...pageProps} />
        )}
        {(Component as NextPageWithLayout).mp ? <MPGlobalHooks /> : <GlobalHooks />}
        <ResetCSS />
        <GlobalStyle />
        <PersistGate loading={null} persistor={persistor}>
          <Updaters />
          <App {...props} />
        </PersistGate>
      </Providers>
      <Script
        strategy="afterInteractive"
        id="google-tag"
        dangerouslySetInnerHTML={{
          __html: `
          
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PXLD3XW');
        `,
        }}
      />
    </>
  )
}

type NextPageWithLayout = NextPage & {
  Layout?: React.FC<React.PropsWithChildren<unknown>>
  /** render component without all layouts */
  pure?: true
  /** is mini program */
  mp?: boolean
  /**
   * allow chain per page, empty array bypass chain block modal
   * @default [ChainId.MAINNET]
   * */
  chains?: number[]
  isShowScrollToTopButton?: true
  screen?: true
  /**
   * Meta component for page, hacky solution for static build page to avoid `PersistGate` which blocks the page from rendering
   */
  Meta?: React.FC<React.PropsWithChildren<unknown>>
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const ProductionErrorBoundary = Fragment

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  useEffect(() => {
    AOS.init({
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
    })
  }, [])
  if (Component.pure) {
    return <Component {...pageProps} />
  }

  // Use the layout defined at the page level, if available
  const Layout = Component.Layout || Fragment
  const ShowMenu = Component.mp ? Fragment : Menu
  const isShowScrollToTopButton = Component.isShowScrollToTopButton || true

  return (
    <ProductionErrorBoundary>
      <ShowMenu>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ShowMenu>
      <ToastListener />
      {/* <NetworkModal pageSupportedChains={Component.chains} /> */}
      {/* <DisclaimerModal /> */}
      {isShowScrollToTopButton && <ScrollToTopButtonV2 />}
    </ProductionErrorBoundary>
  )
}

export default MyApp
