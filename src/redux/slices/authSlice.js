import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const loginAsync = createAsyncThunk('login')


const authSlice = createSlice({
    name: 'common',
    initialState: {
      locale: "en",
      dir: "ltr",
      isLogged: false,
      userData: null,
    },
    reducers: {

    },
    extraReducers: {

    }
  })
  
  // Extract the action creators object and the reducer
  const { actions } = authSlice
  // Extract and export each action creator by name
  export const { createPost, updatePost, deletePost } = actions
  // Export the reducer, either as a default or named export
  export default authSlice

