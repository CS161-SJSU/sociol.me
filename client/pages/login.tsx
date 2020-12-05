import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Login from '../components/Login'
import { USER_TOKEN } from '../constants/main'
import { GoogleSignin } from '../api/login.api'

const LoginPage = (props) => {
  const router = useRouter()

  useEffect(() => {
    const token = window.localStorage.getItem(USER_TOKEN)

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
