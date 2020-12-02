import axios from 'axios'
import {
  spotifyAuthSuccess,
  spotifyAuthFailed,
  spotifyUpdateEmailSuccess,
  spotifyUpdateEmailFailed,
  spotifyGetUserSuccess,
  spotifyGetUserFailed,
  spotifyRefreshTokenSuccess,
  spotifyRefreshTokenFailed,
  spotifyGetTopArtistsSuccess,
  spotifyGetTopArtistsFailed,
  spotifyTopArtistsSuccess,
  spotifyTopArtistsFailed,
  spotifyRecentPlaylistsSuccess,
  spotifyRecentPlaylistsFailed,
  spotifyGetRecentPlaylistsSuccess,
  spotifyGetRecentPlaylistsFailed,
} from '../store/actions/spotify.action'
import {
  HOST,
  SPOTIFIY_AUTH,
  SPOTIFIY_ME,
  SPOTIFIY_REFRESH,
  SPOTIFIY_UPDATE_EMAIL,
  SPOTIFIY_RECENT_PLAYLISTS,
  SPOTIFIY_GET_RECENT_PLAYLISTS,
  SPOTIFIY_GET_TOP_ARTIST,
  SPOTIFIY_TOP_ARTIST,
} from '../constants/main'


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
        // SpotifyGetUserInfo(userData.email)
        // SpotifyRecentPlaylists(userData)
        dispatch(spotifyUpdateEmailSuccess(res.data))
      })
      .catch((err) => {
        dispatch(spotifyUpdateEmailFailed(err))
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

export const SpotifyRefreshToken = (userData) => (dispatch) => {
  return axios
      .post(`${HOST}${SPOTIFIY_REFRESH}`, userData)
      .then((res) => {
        dispatch(spotifyRefreshTokenSuccess(res.data))
      })
      .catch((err) => {
        dispatch(spotifyRefreshTokenFailed(err))
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

export const SpotifyTopArtists = (userData) => (dispatch) => {
  return axios
      .post(`${HOST}${SPOTIFIY_TOP_ARTIST}`, userData)
      .then((res) => {
        dispatch(spotifyTopArtistsSuccess(res.data))
      })
      .catch((err) => {
        dispatch(spotifyTopArtistsFailed(err))
      })
}

export const SpotifyGetTopArtists = (email) => (dispatch) => {
  return axios
      .get(`${HOST}${SPOTIFIY_GET_TOP_ARTIST}?email=${email}`)
      .then((res) => {
        dispatch(spotifyGetTopArtistsSuccess(res.data))
      })
      .catch((err) => {
        dispatch(spotifyGetTopArtistsFailed(err))
      })
}
