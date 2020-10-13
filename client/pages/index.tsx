import React from 'react'
import Link from 'next/link'

import { connect } from 'react-redux'
import { NextPageContext } from 'next'
import { State } from '../store/reducers'

export interface PageProps extends State {
  pageProp: string
  appProp: string
}

class Index extends React.Component<PageProps> {
  // note that since _app is wrapped no need to wrap page
  public static async getInitialProps({
    store,
    pathname,
    query,
    req,
  }: NextPageContext<State>) {
    console.log('2. Page.getInitialProps uses the store to dispatch things', {
      pathname,
      query,
    })
  }

  render() {
    // console.log('5. Page.render');
    const { pageProp, appProp } = this.props
    console.log('here this.props: ', this.props)
    return (
      <div>
        <p>This is landing page</p>

        <pre>{JSON.stringify({ pageProp, appProp }, null, 2)}</pre>

        <Link href="/login">
          <a>Navigate to login</a>
        </Link>
      </div>
    )
  }
}

export default connect((state) => state)(Index)
