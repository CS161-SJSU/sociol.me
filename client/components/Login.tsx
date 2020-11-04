import React from 'react'
import GoogleLogin from 'react-google-login'
import { Card, Form, Button } from 'tabler-react'
import FormPage from '../components/FormPage'

import styled from 'styled-components'

interface LoginProps {
  onGoogleSignin: Function
}

const Login: React.FC<LoginProps> = ({ onGoogleSignin }: LoginProps) => {
  const onGoogleSigninSuccess = (res) => {
    // console.log(res)
    const googleProfile = res.profileObj


    const userData = {
      email: googleProfile.email,
      firstName: googleProfile.givenName,
      lastName: googleProfile.familyName,
      fullName: googleProfile.name,
      imageUrl: googleProfile.imageUrl,
      googleId: googleProfile.googleId,
      tokenId: res.tokenId,
    }
    // if signin successfully
    if (userData.tokenId) {
      onGoogleSignin(userData)
    }
    //  save previous id  // onClick
  }

  const onGoogleSigninFail = (res) => {
    console.log('FAILED: ' + res)
  }

  const GoogleSignIn = styled.div`
    display: flex;
    justify-content: center;
    padding: 1rem 1rem 0 1rem;
  `

  return (
    <>
      <FormPage imageURL={'./images/logo.svg'}>
        <Card>
          <Card.Header>
            <Card.Title className="center-content">Login</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form.Group label="Email">
              <Form.Input icon="user" placeholder="Email" />
            </Form.Group>
            <Form.Group label="Password">
              <Form.Input icon="lock" placeholder="Password" type="password" />
            </Form.Group>
            <Form.Footer>
              <Button color="primary" size="lg" block>
                Login
              </Button>
              <div className="center-content mt-4">or</div>
              <GoogleSignIn>
                <GoogleLogin
                  clientId="413889317962-u7rra428gcm2a3in1iji5jiaf1r4sntc.apps.googleusercontent.com"
                  buttonText="Login with Google"
                  onSuccess={onGoogleSigninSuccess}
                  onFailure={onGoogleSigninFail}
                  redirectUri="http://localhost:3000/setup"
                />
              </GoogleSignIn>
            </Form.Footer>
          </Card.Body>
        </Card>
      </FormPage>
    </>
  )
}

export default Login
