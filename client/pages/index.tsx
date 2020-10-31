import React from 'react'
import { connect } from 'react-redux'
import { NextPageContext } from 'next'
import { State } from '../store/reducers'

import Dashboard from '../pages/dashboard'
import unfetch from 'isomorphic-unfetch'

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
    const clientId = process.env.UNSPLASH_CLIENT_ID
    const randNumber = Math.floor(Math.random() * 10) + 1
    const requestURL = `https://api.unsplash.com/topics/architecture/photos?page=${randNumber}&client_id=${clientId}`
    const data = await unfetch(requestURL)
    const imageArray = await data.json()
    return {
      imageArray,
    }
  }



  render() {
    // console.log('5. Page.render');
    const { pageProp, appProp } = this.props
    //console.log('here this.props: ', this.props)
    const images = this.props.imageArray
    return (
      <div>
        <Dashboard images={images} />
      </div>
    )
  }
}






export default connect((state) => state)(Index)
