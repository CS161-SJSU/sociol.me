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
} from '../api/spotify.api'

class SpotifyDashboard extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem(USER_TOKEN)
    const email = localStorage.getItem(USER_EMAIL)

    if (token) {
      this.props.GetUserInfo(email)
      this.props.SpotifyGetUserInfo(email)
      this.props.SpotifyGetRecentPlaylists(email)
    }
  }

  render() {
    const { user } = this.props || {}
    const { token } = user || ''

    const { spotify } = this.props || {}
    console.log('spotify: ', spotify)

    const spotifyUser = spotify.user || []
    const recent = spotify.recent_played || []
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
          {/* <Grid.Row cards deck>
            <Grid.Col width={12} alignItems="center">
              <Card title="Recently Played Songs">
                <Table
                  responsive
                  highlightRowOnHover
                  hasOutline
                  verticalAlign="center"
                  cards
                  className="text-nowrap"
                >
                  <Table.Header>
                    <Table.Row>
                      <Table.ColHeader>No.</Table.ColHeader>
                      <Table.ColHeader>Song Title</Table.ColHeader>
                      <Table.ColHeader>Artist</Table.ColHeader>
                      <Table.ColHeader>Date Played</Table.ColHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {recentSongs.map((item, idx) => (
                      <Table.Row>
                        <Table.Col>
                          <div>{idx + 1}</div>
                        </Table.Col>
                        <Table.Col>
                          <a href={item.track_url} target="_blank">
                            <div>{item.song_title}</div>
                          </a>
                        </Table.Col>
                        <Table.Col>
                          <div>{item.artist_name}</div>
                        </Table.Col>
                        <Table.Col>
                          <div>{item.played_at}</div>
                        </Table.Col>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </Card>
            </Grid.Col>
          </Grid.Row> */}
          {recentSongs && (
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
    { GetUserInfo, SpotifyGetUserInfo, SpotifyGetRecentPlaylists },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(SpotifyDashboard)
