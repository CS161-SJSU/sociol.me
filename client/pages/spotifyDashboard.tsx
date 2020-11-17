import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import C3Chart from 'react-c3js'

import {
  Page,
  Avatar,
  Icon,
  Grid,
  Card,
  Text,
  Table,
  Alert,
  Progress,
  colors,
  Dropdown,
  Button,
  StampCard,
  StatsCard,
  ProgressCard,
  Badge,
} from 'tabler-react'

import SiteWrapper from '../components/SiteWrapper'

import { USER_TOKEN, USER_EMAIL } from '../constants/main'

import { SpotifyGetUserInfo } from '../api/spotify.api'

class SpotifyDashboard extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem(USER_TOKEN)
    const email = localStorage.getItem(USER_EMAIL)

    if (token) {
      this.props.SpotifyGetUserInfo(email)
      // this.props.TwitterGetTopWorst(email)
    }
  }

  render() {
    const { user } = this.props || {}
    const { spotify } = this.props || {}

    const spotifyUser = spotify.user || []
    const playlist = spotify.playlist || []

    return (
      <SiteWrapper>
        <Page.Content title="Spotify Dashboard">
          <Grid.Row cards={true} alignItems="center">
            <Grid.Col width={6} sm={4} lg={2}>
              <StatsCard
                layout={1}
                movement={0}
                total={spotifyUser.display_name}
                label="Screen name"
              />
            </Grid.Col>

            <Grid.Col width={6} sm={4} lg={2}>
              <StatsCard
                layout={1}
                movement={0}
                total={spotifyUser.followers}
                label="Followers"
              />
            </Grid.Col>
            <Grid.Col width={6} sm={4} lg={2}>
              <StatsCard
                layout={1}
                movement={0}
                total={spotifyUser.country}
                label="Country"
              />
            </Grid.Col>
          </Grid.Row>
        </Page.Content>
      </SiteWrapper>
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
  return bindActionCreators({ SpotifyGetUserInfo }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(SpotifyDashboard)
