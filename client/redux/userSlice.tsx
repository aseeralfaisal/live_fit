import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    pass: '',
    workouts: [],
    specificExercises: [],
    exerciseTarget: '',
  },
  reducers: {
    changeEmailVal: (state, action) => {
      state.email = action.payload
    },
    changePassVal: (state, action) => {
      state.pass = action.payload
    },
    setWorkouts: (state, action) => {
      state.workouts = action.payload
    },
    setSpecificExercises: (state, action) => {
      state.specificExercises = action.payload
    },
    setExerciseTarget: (state, action) => {
      state.exerciseTarget = action.payload
    },
  },
})

export const { changeEmailVal, changePassVal, setWorkouts, setSpecificExercises, setExerciseTarget } = userSlice.actions

export default userSlice.reducer
