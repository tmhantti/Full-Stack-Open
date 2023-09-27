/* eslint-disable linebreak-style */
import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

export const rootReducer = {
  anecdotes: anecdoteReducer,
  filter: filterReducer,
  notification: notificationReducer
}

const configStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export default configStore