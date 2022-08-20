import { createSlice } from '@reduxjs/toolkit'

export const workoutSlice = createSlice({
  name: 'workout',
  initialState: {
    workouts: [],
    workoutName: '',
    workoutNameUserInput: '',
    specificExercises: [],
    exerciseTarget: '',
    UserExercises: [],
    selectedList: [],
    exerciseId: '',
  },
  reducers: {
    setWorkouts: (state, { payload }) => {
      state.workouts = payload
    },
    setSpecificExercises: (state, { payload }) => {
      state.specificExercises = payload
    },
    setExerciseTarget: (state, { payload }) => {
      state.exerciseTarget = payload
    },
    setUserExercises: (state, { payload }) => {
      state.UserExercises = payload
    },
    setWorkoutName: (state, { payload }) => {
      state.workoutName = payload
    },
    setWorkoutNameUserInput: (state, { payload }) => {
      state.workoutNameUserInput = payload
    },
    setExerciseId: (state, { payload }) => {
      state.exerciseId = payload
    },
    setSelectedList: (state: any, action) => {
      const { payload } = action
      const found = state.selectedList.find(({ _id }: { _id: string }) => _id === payload._id)
      if (found) {
        state.selectedList = state.selectedList.filter(({ _id }: { _id: string }) => _id !== payload._id)
      } else {
        state.selectedList = [...state.selectedList, payload]
      }
    },
  },
})
export const {
  setWorkouts,
  setSpecificExercises,
  setExerciseTarget,
  setUserExercises,
  setWorkoutName,
  setWorkoutNameUserInput,
  setSelectedList,
  setExerciseId,
} = workoutSlice.actions
