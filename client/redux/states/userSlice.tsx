import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userVal: '',
    pass: '',
    popupTitle: '',
    userInfo: null,
  },
  reducers: {
    changeUserVal: (state, action) => {
      state.userVal = action.payload
    },
    changePassVal: (state, action) => {
      state.pass = action.payload
    },
    changePopupTitle: (state, action) => {
      state.popupTitle = action.payload
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
  },
})

export const { changeUserVal, changePassVal, changePopupTitle, setUserInfo } = userSlice.actions
