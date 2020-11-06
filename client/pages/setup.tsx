import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import axios from 'axios'
import { HOST } from '../constants/main'
import { USER_EMAIL, USER_TOKEN } from '../constants/main'

import { TwitterConnect, TwitterAccessToken } from '../api/twitter.api'
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

  return (
    <>
      <Setup email={email} onTwitterConnect={onTwitterConnect}></Setup>
    </>
  )
}

SetupPage.getInitialProps = (props) => ({})

function mapStateToProps(state) {
  return {
    user: state.user,
    twitter: state.twitter,
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ TwitterConnect, TwitterAccessToken }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(SetupPage)
