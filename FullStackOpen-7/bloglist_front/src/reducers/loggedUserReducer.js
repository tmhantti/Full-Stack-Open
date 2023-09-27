import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  password: '',
  user: null,
  name: ''
}

const userSlice= createSlice({
  name: 'loggedUser',
  initialState,
  reducers: {
    setPw(state, action) {
      const pw= action.payload
      const changedState = {
        ...state,
        password: pw
      }
      return changedState
    },
    setUser(state, action) {
      const user= action.payload
      const changedState = {
        ...state,
        user: user
      }
      return changedState
    },
    setName(state, action) {
      const name= action.payload
      const changedState = {
        ...state,
        name: name
      }
      return changedState
    },
  }
})

export const { setPw, setName, setUser } = userSlice.actions

export const setPassword= (pw) => {
  return async dispatch => {
    dispatch(setPw(pw))
  }
}
export const setUserName= (name) => {
  return async dispatch => {
    dispatch(setName(name))
  }
}

export default userSlice.reducer
