import axios from 'axios'
import {
  spotifyAuthSuccess,
  spotifyAuthFailed,
  spotifyGetUserSuccess,
  spotifyGetUserFailed,
  spotifyGetTopTracksSuccess,
  spotifyGetTopTracksFailed,
  spotifyGetTopPlaylistsSuccess,
  spotifyGetTopPlaylistsFailed,
} from '../store/actions/spotify.action'
import {
  HOST,
  SPOTIFIY_AUTH,
  SPOTIFIY_ME,
  SPOTIFIY_UPDATE_EMAIL,
} from '../constants/main'
import { setTokenToLocalStorage } from '../utils'

// eslint-disable-next-line import/prefer-default-export
export const SpotifyConnect = () => (dispatch) => {
  return axios
    .get(`${HOST}${SPOTIFIY_AUTH}`)
    .then((res) => {
      console.log('TwitterConnect res: ', res.data)
      // console.log('userData: ', userData)
      dispatch(spotifyAuthSuccess(res.data))
    })
    .catch((err) => {
      dispatch(spotifyAuthFailed(err))
    })
}

export const SpotifyUpdateEmail = (userData) => (dispatch) => {
  return axios
    .post(`${HOST}${SPOTIFIY_UPDATE_EMAIL}`, userData)
    .then((res) => {
      console.log('TwitterConnect res: ', res.data)
      // console.log('userData: ', userData)
      dispatch(spotifyAuthSuccess(res.data))
    })
    .catch((err) => {
      dispatch(spotifyAuthFailed(err))
    })
}

export const SpotifyMe = (userData) => (dispatch) => {
  return axios
    .get(`${HOST}${SPOTIFIY_ME}`, userData)
    .then((res) => {
      console.log('TwitterVerify res: ', res)
      // console.log('userData: ', userData)
      dispatch(spotifyGetUserSuccess(res.data))
    })
    .catch((err) => {
      dispatch(spotifyGetUserFailed(err))
    })
}
