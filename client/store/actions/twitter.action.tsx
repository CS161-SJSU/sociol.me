/* eslint-disable import/prefer-default-export */
import * as types from '../../constants/actions'

export const twitterAuthSuccess = (user) => ({
  type: types.TWITTER_AUTH_SUCCESS,
  payload: user,
})

export const twitterAuthFailed = (error) => ({
  type: types.TWITTER_AUTH_FAILED,
  payload: error,
})

export const twitterAccessTokenSuccess = (user) => ({
  type: types.TWITTER_ACCESS_TOKEN_SUCCESS,
  payload: user,
})

export const twitterAccessTokenFailed = (error) => ({
  type: types.TWITTER_ACCESS_TOKEN_FAILED,
  payload: error,
})

export const twitterGetUserSuccess = (user) => ({
  type: types.TWITTER_GET_USER_SUCCESS,
  payload: user,
})

export const twitterGetUserFailed = (error) => ({
  type: types.TWITTER_GET_USER_FAILED,
  payload: error,
})

export const twitterGetTopWorstTweetsSuccess = (user) => ({
  type: types.TWITTER_GET_TOP_WORST_TWEETS_SUCCESS,
  payload: user,
})

export const twitterGetTopWorstTweetsFailed = (error) => ({
  type: types.TWITTER_GET_TOP_WORST_TWEETS_FAILED,
  payload: error,
})
