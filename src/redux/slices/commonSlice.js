import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import apis from "redux/apis"
import storage from 'redux-persist/lib/storage'

const loginApiAction = createAsyncThunk(
  'auth/login',
  async (values) => {
    const response = await apis.login({...values, 'user_name': values.email}).then((response)=>{
      if(response.status === 200){
        return response.data
      }
    }).catch((err)=>{
      if(err.response && err.response.status === 401 && err.response.data){
        return {
          success: false,
          message : err.response.data.message
        }
      }
      return {
        success: false,
        message : "Something went wrong"
      }
    })
    return response
  }
)

const logoutApiAction = createAsyncThunk(
  'auth/logout',
  async () => {
    const response = await apis.logout().then((response)=>{
      if(response.status === 200){
        return response.data
      }
    })
    return response
  }
)

const commonSlice = createSlice({
    name: 'common',
    initialState: {
      locale: "en",
      dir: "ltr",
      user_details: {},
      isLogged: false,
      user_id: null,
      token: '',
      org_id: null,
      org_name: '',
      user_type_id: null,
      user_stations: [],
      loader: false,
    },
    reducers: {
      logout: (state)=>{
        state.isLogged = false
        state.token = null
        state.user_id = null
        storage.removeItem('persist:root')
        localStorage.removeItem('app_token')
      }
    },
    extraReducers: {
      //login reducers
      [loginApiAction.pending]: (state)=>{
        state.loader = true
      },
      [loginApiAction.fulfilled]: (state, { payload })=>{
        state.loader = false
        if(payload.success) {
          state.isLogged = true
          state.token = payload.token
          state.user_id = payload.user_id
          state.org_id = payload.org_id
          state.user_type_id = payload.user_type_id
          state.user_details = payload.user_details
          state.user_stations = payload.stations
          localStorage.setItem('app_token', payload.token)
        } else {
          state.error = payload.message
          state.isLogged = false
        }
      },
      [loginApiAction.rejected]: (state,action)=>{
        state.loader = false
        state.error = "something went wrong"
      },

    }
  })
  

  export {
    loginApiAction,
    logoutApiAction
  }
  
  export const {
    logout
  } = commonSlice.actions
  // Export the reducer, either as a default or named export
  export default commonSlice

