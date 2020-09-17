import React from 'react'
import App from 'next/app'
import Head from 'next/head'

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <div>
        <Head>
          <title>Social Analytics</title>
        </Head>
        <Component {...pageProps} />
      </div>
    )
  }
}
