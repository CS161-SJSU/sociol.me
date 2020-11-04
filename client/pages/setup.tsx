import React, { useEffect } from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { NextPage } from 'next'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import { GoogleLogout } from 'react-google-login'
import {USER_EMAIL, USER_TOKEN} from '../constants/main'
import { logout } from '../store/actions/auth.action'
import {makeStyles} from "@material-ui/core/styles";
import styles from '../components/css/nav.module.css'
import { TwitterSignin } from '../api/twit.api'
import Axios from 'axios'
import TwitterButton from "../components/TwitterButton";



interface OtherProps {
  getStaticProp: string
  appProp: string
}

const SetupPage = (props) => {
  console.log('Setup props: ', props)
  const { firstName } = props.user
  const router = useRouter()

  const useStyles = makeStyles(() => ({
    mainCarousel: {
      width: 'min(108vh, 50%)',
      margin: '0',
      padding: '0',
    },
    carouselItem: {
      height: '100vh',
      width: '51vw',
    },

    text: {
      position: 'fixed',
      top: '50%',
      left: '51%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      fontFamily: 'arial',
      textDecoration: 'none',
      fontSize: '1.8em',
      zIndex: 'auto',
      color: 'black',
      backgroundColor: 'chartreuse',
    },

    outerBody: {
      position: 'relative',
      textAlign: 'center',
    },
  }))

  useEffect(() => {
    const token = window.localStorage.getItem(USER_TOKEN)
    /*if (!token) {
      router.push('/login')
    }*/
  })

  const onTwitterSignin = (email : Object) => {
    props.TwitterSignin(email)
  }

  // const googleClientID: string = process.env.GOOGLE_CLIENT_ID
  const logout = () => {
    console.log('logout')
    localStorage.removeItem(USER_TOKEN)
    router.push('/login')
    props.logout()
  }

  const customHeader = {};
  customHeader['Test'] = 'test-header';

  return (
    <div>
      Cagan Setup Page -- Hi {firstName}
        <TwitterButton onTwitterSignin={onTwitterSignin} />

      <div>
        <GoogleLogout
          clientId="413889317962-u7rra428gcm2a3in1iji5jiaf1r4sntc.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={logout}
          onFailure={logout}
          theme="dark"
        ></GoogleLogout>
      </div>
    </div>
  )
}

// export const getStaticProps = wrapper.getStaticProps(({ store }) => {
//   store.dispatch({ type: 'PAGE', payload: 'login' })
//   return { props: { getStaticProp: 'bar' } }
// })

SetupPage.getInitialProps = (props) => ({
  //TODO: verify auth token
  // custom: 'custom', // pass some custom props to component
})

function mapStateToProps(state) {
  return {
    user: state.user,

  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ TwitterSignin, logout }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(SetupPage)
