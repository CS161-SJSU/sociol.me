import React from 'react'
import { useRouter } from 'next/router'
import GoogleLogin from 'react-google-login'
import { Card, Form, Button, Icon } from 'tabler-react'
import FormPage from '../components/FormPage'
import { GoogleLogout } from 'react-google-login'
import { USER_TOKEN } from '../constants/main'

import styled from 'styled-components'

const Dashboard = () => {
  const router = useRouter()
  const logout = () => {
    console.log('logout')
    localStorage.removeItem(USER_TOKEN)
    router.push('/')
    // props.logout()
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

export default Dashboard
