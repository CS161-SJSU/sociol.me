import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { TwitterGetUserInfo } from '../api/twitter.api'
import Landing from '../components/Landing'

const Index = () => {
  return (
    <div>
      <Landing />
    </div>
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
  return bindActionCreators({ TwitterGetUserInfo }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Index)
