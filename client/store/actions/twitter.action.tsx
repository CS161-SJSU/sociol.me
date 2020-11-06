/* eslint-disable import/prefer-default-export */
import {
  TWITTER_AUTH_SUCCESS,
  TWITTER_AUTH_FAILED,
  TWITTER_ACCESS_TOKEN_SUCCESS,
  TWITTER_ACCESS_TOKEN_FAILED,
} from '../../constants/actions'

export const twitterAuthSuccess = (user) => ({
  type: TWITTER_AUTH_SUCCESS,
  payload: user,
})

export const twitterAuthFailed = (error) => ({
  type: TWITTER_AUTH_FAILED,
  payload: error,
})

export const twitterAccessTokenSuccess = (user) => ({
  type: TWITTER_ACCESS_TOKEN_SUCCESS,
  payload: user,
})

export const twitterAccessTokenFailed = (error) => ({
  type: TWITTER_ACCESS_TOKEN_FAILED,
  payload: error,
})
