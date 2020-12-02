import axios from 'axios'
import {
  twitterAuthSuccess,
  twitterAuthFailed,
  twitterAccessTokenSuccess,
  twitterAccessTokenFailed,
  twitterGetUserSuccess,
  twitterGetUserFailed,
  twitterTopWorstTweetsSuccess,
  twitterTopWorstTweetsFailed,
  twitterGetTopWorstTweetsSuccess,
  twitterGetTopWorstTweetsFailed,
} from '../store/actions/twitter.action'
import {
  HOST,
  TWITTER_AUTH,
  TWITTER_ACCESS_TOKEN,
  TWITTER_ME,
  TWITTER_TOP_WORST,
  TWITTER_GET_TOP_WORST,
} from '../constants/main'

export const TwitterConnect = () => (dispatch) => {
  return axios
    .post(`${HOST}${TWITTER_AUTH}`)
    .then((res) => {
      dispatch(twitterAuthSuccess(res.data))
    })
    .catch((err) => {
      dispatch(twitterAuthFailed(err))
    })
}

export const TwitterAccessToken = (userData) => (dispatch) => {
  return axios
    .post(`${HOST}${TWITTER_ACCESS_TOKEN}`, userData)
    .then((res) => {
      dispatch(twitterAccessTokenSuccess(res.data))
    })
    .catch((err) => {
      dispatch(twitterAccessTokenFailed(err))
    })
}

export const TwitterGetUserInfo = (email) => (dispatch) => {
  return axios
    .get(`${HOST}${TWITTER_ME}?email=${email}`)
    .then((res) => {
      dispatch(twitterGetUserSuccess(res.data))
      return res.data
    })
    .catch((err) => {
      dispatch(twitterGetUserFailed(err))
    })
}

export const TwitterTopWorst = (userData) => (dispatch) => {
  return axios
    .post(`${HOST}${TWITTER_TOP_WORST}`, userData)
    .then((res) => {
      dispatch(twitterTopWorstTweetsSuccess(res.data))
    })
    .catch((err) => {
      dispatch(twitterTopWorstTweetsFailed(err))
    })
}

export const TwitterGetTopWorst = (email) => (dispatch) => {
  return axios
    .get(`${HOST}${TWITTER_GET_TOP_WORST}?email=${email}`)
    .then((res) => {
      dispatch(twitterGetTopWorstTweetsSuccess(res.data))
    })
    .catch((err) => {
      dispatch(twitterGetTopWorstTweetsFailed(err))
    })
}
