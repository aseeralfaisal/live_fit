import { createSlice } from '@reduxjs/toolkit'

export const bmiSlice = createSlice({
  name: 'BMI',
  initialState: {
    massIndexMethod: 'BMI',
  },
  reducers: {
    setMassIndexMethod: (state, { payload }) => {
      state.massIndexMethod = payload
    },
  },
})

export const { setMassIndexMethod } = bmiSlice.actions
