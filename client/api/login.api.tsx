import axios from 'axios'
import {
  verifyGoogleTokenSuccess,
  verifyGoogleTokenFailed,
} from '../store/actions/auth.action'
import {
  HOST,
  LOGIN_URI,
  USER_EMAIL,
  USER_TOKEN,
  USER_FIRST_NAME,
  USER_LAST_NAME,
  VERIFY_GOOGLE_TOKEN_URI,
} from '../constants/main'

// eslint-disable-next-line import/prefer-default-export
export const GoogleSignin = (userData) => (dispatch) => {
  return axios
    .post(`${HOST}${VERIFY_GOOGLE_TOKEN_URI}`, userData)
    .then((res) => {
      console.log('res: ', res)
      // const { token, email, first_name, last_name } = res.data
      dispatch(verifyGoogleTokenSuccess(userData))
      // TODO: Save user data
    })
    .catch((err) => {
      dispatch(verifyGoogleTokenFailed(err))
    })
}
