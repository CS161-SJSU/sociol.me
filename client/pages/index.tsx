import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { State } from '../store/reducers'
import { TwitterGetUserInfo } from '../api/twitter.api'
import { USER_EMAIL, USER_TOKEN } from '../constants/main'
import Landing from '../components/Landing'

const Index = (props) => {
  useEffect(() => {
    const token = window.localStorage.getItem(USER_TOKEN)
    const email = window.localStorage.getItem(USER_EMAIL)
    if (email) {
      // props.TwitterGetUserInfo(email)
    }
  })

  return (
    <div>
      <Landing />
    </div>
  )
}

Index.getInitialProps = (props) => ({})

function mapStateToProps(state) {
  return {
    user: state.user,
    twitter: state.twitter,
    spotify: state.spotify,
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ TwitterGetUserInfo }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Index)
