import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import apis from "redux/apis"

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

const commonSlice = createSlice({
    name: 'common',
    initialState: {
      locale: "en",
      dir: "ltr",
      isLogged: localStorage.getItem('app_token') != null?localStorage.getItem('app_token'):false,
      user_id: localStorage.getItem('app_user_id'),
      token: localStorage.getItem('app_token'),
      org_id: localStorage.getItem('app_org_id'),
      org_name: localStorage.getItem('app_org_name'),
      loader: false,
    },
    reducers: {
      logout: (state)=>{
        state.isLogged = false
        state.token = null
        state.user_id = null
        localStorage.removeItem('app_token')
      localStorage.removeItem('app_user_id')
      localStorage.removeItem('app_org_id')
      localStorage.removeItem('app_org_name')
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
          localStorage.setItem('app_token', payload.token)
          localStorage.setItem('app_user_id', payload.user_id)
          localStorage.setItem('app_org_id', payload.org_id)
          localStorage.setItem('app_org_name', payload.org_name)
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
  }
  
  export const {
    logout
  } = commonSlice.actions
  // Export the reducer, either as a default or named export
  export default commonSlice

