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

import { TwitterGetUserInfo, TwitterGetTopWorst } from '../api/twitter.api'
import { SpotifyGetUserInfo } from '../api/spotify.api'

class Dashboard extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem(USER_TOKEN)
    const email = localStorage.getItem(USER_EMAIL)

    if (token) {
      this.props.TwitterGetUserInfo(email)
      this.props.TwitterGetTopWorst(email)
    }
  }

  render() {
    const { user } = this.props || {}
    const { twitter } = this.props || {}

    const twitterUser = twitter.user || []
    const topworst = twitter.topworst || []

    const topTweets = topworst.filter((tweet) => tweet.tweet_index < 6).sort()
    const worstTweets = topworst.filter((tweet) => tweet.tweet_index > 5).sort()

    return (
      <SiteWrapper>
        <Page.Content title="Twitter Dashboard">
          <Grid.Row cards={true} alignItems="center">
            <Grid.Col width={6} sm={4} lg={2}>
              <StatsCard
                layout={1}
                movement={0}
                total={twitterUser.screen_name}
                label="Screen name"
              />
            </Grid.Col>
            <Grid.Col width={6} sm={4} lg={2}>
              <StatsCard
                layout={1}
                movement={0}
                total={twitterUser.statuses_count}
                label="Numbers of tweets"
              />
            </Grid.Col>
            <Grid.Col width={6} sm={4} lg={2}>
              <StatsCard
                layout={1}
                movement={0}
                total={twitterUser.followers_count}
                label="Followers"
              />
            </Grid.Col>
            <Grid.Col width={6} sm={4} lg={2}>
              <StatsCard
                layout={1}
                movement={0}
                total={twitterUser.friends_count}
                label="Following"
              />
            </Grid.Col>
            <Grid.Col width={6} sm={4} lg={2}>
              <StatsCard
                layout={1}
                movement={0}
                total="--"
                la
                label="Tweet Impressions"
              />
            </Grid.Col>
            <Grid.Col width={6} sm={4} lg={2}>
              <StatsCard
                layout={1}
                movement={0}
                total="--"
                la
                label="Profile Visits"
              />
            </Grid.Col>
          </Grid.Row>

          <Grid.Row cards deck>
            <Grid.Col width={12}>
              <Card>
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
                      <Table.ColHeader alignContent="center" className="w-1">
                        <i className="icon-people" />
                      </Table.ColHeader>
                      <Table.ColHeader>Name</Table.ColHeader>
                      <Table.ColHeader>Description</Table.ColHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Col alignContent="center">
                        <Avatar
                          imageURL="/users/trinity.jpg"
                          className="d-block"
                          status="green"
                        />
                      </Table.Col>
                      <Table.Col>
                        <div>{twitterUser.name}</div>
                      </Table.Col>
                      <Table.Col>
                        <div>{twitterUser.description}</div>
                      </Table.Col>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Card>
            </Grid.Col>

            <Grid.Col width={12}>
              <Card title="Top 5 Tweets">
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
                      <Table.ColHeader>Rank</Table.ColHeader>
                      <Table.ColHeader>Retweets</Table.ColHeader>
                      <Table.ColHeader>Likes</Table.ColHeader>
                      <Table.ColHeader>Text</Table.ColHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {topTweets.map((tweet, idx) => (
                      <Table.Row>
                        <Table.Col>
                          <div>{tweet.tweet_index}</div>
                        </Table.Col>
                        <Table.Col>
                          <div>{tweet.retweet_count}</div>
                        </Table.Col>
                        <Table.Col>
                          <div>{tweet.favorite_count}</div>
                        </Table.Col>
                        <Table.Col>
                          <div>{tweet.text}</div>
                        </Table.Col>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </Card>
            </Grid.Col>

            <Grid.Col width={12}>
              <Card title="Worst 5 Tweets">
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
                      <Table.ColHeader>Rank</Table.ColHeader>
                      <Table.ColHeader>Retweets</Table.ColHeader>
                      <Table.ColHeader>Likes</Table.ColHeader>
                      <Table.ColHeader>Text</Table.ColHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {worstTweets.map((tweet, idx) => (
                      <Table.Row>
                        <Table.Col>
                          <div>{(tweet.tweet_index - 11) * -1}</div>
                        </Table.Col>
                        <Table.Col>
                          <div>{tweet.retweet_count}</div>
                        </Table.Col>
                        <Table.Col>
                          <div>{tweet.favorite_count}</div>
                        </Table.Col>
                        <Table.Col>
                          <div>{tweet.text}</div>
                        </Table.Col>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </Card>
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
  return bindActionCreators(
    { TwitterGetUserInfo, TwitterGetTopWorst, SpotifyGetUserInfo },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(Dashboard)
