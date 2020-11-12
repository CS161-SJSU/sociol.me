import { AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import { State } from './index'
import * as types from '../../constants/actions'

export default function spotifyReducer(
  state: State = { loading: false, errors: null },
  action: AnyAction
) {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.user }
    case types.SPOTIFY_AUTH_SUCCESS:
      return { ...state, ...action.payload, ...{ loading: false } }
    case types.SPOTIFY_AUTH_FAILED:
      return { ...state, ...{ loading: false }, ...{ errors: action.payload } }
    case types.SPOTIFY_UPDATE_EMAIL_SUCCESS:
      return { ...state, ...action.payload, ...{ loading: false } }
    case types.SPOTIFY_UPDATE_EMAIL_FAILED:
      return { ...state, ...{ loading: false }, ...{ errors: action.payload } }
    case types.SPOTIFY_GET_USER_SUCCESS:
      return { ...state, ...action.payload, ...{ loading: false } }
    case types.SPOTIFY_GET_USER_FAILED:
      return { ...state, ...{ loading: false }, ...{ errors: action.payload } }
    case types.SPOTIFY_GET_TOP_TRACKS_SUCCESS:
      return { ...state, ...action.payload, ...{ loading: false } }
    case types.SPOTIFY_GET_TOP_TRACKS_FAILED:
      return { ...state, ...{ loading: false }, ...{ errors: action.payload } }
    case types.SPOTIFY_GET_TOP_PLAYLISTS_SUCCESS:
      return { ...state, ...action.payload, ...{ loading: false } }
    case types.SPOTIFY_GET_TOP_PLAYLISTS_FAILED:
      return { ...state, ...{ loading: false }, ...{ errors: action.payload } }
    case types.LOGOUT:
      return {}
    default:
      return state
  }
}
