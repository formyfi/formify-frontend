import { configureStore } from '@reduxjs/toolkit'
import commonSlice from './slices/commonSlice'
import stationSlice from './slices/stationSlice'

export const store = configureStore({
  reducer: {
    common: commonSlice.reducer,
    station: stationSlice.reducer
  },
})