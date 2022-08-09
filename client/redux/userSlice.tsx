import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userVal: '',
    pass: '',
    workouts: [],
    specificExercises: [],
    exerciseTarget: '',
  },
  reducers: {
    changeUserVal: (state, action) => {
      state.userVal = action.payload
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

export const { changeUserVal, changePassVal, setWorkouts, setSpecificExercises, setExerciseTarget } = userSlice.actions

export default userSlice.reducer
