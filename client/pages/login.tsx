import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Login from '../components/Login'
import { USER_TOKEN } from '../constants/main'
import { GoogleSignin } from '../api/login.api'

//TODO: Handle failed cases

const LoginPage = (props) => {
  console.log('LOGIN PAGE: props: ', props)
  const router = useRouter()

  useEffect(() => {
    const token = window.localStorage.getItem(USER_TOKEN)
    // const token = props.user.token
    if (token) {
      router.push('/setup')
    }
  })

  const onGoogleSignin = (userData: Object) => {
    // console.log('here', userData)
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
