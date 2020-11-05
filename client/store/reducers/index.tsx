import { combineReducers } from 'redux'
import userReducer from './userReducer'
import TwitterReducer from './twitterReducer'

export interface State {
  loading: boolean
  errors: string | null
}

export default combineReducers({
  user: userReducer,
  twitter: TwitterReducer,
})
