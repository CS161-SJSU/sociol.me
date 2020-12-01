// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Site, Nav, Grid, Button } from 'tabler-react'

import { USER_TOKEN, USER_EMAIL } from '../constants/main'
import type { NotificationProps } from 'tabler-react'
import { GetUserInfo } from '../api/login.api'

type Props = {
  children: React.Node
}

type State = {
  notificationsObjects: Array<NotificationProps>
}

type subNavItem = {
  value: string
  to?: string
  icon?: string
  LinkComponent?: React.ElementType
  useExact?: boolean
}

type navItem = {
  value: string
  to?: string
  icon?: string
  active?: boolean
  LinkComponent?: React.ElementType
  subItems?: Array<subNavItem>
  useExact?: boolean
}

const navBarItems: Array<navItem> = [
  {
    value: 'Twitter',
    icon: 'twitter',
    to: '/dashboard',
    useExact: true,
  },
  {
    value: 'Spotify',
    icon: 'music',
    to: '/spotifyDashboard',
  },
  {
    value: 'Add Account',
    icon: 'plus',
    to: '/setup',
  },
  {
    value: 'Logout',
    icon: 'log-out',
    to: '/logout',
  },
]

class SiteWrapper extends React.Component<Props, State> {
  state = {
    notificationsObjects: [
      {
        unread: true,
        avatarURL: 'demo/faces/male/41.jpg',
        message: (
          <React.Fragment>
            <strong>Nathan</strong> pushed new commit: Fix page load performance
            issue.
          </React.Fragment>
        ),
        time: '10 minutes ago',
      },
      {
        unread: true,
        avatarURL: 'demo/faces/female/1.jpg',
        message: (
          <React.Fragment>
            <strong>Alice</strong> started new task: Tabler UI design.
          </React.Fragment>
        ),
        time: '1 hour ago',
      },
      {
        unread: false,
        avatarURL: 'demo/faces/female/18.jpg',
        message: (
          <React.Fragment>
            <strong>Rose</strong> deployed new version of NodeJS REST Api // V3
          </React.Fragment>
        ),
        time: '2 hours ago',
      },
    ],
  }

  componentDidMount() {
    const token = localStorage.getItem(USER_TOKEN)
    const email = localStorage.getItem(USER_EMAIL)

    if (token) {
      this.props.GetUserInfo(email)
    }
  }

  render(): React.Node {
    const { user } = this.props || {}
    const notificationsObjects = this.state.notificationsObjects | []
    const unreadCount = this.state.notificationsObjects.reduce(
      (a, v) => a | v.unread,
      false
    )

    const accountDropdownProps = {
      avatarURL: user.image_url,
      name: user.full_name,
      options: [
        { icon: 'user', value: 'Profile' },
        { icon: 'settings', value: 'Settings' },
        { icon: 'mail', value: 'Inbox', badge: '6' },
        { icon: 'send', value: 'Message' },
        { isDivider: true },
        { icon: 'help-circle', value: 'Need help?' },
        { icon: 'log-out', value: 'Sign out' },
      ],
    }
    return (
      <Site.Wrapper
        headerProps={{
          href: '/',
          alt: 'Sociol',
          imageURL: './images/logo.svg',
          navItems: (
            <Nav.Item type="div" className="d-none d-md-flex">
              <Button
                href="https://github.com/CS161-SJSU/social-analytics"
                target="_blank"
                outline
                size="sm"
                RootComponent="a"
                color="primary"
              >
                Source code
              </Button>
            </Nav.Item>
          ),
          notificationsTray: {
            notificationsObjects,
            markAllAsRead: () =>
              this.setState(
                () => ({
                  notificationsObjects: this.state.notificationsObjects.map(
                    (v) => ({ ...v, unread: false })
                  ),
                }),
                () =>
                  setTimeout(
                    () =>
                      this.setState({
                        notificationsObjects: this.state.notificationsObjects.map(
                          (v) => ({ ...v, unread: true })
                        ),
                      }),
                    5000
                  )
              ),
            unread: unreadCount,
          },
          accountDropdown: accountDropdownProps,
        }}
        navProps={{ itemsObjects: navBarItems }}
        // routerContextComponentType={withRouter(RouterContextProvider)}
        footerProps={{
          links: [
            <a href="#">About Us</a>,
            <a href="#">Contact Us</a>,
            <a href="#">Source Code</a>,
            <a href="#">FAQ</a>,
          ],
          note: 'Analytics for your Social Media',
          copyright: <React.Fragment>Copyright © 2020</React.Fragment>,
          nav: (
            <React.Fragment>
              <Grid.Col auto={true}>
                <Button
                  href="https://github.com/CS161-SJSU/social-analytics"
                  size="sm"
                  outline
                  color="primary"
                  RootComponent="a"
                >
                  Source code
                </Button>
              </Grid.Col>
            </React.Fragment>
          ),
        }}
      >
        {this.props.children}
      </Site.Wrapper>
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
  return bindActionCreators({ GetUserInfo }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(SiteWrapper)
