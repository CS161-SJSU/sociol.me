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
  onSpotifyConnect: Function
  email: string
  props: object
}

const Setup: React.FC<SetupProps> = (
  props,
  onTwitterConnect,
  onSpotifyConnect,
  email
) => {
  console.log('Hello email: ', email)
  console.log('props: ', props)
  const twitter = props.twitter || {}
  const spotify = props.spotify || {}
  console.log('twitter: ', twitter)

  useEffect(() => {
    const token = window.localStorage.getItem(USER_TOKEN)
  })

  const handleTwitterConnect = () => {
    props.onTwitterConnect()
  }

  const handleSpotifyConnect = () => {
    props.onSpotifyConnect()
  }

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
                  onClick={handleSpotifyConnect}
                >
                  Connect to Spotify
                </Button>
              )}

              {/* <Button loading color="success" block size="lg" /> */}

              {spotify.loading ? (
                <Button color="green" size="lg" block pill loading>
                  <Icon prefix="fa" name="spotify" />{' '}
                </Button>
              ) : spotify.display_name ? (
                <Button color="green" size="lg" block pill>
                  <Icon prefix="fa" name="spotify" />
                  Connected to @{spotify.display_name}
                </Button>
              ) : (
                <Button
                  color="gray"
                  size="lg"
                  block
                  pill
                  onClick={handleSpotifyConnect}
                >
                  <Icon prefix="fa" name="spotify" /> Connect with Spotify
                </Button>
              )}
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
    spotify: state.spotify,
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Setup)
