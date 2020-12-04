import React, { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import { USER_EMAIL, USER_TOKEN } from '../constants/main'

import {
  TwitterConnect,
  TwitterAccessToken,
  TwitterTopWorst,
  TwitterGetUserInfo,
} from '../api/twitter.api'

import {
  SpotifyConnect,
  SpotifyUpdateEmail,
  SpotifyGetUserInfo,
  SpotifyRefreshToken,
  SpotifyRecentPlaylists,
  SpotifyTopArtists,
} from '../api/spotify.api'

import { GetUserInfo } from '../api/login.api'

import Setup from '../components/Setup'

const SetupPage = (props) => {
  const [email, setEmail] = useState('')

  const router = useRouter()

  useEffect(() => {
    const token = window.localStorage.getItem(USER_TOKEN)
    const email = window.localStorage.getItem(USER_EMAIL)
    if (token && email) {
      setEmail(email)
      props.GetUserInfo(email)
    }
  }, [])

  if (router.query) {
    const token = router.query

    if (token.oauth_verifier && email) {
      props.TwitterAccessToken({ ...token, email }).then(() => {
        router.push('/setup')
      })
      props.TwitterGetUserInfo(email)
    }

    if (token.access_token && token.id) {
      props.SpotifyUpdateEmail({ ...token, email }).then(() => {
        router.push('/setup')
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
        onTwitterConnect={onTwitterConnect}
        onSpotifyConnect={onSpotifyConnect}
      ></Setup>
    </>
  )
}

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
      GetUserInfo,
      TwitterConnect,
      TwitterAccessToken,
      TwitterGetUserInfo,
      TwitterTopWorst,
      SpotifyConnect,
      SpotifyUpdateEmail,
      SpotifyGetUserInfo,
      SpotifyRefreshToken,
      SpotifyRecentPlaylists,
      SpotifyTopArtists,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(SetupPage)
