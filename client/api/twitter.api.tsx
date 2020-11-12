import axios from 'axios'
import {
  twitterAuthSuccess,
  twitterAuthFailed,
  twitterAccessTokenSuccess,
  twitterAccessTokenFailed,
  twitterGetUserSuccess,
  twitterGetUserFailed,
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
import { setTokenToLocalStorage } from '../utils'

export const TwitterConnect = () => (dispatch) => {
  return axios
    .post(`${HOST}${TWITTER_AUTH}`)
    .then((res) => {
      console.log('TwitterConnect res: ', res.data)
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
      console.log('TwitterAccessToken res: ', res)
      dispatch(twitterAccessTokenSuccess(res.data))
    })
    .catch((err) => {
      dispatch(twitterAccessTokenFailed(err))
    })
}

export const TwitterGetUserInfo = (email) => (dispatch) => {
  axios
    .get(`${HOST}${TWITTER_ME}?email=${email}`)
    .then((res) => {
      console.log('TwitterMe res: ', res)
      dispatch(twitterGetUserSuccess(res.data))
      return res.data
    })
    .catch((err) => {
      console.log('err: ', err)
      dispatch(twitterGetUserFailed(err))
    })
}

export const TwitterTopWorst = (userData) => (dispatch) => {
  return axios
    .post(`${HOST}${TWITTER_TOP_WORST}`, userData)
    .then((res) => {
      console.log('TwitterTopWorst res: ', res)
      dispatch(twitterGetTopWorstTweetsSuccess(res.data))
    })
    .catch((err) => {
      console.log('err: ', err)
      dispatch(twitterGetTopWorstTweetsFailed(err))
    })
}

export const TwitterGetTopWorst = (email) => (dispatch) => {
  return axios
    .get(`${HOST}${TWITTER_GET_TOP_WORST}?email=${email}`)
    .then((res) => {
      console.log('TwitterGetTopWorst res: ', res)
      dispatch(twitterGetTopWorstTweetsSuccess(res.data))
    })
    .catch((err) => {
      console.log('err: ', err)
      dispatch(twitterGetTopWorstTweetsFailed(err))
    })
}
