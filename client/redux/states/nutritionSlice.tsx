import { createSlice } from '@reduxjs/toolkit'

export const nutritionSlice = createSlice({
  name: 'nutrition',
  initialState: {
    nutritionResult: [],
  },
  reducers: {
    setNutritionResult: (state, { payload }) => {
      state.nutritionResult = payload
    },
  },
})
export const { setNutritionResult } = nutritionSlice.actions
