import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import commonSlice from './slices/commonSlice'

export const store = configureStore({
  reducer: {
    common: commonSlice.reducer,
    auth: authSlice.reducer
  },
})