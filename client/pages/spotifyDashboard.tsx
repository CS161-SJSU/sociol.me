import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Page, Grid, GalleryCard, StatsCard } from 'tabler-react'
import SiteWrapper from '../components/SiteWrapper'
import Error401 from '../components/Error401'
import { USER_TOKEN, USER_EMAIL } from '../constants/main'

import { GetUserInfo } from '../api/login.api'
import {
  SpotifyGetUserInfo,
  SpotifyGetRecentPlaylists,
  SpotifyGetTopArtists,
} from '../api/spotify.api'

class SpotifyDashboard extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem(USER_TOKEN)
    const email = localStorage.getItem(USER_EMAIL)
    const temp = {
      email: 'cagan.sevencan@sjsu.edu',
    }
    if (token) {
      this.props.GetUserInfo(email)
      this.props.SpotifyGetUserInfo(email)
      this.props.SpotifyGetRecentPlaylists(email)
      this.props.SpotifyGetTopArtists({ email })
      // this.props.SpotifyGetTopArtists(temp)
    }
  }

  render() {
    const { user } = this.props || {}
    const { token } = user || ''

    const { spotify } = this.props || {}
    console.log('spotify: ', spotify)

    const spotifyUser = spotify.user || []
    const recent = spotify.recent_played || []
    const topArtists = spotify.artist_all_time || []
    const recentSongs = recent.filter((song, idx) => idx < 12)

    return spotifyUser ? (
      <SiteWrapper>
        <Page.Content title="Spotify Dashboard">
          <Grid.Row cards={true} alignItems="center">
            <Grid.Col width={6} sm={5} lg={4}>
              <StatsCard
                layout={1}
                movement={0}
                total={spotifyUser.display_name}
                label="Screen name"
              />
            </Grid.Col>

            <Grid.Col width={6} sm={4} lg={4}>
              <StatsCard
                layout={1}
                movement={0}
                total={spotifyUser.followers}
                label="Followers"
              />
            </Grid.Col>
            <Grid.Col width={6} sm={4} lg={4}>
              <StatsCard
                layout={1}
                movement={0}
                total={spotifyUser.country}
                label="Country"
              />
            </Grid.Col>
          </Grid.Row>

          {recentSongs && recentSongs.length > 0 && (
            <>
              <Page.Header title="Recently Played Songs" />
              <Grid.Row className="row-cards">
                {recentSongs.map((item, key) => (
                  <Grid.Col sm={6} lg={3} key={key}>
                    <GalleryCard>
                      <a href={item.track_url} target="_blank">
                        <GalleryCard.Image
                          href={item.image}
                          src={item.image}
                          alt={`Song Title: ${item.song_title}`}
                        />
                        <GalleryCard.Footer>
                          <GalleryCard.Details
                            fullName={item.song_title}
                            dateString={item.artist_name}
                          />
                        </GalleryCard.Footer>
                      </a>
                    </GalleryCard>
                  </Grid.Col>
                ))}
              </Grid.Row>
            </>
          )}

          {topArtists && topArtists.length > 0 && (
            <>
              <Page.Header title="Top Artists of All Times" />
              <Grid.Row className="row-cards">
                {topArtists.map((item, key) => (
                  <Grid.Col sm={6} lg={3} key={key}>
                    <GalleryCard>
                      <a href={item.artist_url} target="_blank">
                        <GalleryCard.Image
                          href={item.image}
                          src={item.image}
                          alt={`Song Title: ${item.artist_name}`}
                        />
                        <GalleryCard.Footer>
                          <GalleryCard.Details fullName={item.artist_name} />
                        </GalleryCard.Footer>
                      </a>
                    </GalleryCard>
                  </Grid.Col>
                ))}
              </Grid.Row>
            </>
          )}
        </Page.Content>
      </SiteWrapper>
    ) : (
      <Page.Header title="Please Connect your Spotify Account" />
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
      GetUserInfo,
      SpotifyGetUserInfo,
      SpotifyGetRecentPlaylists,
      SpotifyGetTopArtists,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(SpotifyDashboard)
