import { configureStore } from '@reduxjs/toolkit'
import commonSlice from './slices/commonSlice'
import stationSlice from './slices/stationSlice'
import userSlice from './slices/userSlice'
import partSlice from './slices/partSlice'

export const store = configureStore({
  reducer: {
    common: commonSlice.reducer,
    station: stationSlice.reducer,
    user: userSlice.reducer,
    part: partSlice.reducer,
  },
})