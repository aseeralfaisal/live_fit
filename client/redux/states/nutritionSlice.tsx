import { createSlice } from '@reduxjs/toolkit'

export const nutritionSlice = createSlice({
  name: 'nutrition',
  initialState: {
    nutritionResult: [],
    todaysDate: new Date(),
  },
  reducers: {
    setNutritionResult: (state, { payload }) => {
      state.nutritionResult = payload
    },
    setTodaysDate: (state, { payload }) => {
      state.todaysDate = payload
    },
  },
})
export const { setNutritionResult, setTodaysDate } = nutritionSlice.actions
