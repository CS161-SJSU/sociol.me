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
import { setTokenToLocalStorage } from '../utils'

// eslint-disable-next-line import/prefer-default-export
export const GoogleSignin = (userData) => (dispatch) => {
  return axios
    .post(`${HOST}${VERIFY_GOOGLE_TOKEN_URI}`, userData)
    .then((res) => {
      // console.log('res: ', res)
      // console.log('userData: ', userData)
      const { tokenId, email, firstName, lastName } = userData
      setTokenToLocalStorage(USER_TOKEN, tokenId).then(() => {
        localStorage.setItem(USER_EMAIL, email)
        localStorage.setItem(USER_FIRST_NAME, firstName)
        localStorage.setItem(USER_LAST_NAME, lastName)
        dispatch(verifyGoogleTokenSuccess(userData))
      })
    })
    .catch((err) => {
      dispatch(verifyGoogleTokenFailed(err))
    })
}
