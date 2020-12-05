import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Card } from 'tabler-react'
import FormPage from '../components/FormPage'
// import Error401 from '../components/Error401'
import { GoogleLogout } from 'react-google-login'
import { USER_EMAIL, USER_TOKEN } from '../constants/main'

import { GetUserInfo } from '../api/login.api'

const Logout = (props) => {
  useEffect(() => {
    const token = window.localStorage.getItem(USER_TOKEN)
    const email = window.localStorage.getItem(USER_EMAIL)
    if (token && email) {
      props.GetUserInfo(email)
    }
  }, [])
  const router = useRouter()
  const logout = () => {
    localStorage.removeItem(USER_EMAIL)
    localStorage.removeItem(USER_TOKEN)
    router.push('/')
  }
  return (
    <>
      <FormPage imageURL={'./images/logo.svg'}>
        <Card>
          <Card.Header>
            <Card.Title className="center-content">See you again!</Card.Title>
          </Card.Header>
          <Card.Body className="center-content">
            <GoogleLogout
              clientId="413889317962-u7rra428gcm2a3in1iji5jiaf1r4sntc.apps.googleusercontent.com"
              buttonText="Logout"
              onLogoutSuccess={logout}
              onFailure={logout}
            ></GoogleLogout>
          </Card.Body>
        </Card>
      </FormPage>
    </>
  )
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      GetUserInfo,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(Logout)
