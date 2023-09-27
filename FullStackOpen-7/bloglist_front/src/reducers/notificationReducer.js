import { createSlice } from '@reduxjs/toolkit'

const initialState= ['', '']
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

export const setNotification= ([msg, msgType]) => {
  return async dispatch => {
    dispatch(setNotificationTxt([msg, msgType]))
    setTimeout(() =>
    {dispatch(setNotificationTxt(['', '']))},
    2*1000)
  }
}
export default notificationSlice.reducer