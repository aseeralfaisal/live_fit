import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userSlice } from './states/userSlice'

const reducer = combineReducers<any>({
  user: userSlice.reducer,
})

const store = configureStore({
  reducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
