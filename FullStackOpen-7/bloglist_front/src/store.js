import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loggedUserReducer from './reducers/loggedUserReducer'

const configStore = () => {
  const rootReducer = {
    notification: notificationReducer,
    blogs: blogReducer,
    loggedUser: loggedUserReducer
  }

  return configureStore({
    reducer: rootReducer
  })
}

export default configStore