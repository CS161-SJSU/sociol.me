/* eslint-disable import/prefer-default-export */
import {
  SET_USER_INFO,
  VERIFY_TWITTER_TOKEN_SUCCESS,
  VERIFY_TWITTER_TOKEN_FAILED,
  LOGOUT,
} from '../../constants/actions'



export const verifyTwitterTokenSuccess = (user) => ({
  type: VERIFY_TWITTER_TOKEN_SUCCESS,
  payload: user,
})

export const verifyTwitterTokenFailed = (error) => ({
  type: VERIFY_TWITTER_TOKEN_FAILED,
  payload: error,
})


export const setUserInfo = (user) => ({
  type: SET_USER_INFO,
  payload: user,
})


export const logout = () => ({
  type: LOGOUT,
})
