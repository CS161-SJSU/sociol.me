import React from 'react'
import App, { AppInitialProps, AppContext } from 'next/app'
import { wrapper } from '../store/store'
import '../assets/scss/style.scss'
import 'tabler-react/dist/Tabler.css'
// import 'tabler-react/dist/Tabler.RTL.css'

class WrappedApp extends App<AppInitialProps> {
  public static getInitialProps = async ({ Component, ctx }: AppContext) => {
    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
        // Some custom thing for all pages
        appProp: ctx.pathname,
      },
    }
  }

  public render() {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}

export default wrapper.withRedux(WrappedApp)
