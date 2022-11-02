import { createSlice } from '@reduxjs/toolkit'

export const bmiSlice = createSlice({
  name: 'BMI',
  initialState: {
    bmi: 0,
    massIndexMethod: 'BMI',
  },
  reducers: {
    changeBmi: (state, action) => {
      state.bmi = action.payload
    },
    setMassIndexMethod: (state, { payload }) => {
      state.massIndexMethod = payload
    },
  },
})

export const { changeBmi, setMassIndexMethod } = bmiSlice.actions
