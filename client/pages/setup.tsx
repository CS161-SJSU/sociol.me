import React, { useEffect } from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { NextPage } from 'next'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import { GoogleLogout } from 'react-google-login'
import { USER_TOKEN } from '../constants/main'
import { logout } from '../store/actions/auth.action'

interface OtherProps {
  getStaticProp: string
  appProp: string
}

const SetupPage = (props) => {
  console.log('Setup props: ', props)
  const { firstName } = props.user
  const router = useRouter()

  useEffect(() => {
    const token = window.localStorage.getItem(USER_TOKEN)
    if (!token) {
      router.push('/login')
    }
  })

  // const googleClientID: string = process.env.GOOGLE_CLIENT_ID

  const logout = () => {
    console.log('logout')
    localStorage.removeItem(USER_TOKEN)
    router.push('/login')
    props.logout()
  }

  return (
    <div>
      Cagan Setup Page -- Hi {firstName}
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
  return bindActionCreators({ logout }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(SetupPage)
