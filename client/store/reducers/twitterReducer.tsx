import { AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import { State } from './index'
import * as types from '../../constants/actions'

export default function TwitterReducer(
  state: State = { loading: false, errors: null },
  action: AnyAction
) {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.user }
    case types.TWITTER_AUTH_SUCCESS:
      return { ...state, ...action.payload, ...{ loading: false } }
    case types.TWITTER_AUTH_FAILED:
      return { ...state, ...{ loading: false }, ...{ errors: action.payload } }
    case types.TWITTER_ACCESS_TOKEN_SUCCESS:
      return { ...state, ...action.payload, ...{ loading: false } }
    case types.TWITTER_ACCESS_TOKEN_FAILED:
      return { ...state, ...{ loading: false }, ...{ errors: action.payload } }
    case types.LOGOUT:
      return {}
    default:
      return state
  }
}
