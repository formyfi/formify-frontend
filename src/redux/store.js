import { configureStore } from '@reduxjs/toolkit'
import commonSlice from './slices/commonSlice'
import stationSlice from './slices/stationSlice'
import { combineReducers } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import partSlice from './slices/partSlice'
import checkListsReducer from './slices/formSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk';
// export const store = configureStore({
//   reducer: {
//     common: commonSlice.reducer,
//     station: stationSlice.reducer,
//     user: userSlice.reducer,
//     part: partSlice.reducer,
//     checkList: checkListsReducer.reducer
//   },
// })

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['common']
}
export const rootReducers = combineReducers({
    common: commonSlice.reducer,
    station: stationSlice.reducer,
    user: userSlice.reducer,
    part: partSlice.reducer,
    checkList: checkListsReducer.reducer
})
const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

export const persistor = persistStore(store)