import { createSlice } from '@reduxjs/toolkit'

const initialState= null
const notificationSlice= createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationTxt(state, action) {
      return action.payload
    },
  }
})

export const { setNotificationTxt } = notificationSlice.actions

export const setNotification= (msg, duration) => {
  return async dispatch => {
    dispatch(setNotificationTxt(msg))
    setTimeout(() =>
    {dispatch(setNotificationTxt(''))},
    duration*1000)
  }
}
export default notificationSlice.reducer