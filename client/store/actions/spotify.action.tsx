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

export const spotifyRefreshTokenSuccess = (user) => ({
  type: types.SPOTIFY_REFRESH_TOKEN_SUCCESS,
  payload: user,
})

export const spotifyRefreshTokenFailed = (error) => ({
  type: types.SPOTIFY_REFRESH_TOKEN_FAILED,
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

export const spotifyGetTopArtistsSuccess = (user) => ({
  type: types.SPOTIFY_GET_TOP_ARTISTS_SUCCESS,
  payload: user,
})

export const spotifyGetTopArtistsFailed = (error) => ({
  type: types.SPOTIFY_GET_TOP_ARTISTS_FAILED,
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

export const spotifyRecentPlaylistsSuccess = (user) => ({
  type: types.SPOTIFY_RECENT_PLAYLISTS_SUCCESS,
  payload: user,
})

export const spotifyRecentPlaylistsFailed = (error) => ({
  type: types.SPOTIFY_RECENT_PLAYLISTS_FAILED,
  payload: error,
})

export const spotifyGetRecentPlaylistsSuccess = (user) => ({
  type: types.SPOTIFY_GET_RECENT_PLAYLISTS_SUCCESS,
  payload: user,
})

export const spotifyGetRecentPlaylistsFailed = (error) => ({
  type: types.SPOTIFY_GET_RECENT_PLAYLISTS_FAILED,
  payload: error,
})
