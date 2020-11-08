import axios from 'axios'
import {
  twitterAuthSuccess,
  twitterAuthFailed,
  twitterAccessTokenSuccess,
  twitterAccessTokenFailed,
  twitterGetUserSuccess,
  twitterGetUserFailed,
} from '../store/actions/twitter.action'
import {
  HOST,
  TWITTER_AUTH,
  TWITTER_ACCESS_TOKEN,
  TWITTER_ME,
} from '../constants/main'
import { setTokenToLocalStorage } from '../utils'

// eslint-disable-next-line import/prefer-default-export
export const TwitterConnect = () => (dispatch) => {
  return axios
    .post(`${HOST}${TWITTER_AUTH}`)
    .then((res) => {
      console.log('TwitterConnect res: ', res.data)
      // console.log('userData: ', userData)
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
      console.log('TwitterVerify res: ', res)
      // console.log('userData: ', userData)
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
      console.log('TwitterVerify res: ', res)
      // console.log('userData: ', userData)
      dispatch(twitterGetUserSuccess(res.data))
    })
    .catch((err) => {
      console.log('err: ', err)
      dispatch(twitterGetUserFailed(err))
    })
}
