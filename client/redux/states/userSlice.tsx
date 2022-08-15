import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userVal: '',
    pass: '',
  },
  reducers: {
    changeUserVal: (state, action) => {
      state.userVal = action.payload
    },
    changePassVal: (state, action) => {
      state.pass = action.payload
    },
  },
})

export const { changeUserVal, changePassVal } = userSlice.actions
