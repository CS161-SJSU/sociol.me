import axios from 'axios'
import { loginSuccessfully, loginFailed } from '../store/actions/auth.action'
import {
  HOST,
  LOGIN_URI,
  USER_EMAIL,
  USER_TOKEN,
  USER_FIRST_NAME,
  USER_LAST_NAME,
} from '../constants/main'

// eslint-disable-next-line import/prefer-default-export
export const login = (userData) => (dispatch) => {
  return axios
    .post(`${HOST}${LOGIN_URI}`, userData)
    .then((res) => {
      // const { token, email, first_name, last_name } = ress.data
      dispatch(loginSuccessfully(res.data))
    })
    .catch((err) => {
      dispatch(loginFailed(err))
    })
}
