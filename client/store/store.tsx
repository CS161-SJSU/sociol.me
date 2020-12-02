import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createWrapper } from 'next-redux-wrapper'

import reducers from './reducers'

export const makeStore = () =>
  createStore(reducers, composeWithDevTools(applyMiddleware(thunk, logger)))

export const wrapper = createWrapper(makeStore, { debug: true })
