import { createSlice } from '@reduxjs/toolkit'

export const bmiSlice = createSlice({
  name: 'bmi',
  initialState: {
    bmi: 0,
  },
  reducers: {
    changeBmi: (state, action) => {
      state.bmi = action.payload
    },
  },
})

export const { changeBmi } = bmiSlice.actions
