import { AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import { State } from './index'
import * as types from '../../constants/actions'

export default function userReducer(
  state: State = { loading: false, errors: null },
  action: AnyAction
) {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.user }
    case types.LOGIN_SUCCESS:
      return { ...state, ...action.payload, ...{ loading: false } }
    case types.LOGIN_FAILED:
      return { ...state, ...{ loading: false }, ...{ errors: action.payload } }
    case types.GET_USER_SUCCESS:
      return { ...state, ...action.payload, ...{ loading: false } }
    case types.GET_USER_FAILED:
      return { ...state, ...{ loading: false }, ...{ errors: action.payload } }
    case types.VERIFY_GOOGLE_TOKEN_SUCCESS:
      return { ...state, ...action.payload, ...{ loading: false } }
    case types.VERIFY_GOOGLE_TOKEN_FAILED:
      return { ...state, ...{ loading: false }, ...{ errors: action.payload } }
    case types.LOGOUT:
      return {}
    default:
      return state
  }
}
