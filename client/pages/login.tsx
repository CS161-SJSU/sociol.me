import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Login from '../components/Login'
import { USER_TOKEN } from '../constants/main'
import { GoogleSignin } from '../api/login.api'

const LoginPage = (props) => {
  console.log('LOGIN PAGE: props: ', props)
  const router = useRouter()

  useEffect(() => {
    const token = window.localStorage.getItem(USER_TOKEN)

    console.log(
      'process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID: ',
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    )
    if (token) {
      router.push('/setup')
    }
  })

  const onGoogleSignin = (userData: Object) => {
    props.GoogleSignin(userData)
  }

  return (
    <>
      <Login onGoogleSignin={onGoogleSignin} />
    </>
  )
}

LoginPage.getInitialProps = () => ({})

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ GoogleSignin }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(LoginPage)
