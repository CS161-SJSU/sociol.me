import axios from 'axios'
import {
  verifyGoogleTokenSuccess,
  verifyGoogleTokenFailed,
} from '../store/actions/auth.action'
import { HOST, USER_EMAIL } from '../constants/main'
import { setTokenToLocalStorage } from '../utils'

// eslint-disable-next-line import/prefer-default-export
export const TwitterConnect = (userData) => (dispatch) => {
  return axios
    .post(`${HOST}`, userData)
    .then((res) => {
      // console.log('res: ', res)
      // console.log('userData: ', userData)
      dispatch(verifyGoogleTokenSuccess(userData))
    })
    .catch((err) => {
      dispatch(verifyGoogleTokenFailed(err))
    })
}
