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
      const found = state.selectedList.some(
        (set: { item: { _id: string } }) => set.item._id === payload.item._id
      )
      if (found) {
        state.selectedList = state.selectedList.filter(
          (set: { item: { _id: string } }) => set.item._id !== payload.item._id
        )
      } else {
        state.selectedList = [...state.selectedList, payload]
      }
    },
    changeSelectedList: (state: any, action) => {
      state.selectedList = action.payload
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
  changeSelectedList,
} = workoutSlice.actions
