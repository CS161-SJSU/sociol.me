import { combineReducers } from 'redux'
import userReducer from './userReducer'
import twitterReducer from './twitterReducer'
import spotifyReducer from './spotifyReducer'

export interface State {
  loading: boolean
  errors: string | null
}

export default combineReducers({
  user: userReducer,
  twitter: twitterReducer,
  spotify: spotifyReducer,
})
