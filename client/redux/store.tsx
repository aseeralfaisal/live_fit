import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userSlice } from './states/userSlice'
import { workoutSlice } from './states/workoutSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import { nutritionSlice, setNutritionResult } from './states/nutritionSlice'
import { authenticatedSlice } from './states/authenticatedSlice'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['workout', 'auth'],
}
const reducer = combineReducers<any>({
  user: userSlice.reducer,
  workout: workoutSlice.reducer,
  nutrition: nutritionSlice.reducer,
  auth: authenticatedSlice.reducer
})
const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor: any = persistStore(store)
