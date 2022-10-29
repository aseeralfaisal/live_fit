import { createSlice } from '@reduxjs/toolkit'
const T = "T00:00:00.000Z"
export const nutritionSlice = createSlice({
  name: 'nutrition',
  initialState: {
    nutritionResult: [],
    todaysDate: new Date(new Date().toISOString().split("T")[0] + T),
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
