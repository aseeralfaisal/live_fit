import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userSlice } from './states/userSlice'
import { workoutSlice } from './states/workoutSlice'
import storage from 'redux-persist/lib/storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}
const reducer = combineReducers<any>({
  user: userSlice.reducer,
  workout: workoutSlice.reducer,
})
const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor : any = persistStore(store)
