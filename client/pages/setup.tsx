import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import { USER_EMAIL, USER_TOKEN } from '../constants/main'

import {
  TwitterConnect,
  TwitterAccessToken,
  TwitterGetUserInfo,
  TwitterGetTopWorst,
} from '../api/twitter.api'
import { SpotifyConnect } from '../api/spotify.api'
import Setup from '../components/Setup'

const SetupPage = (props) => {
  const [email, setEmail] = useState('')
  console.log('email: ', email)

  console.log('SETUP PAGE props: ', props)
  const router = useRouter()
  console.log(router.query)

  useEffect(() => {
    const token = window.localStorage.getItem(USER_TOKEN)
    const email = window.localStorage.getItem(USER_EMAIL)
    if (email) {
      setEmail(email)
      // props.TwitterGetTopWorst(email)
    }
  })

  if (router.query) {
    const twitterTokens = router.query
    if (twitterTokens.oauth_verifier && email) {
      console.log('{ ...twitterTokens, email }: ', { ...twitterTokens, email })
      props.TwitterAccessToken({ ...twitterTokens, email })
      router.push('/setup')
    }
  }

  const onTwitterConnect = () => {
    props.TwitterConnect()
  }

  const onSpotifyConnect = () => {
    props.SpotifyConnect()
  }

  return (
    <>
      <Setup
        email={email}
        onTwitterConnect={onTwitterConnect}
        onSpotifyConnect={onSpotifyConnect}
      ></Setup>
    </>
  )
}

SetupPage.getInitialProps = (props) => ({})

function mapStateToProps(state) {
  return {
    user: state.user,
    twitter: state.twitter,
    spotify: state.spotify,
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      TwitterConnect,
      TwitterAccessToken,
      TwitterGetUserInfo,
      TwitterGetTopWorst,
      SpotifyConnect,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(SetupPage)
