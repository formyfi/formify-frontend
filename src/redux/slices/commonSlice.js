import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import apis from "redux/apis"

const loginApiAction = createAsyncThunk(
  'auth/login',
  async (values) => {
    const response = await apis.login(values)
    return response.data
  }
)

const commonSlice = createSlice({
    name: 'common',
    initialState: {
      locale: "en",
      dir: "ltr",
      isLogged: false,
      userData: null,
      loader: false,
    },
    reducers: {

    },
    extraReducers: {
      [loginApiAction.pending]: (state)=>{
        state.loader = true
      },
      [loginApiAction.fulfilled]: (state)=>{
        state.loader = false
        state.isLogged = true
      },
      [loginApiAction.rejected]: (state)=>{
        state.loader = false
        state.error = "something went wrong"
      }
    }
  })
  

  export {
    loginApiAction
  }
  // Export the reducer, either as a default or named export
  export default commonSlice

