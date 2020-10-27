import { combineReducers } from 'redux'
import userReducer from './userReducer'

export interface State {
  loading: boolean
  errors: string | null
}

export default combineReducers({
  user: userReducer,
})
