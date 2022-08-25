import { createSlice } from '@reduxjs/toolkit'

export const authenticatedSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload
    },
  },
})

export const { setIsAuthenticated } = authenticatedSlice.actions
