/* eslint-disable import/prefer-default-export */
import * as types from '../../constants/actions'

export const spotifyAuthSuccess = (user) => ({
  type: types.SPOTIFY_AUTH_SUCCESS,
  payload: user,
})

export const spotifyAuthFailed = (error) => ({
  type: types.SPOTIFY_AUTH_FAILED,
  payload: error,
})

export const spotifyUpdateEmailSuccess = (user) => ({
  type: types.SPOTIFY_UPDATE_EMAIL_SUCCESS,
  payload: user,
})

export const spotifyUpdateEmailFailed = (error) => ({
  type: types.SPOTIFY_UPDATE_EMAIL_FAILED,
  payload: error,
})

export const spotifyGetUserSuccess = (user) => ({
  type: types.SPOTIFY_GET_USER_SUCCESS,
  payload: user,
})

export const spotifyGetUserFailed = (error) => ({
  type: types.SPOTIFY_GET_USER_FAILED,
  payload: error,
})

export const spotifyGetTopTracksSuccess = (user) => ({
  type: types.SPOTIFY_GET_TOP_TRACKS_SUCCESS,
  payload: user,
})

export const spotifyGetTopTracksFailed = (error) => ({
  type: types.SPOTIFY_GET_TOP_TRACKS_FAILED,
  payload: error,
})

export const spotifyGetTopPlaylistsSuccess = (user) => ({
  type: types.SPOTIFY_GET_TOP_PLAYLISTS_SUCCESS,
  payload: user,
})

export const spotifyGetTopPlaylistsFailed = (error) => ({
  type: types.SPOTIFY_GET_TOP_PLAYLISTS_FAILED,
  payload: error,
})
