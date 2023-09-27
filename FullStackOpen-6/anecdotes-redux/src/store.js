import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

/* HUOMAUTUS: meniköhän tämä nyt ihan niin kuin piti 
              (asynccia ei käytetty)? (harjoitus 6.16) */
const configStore = () => {
    const rootReducer = {
      anecdotes: anecdoteReducer,
      filter: filterReducer,
      notification: notificationReducer
    }
  
    return configureStore({
      reducer: rootReducer
    })
  }

export default configStore