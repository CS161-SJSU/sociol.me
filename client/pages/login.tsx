import React from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { NextPage } from 'next'
import { State } from '../store/reducers'
import { wrapper } from '../store/store'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Login from '../components/Login'
import { GoogleSignin } from '../api/login.api'
import { loginSuccess, loginFailed } from '../store/actions/auth.action'

//TODO: Handle failed cases
//TODO: DONE - Send token to server
//TODO: User Signout
//TODO: DONE - Save user infomation to redux state

const LoginPage = (props) => {
  // const { app, page } = useSelector<State, State>((state) => state)

  const onGoogleSigninSuccess = (userData: Object) => {
    console.log('here', userData)
    // props.GoogleSignin(userData)
  }

  return (
    <div className="login">
      <Login onGoogleSigninSuccess={onGoogleSigninSuccess} />
    </div>
  )
}

LoginPage.getInitialProps = () => ({
  //TODO: verify auth token
  // custom: 'custom', // pass some custom props to component
})

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ GoogleSignin }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(LoginPage)
