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
  TwitterTopWorst,
} from '../api/twitter.api'
import { SpotifyConnect, SpotifyUpdateEmail } from '../api/spotify.api'
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
    }
  })

  if (router.query) {
    const token = router.query

    if (token.oauth_verifier && email) {
      console.log('{ ...twitterTokens, email }: ', { ...token, email })
      props.TwitterAccessToken({ ...token, email }).then(() => {
        console.log('then')
        router.push('/setup')
        props.TwitterTopWorst({ email })
      })
    }

    if (token.access_token && token.id) {
      console.log('token.id: ', token.id)
      console.log('token.access_token: ', token.access_token)
      props.SpotifyUpdateEmail({ ...token, email }).then(() => {
        console.log('SpotifyUpdateEmail then')
        router.push('/setup')
        // props.TwitterTopWorst({ email })
      })
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
      TwitterTopWorst,
      SpotifyConnect,
      SpotifyUpdateEmail,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(SetupPage)
