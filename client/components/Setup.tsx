import React, { useState, useEffect } from 'react'
import GoogleLogin from 'react-google-login'
import { Card, Form, Button, Icon } from 'tabler-react'
import { USER_EMAIL, USER_TOKEN } from '../constants/main'
import FormPage from '../components/FormPage'
import axios from 'axios'
import { HOST } from '../constants/main'

import styled from 'styled-components'

// TODO: Check for token
// TODO: Add 1 account first and then add multiple account

// Change color after successful connection

interface SetupProps {
  onTwitterConnect: Function
  email: string
}

const Setup: React.FC<SetupProps> = ({
  onTwitterConnect,
  email,
}: SetupProps) => {
  console.log('Hello email: ', email)

  useEffect(() => {
    const token = window.localStorage.getItem(USER_TOKEN)
  })

  const handleTwitterConnect = () => {
    onTwitterConnect()
  }

  const GoogleSignIn = styled.div``

  return (
    <>
      <FormPage imageURL={'./images/logo.svg'}>
        <Button.List>
          <Button
            icon="twitter"
            color="info"
            size="lg"
            block
            pill
            onClick={handleTwitterConnect}
          >
            Connect to Twitter
          </Button>

          {/* <Button loading color="success" block size="lg" /> */}

          <Button color="gray-dark" size="lg" block pill>
            <Icon prefix="fa" name="spotify" /> Connect with Spotify
          </Button>

          <Button icon="x-circle" color="danger" size="lg" block pill disabled>
            Proceed to dashboard
          </Button>
          <Button icon="check-square" color="success" size="lg" block pill>
            Proceed to dashboard
          </Button>
        </Button.List>
      </FormPage>
    </>
  )
}

export default Setup
