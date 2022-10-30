import { createSlice } from '@reduxjs/toolkit'
import { endOfDay, formatISO } from 'date-fns'
const DATE = new Date(new Date().toISOString().split('T')[0] + 'T00:00:00.000Z')
export const nutritionSlice = createSlice({
  name: 'nutrition',
  initialState: {
    nutritionResult: [],
    todaysDate: DATE,
    resultPopup: false,
  },
  reducers: {
    setNutritionResult: (state, { payload }) => {
      state.nutritionResult = payload
    },
    setTodaysDate: (state, { payload }) => {
      state.todaysDate = payload
    },
    setResultPopup: (state, { payload }) => {
      state.resultPopup = payload
    },
  },
})
export const { setNutritionResult, setTodaysDate, setResultPopup } = nutritionSlice.actions
