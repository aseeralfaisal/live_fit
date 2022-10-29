import { createSlice } from '@reduxjs/toolkit'

export const nutritionSlice = createSlice({
  name: 'nutrition',
  initialState: {
    nutritionResult: [],
    todaysDate: new Date(),
    mealType: '',
  },
  reducers: {
    setNutritionResult: (state, { payload }) => {
      state.nutritionResult = payload
    },
    setTodaysDate: (state, { payload }) => {
      state.todaysDate = payload
    },
    setMealType: (state, { payload }) => {
      state.mealType = payload
    },
  },
})
export const { setNutritionResult, setTodaysDate, setMealType } = nutritionSlice.actions
