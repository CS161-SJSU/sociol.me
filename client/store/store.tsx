import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import { MakeStore, createWrapper, Context } from 'next-redux-wrapper'

import reducers, { State } from './reducers'

export const makeStore: MakeStore<State> = (context: Context) =>
  createStore(reducers, composeWithDevTools(applyMiddleware(thunk, logger)))

export const wrapper = createWrapper<State>(makeStore, { debug: true })
