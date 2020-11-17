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
  spotifyRecentPlaylistsSuccess,
  spotifyRecentPlaylistsFailed,
  spotifyGetRecentPlaylistsSuccess,
  spotifyGetRecentPlaylistsFailed,
} from '../store/actions/spotify.action'
import {
  HOST,
  SPOTIFIY_AUTH,
  SPOTIFIY_ME,
  SPOTIFIY_UPDATE_EMAIL,
  SPOTIFIY_RECENT_PLAYLISTS,
  SPOTIFIY_GET_RECENT_PLAYLISTS,
} from '../constants/main'
import { setTokenToLocalStorage } from '../utils'

// eslint-disable-next-line import/prefer-default-export
export const SpotifyConnect = () => (dispatch) => {
  return axios
    .get(`${HOST}${SPOTIFIY_AUTH}`)
    .then((res) => {
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
      dispatch(spotifyAuthSuccess(res.data))
    })
    .catch((err) => {
      dispatch(spotifyAuthFailed(err))
    })
}

export const SpotifyGetUserInfo = (email) => (dispatch) => {
  return axios
    .get(`${HOST}${SPOTIFIY_ME}?email=${email}`)
    .then((res) => {
      dispatch(spotifyGetUserSuccess(res.data))
    })
    .catch((err) => {
      dispatch(spotifyGetUserFailed(err))
    })
}

export const SpotifyRecentPlaylists = (userData) => (dispatch) => {
  return axios
    .post(`${HOST}${SPOTIFIY_RECENT_PLAYLISTS}`, userData)
    .then((res) => {
      dispatch(spotifyRecentPlaylistsSuccess(res.data))
    })
    .catch((err) => {
      dispatch(spotifyRecentPlaylistsFailed(err))
    })
}

export const SpotifyGetRecentPlaylists = (email) => (dispatch) => {
  return axios
    .get(`${HOST}${SPOTIFIY_GET_RECENT_PLAYLISTS}?email=${email}`)
    .then((res) => {
      dispatch(spotifyGetRecentPlaylistsSuccess(res.data))
    })
    .catch((err) => {
      dispatch(spotifyGetRecentPlaylistsFailed(err))
    })
}
