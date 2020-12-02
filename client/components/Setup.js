import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Link from 'next/link'
import { Card, Button, Icon } from 'tabler-react'
import { USER_EMAIL, USER_TOKEN } from '../constants/main'
import FormPage from './FormPage'

import { TwitterGetUserInfo, TwitterTopWorst } from '../api/twitter.api'
import { SpotifyGetUserInfo, SpotifyRefreshToken, SpotifyRecentPlaylists, SpotifyTopArtists } from '../api/spotify.api'

class Setup extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem(USER_TOKEN)
    const email = localStorage.getItem(USER_EMAIL)

    if (token) {
      this.props.TwitterGetUserInfo(email).then(() => {
        this.props.TwitterTopWorst({ email })
      })
      this.props.SpotifyGetUserInfo(email).then(() => {
        this.props.SpotifyRefreshToken({ email }).then(() => {
          this.props.SpotifyRecentPlaylists({ email })
          this.props.SpotifyTopArtists({email})
        })
      })
    }
  }

  handleTwitterConnect = () => {
    this.props.onTwitterConnect()
  }

  handleSpotifyConnect = () => {
    this.props.onSpotifyConnect()
  }

  render() {
    const { twitter } = this.props || {}
    const twitterUser = twitter.user || {}
    const { spotify } = this.props || {}
    const spotityUser = spotify.user || {}

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
                {twitterUser.screen_name ? (
                  <Button
                    icon="twitter"
                    color="info"
                    size="lg"
                    block
                    pill
                    onClick={this.handleTwitterConnect}
                  >
                    Connected to @{twitterUser.screen_name}
                  </Button>
                ) : (
                  <Button
                    icon="twitter"
                    color="gray"
                    size="lg"
                    block
                    pill
                    onClick={this.handleTwitterConnect}
                  >
                    Connect to Twitter
                  </Button>
                )}

                {/* <Button loading color="success" block size="lg" /> */}

                {spotify.loading ? (
                  <Button color="green" size="lg" block pill loading>
                    <Icon prefix="fa" name="spotify" />{' '}
                  </Button>
                ) : spotityUser.display_name ? (
                  <Button
                    color="info"
                    size="lg"
                    block
                    pill
                    onClick={this.handleSpotifyConnect}
                  >
                    <Icon prefix="fa" name="spotify" />
                    Connected to @{spotityUser.display_name}
                  </Button>
                ) : (
                  <Button
                    color="gray"
                    size="lg"
                    block
                    pill
                    onClick={this.handleSpotifyConnect}
                  >
                    <Icon prefix="fa" name="spotify" /> Connect with Spotify
                  </Button>
                )}
              </Button.List>
              <Card.Footer className="pb-0">
                {twitterUser.screen_name || spotityUser.display_name ? (
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
}

function mapStateToProps(state) {
  return {
    user: state.user,
    twitter: state.twitter,
    spotify: state.spotify,
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      TwitterGetUserInfo,
      TwitterTopWorst,
      SpotifyGetUserInfo,
      SpotifyRefreshToken,
      SpotifyRecentPlaylists,
      SpotifyTopArtists,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(Setup)
