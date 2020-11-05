import React, { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Card, Form, Button, Icon } from 'tabler-react'
import { USER_EMAIL, USER_TOKEN } from '../constants/main'
import FormPage from '../components/FormPage'

import styled from 'styled-components'

// TODO: Check for token
// TODO: Add 1 account first and then add multiple account

// Change color after successful connection

interface SetupProps {
  onTwitterConnect: Function
  email: string
  props: object
}

const Setup: React.FC<SetupProps> = (props, onTwitterConnect, email) => {
  console.log('Hello email: ', email)
  console.log('props: ', props)
  const twitter = props.twitter || {}
  console.log('twitter: ', twitter)

  useEffect(() => {
    const token = window.localStorage.getItem(USER_TOKEN)
  })

  const handleTwitterConnect = () => {
    props.onTwitterConnect()
  }

  const GoogleSignIn = styled.div``

  return (
    <>
      <FormPage imageURL={'./images/logo.svg'}>
        <Card>
          <Card.Header>
            <Card.Title className="center-content">
              Connect to at least 1 account
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Button.List className="mb-4">
              {twitter.loading ? (
                <Button
                  icon="twitter"
                  color="info"
                  size="lg"
                  block
                  pill
                  loading
                />
              ) : twitter.name ? (
                <Button
                  icon="twitter"
                  color="info"
                  size="lg"
                  block
                  pill
                  onClick={handleTwitterConnect}
                >
                  Connected to @{twitter.screen_name}
                </Button>
              ) : (
                <Button
                  icon="twitter"
                  color="gray"
                  size="lg"
                  block
                  pill
                  onClick={handleTwitterConnect}
                >
                  Connect to Twitter
                </Button>
              )}

              {/* <Button loading color="success" block size="lg" /> */}

              <Button color="gray" size="lg" block pill>
                <Icon prefix="fa" name="spotify" /> Connect with Spotify
              </Button>
            </Button.List>
            <Card.Footer className="pb-0">
              {twitter.name ? (
                <Link href="/dashboard">
                  <Button
                    icon="check-square"
                    color="success"
                    size="lg"
                    block
                    pill
                  >
                    Proceed to dashboard
                  </Button>
                </Link>
              ) : (
                <Button
                  icon="x-circle"
                  color="danger"
                  size="lg"
                  block
                  pill
                  disabled
                >
                  Connect before Proceed
                </Button>
              )}
            </Card.Footer>
          </Card.Body>
        </Card>
      </FormPage>
    </>
  )
}

function mapStateToProps(state) {
  return {
    user: state.user,
    twitter: state.twitter,
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Setup)
