import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: "",
    pass: "" 
  },
  reducers: {
    changeEmailVal: (state, action) => {
      state.email = action.payload
    },
    changePassVal: (state, action) => {
      state.pass = action.payload
    },
  }
})

export const { changeEmailVal, changePassVal } = userSlice.actions

export default userSlice.reducer