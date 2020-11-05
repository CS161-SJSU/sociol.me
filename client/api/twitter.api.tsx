import axios from 'axios'
import {
  twitterAuthSuccess,
  twitterAuthFailed,
  twitterAccessTokenSuccess,
  twitterAccessTokenFailed,
} from '../store/actions/twitter.action'
import {
  HOST,
  USER_EMAIL,
  TWITTER_AUTH,
  TWITTER_ACCESS_TOKEN,
} from '../constants/main'
import { setTokenToLocalStorage } from '../utils'

// eslint-disable-next-line import/prefer-default-export
export const TwitterConnect = () => (dispatch) => {
  return axios
    .post(`${HOST}${TWITTER_AUTH}`)
    .then((res) => {
      console.log('TwitterConnect res: ', res)
      // console.log('userData: ', userData)
      dispatch(twitterAuthSuccess(res))
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
      dispatch(twitterAccessTokenSuccess(res))
    })
    .catch((err) => {
      dispatch(twitterAccessTokenFailed(err))
    })
}
