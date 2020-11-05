/* eslint-disable import/prefer-default-export */
import {
  SET_USER_INFO,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  VERIFY_GOOGLE_TOKEN_SUCCESS,
  VERIFY_GOOGLE_TOKEN_FAILED,
  VERIFY_TWITTER_TOKEN_SUCCESS,
  VERIFY_TWITTER_TOKEN_FAILED,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  UPDATE_PROFILE,
  LOGOUT,
} from '../../constants/actions'

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
})

export const loginFailed = (error) => ({
  type: LOGIN_FAILED,
  payload: error,
})

export const verifyGoogleTokenSuccess = (user) => ({
  type: VERIFY_GOOGLE_TOKEN_SUCCESS,
  payload: user,
})

export const verifyGoogleTokenFailed = (error) => ({
  type: VERIFY_GOOGLE_TOKEN_FAILED,
  payload: error,
})

export const verifyTwitterTokenSuccess = (user) => ({
  type: VERIFY_TWITTER_TOKEN_SUCCESS,
  payload: user,
})

export const verifyTwitterTokenFailed = (error) => ({
  type: VERIFY_TWITTER_TOKEN_FAILED,
  payload: error,
})


export const registerSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  payload: user,
})

export const registerFailed = (error) => ({
  type: REGISTER_FAILED,
  payload: error,
})

export const setUserInfo = (user) => ({
  type: SET_USER_INFO,
  payload: user,
})

export const updateProfile = (user) => ({
  type: UPDATE_PROFILE,
  payload: user,
})

export const logout = () => ({
  type: LOGOUT,
})
