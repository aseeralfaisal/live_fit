import { createSlice } from '@reduxjs/toolkit'

export const workoutSlice = createSlice({
  name: 'workout',
  initialState: {
    workouts: [],
    specificExercises: [],
    exerciseTarget: '',
  },
  reducers: {
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

export const { setWorkouts, setSpecificExercises, setExerciseTarget } = workoutSlice.actions
