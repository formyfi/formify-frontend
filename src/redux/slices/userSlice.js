import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import apis from "redux/apis"


const getUsers = createAsyncThunk(
  'get_users',
  async (values) => {
    const response = await apis.getUsers(values).then((response)=>{
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

const updateUser = createAsyncThunk(
    'upsert_user',
    async (values) => {
      const response = await apis.updateUser(values).then((response)=>{
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
  
  const createUser = createAsyncThunk(
    'create_user',
    async (values) => {
      const response = await apis.createUser(values).then((response)=>{
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

  const deleteUser = createAsyncThunk(
    'delete_user',
    async (values) => {
      const response = await apis.deleteUser(values).then((response)=>{
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

const userSlice = createSlice({
    name: 'user',
    initialState: {
      locale: "en",
      dir: "ltr",
      user_list: [],
      loader: false,
    },
    extraReducers: {

      [getUsers.pending]: (state)=>{
        state.loader = true
      },
      [getUsers.fulfilled]: (state, { payload })=>{
        state.loader = false
        if(payload && payload.success) {
          state.user_list = payload.user_list
        }
      },
      [getUsers.rejected]: (state,action)=>{
        state.loader = false
        state.error = "something went wrong"
      },

      [updateUser.fulfilled]: (state, { payload })=>{
        state.loader = false
        if(payload && payload.success) {
          state.user_list = payload.user_list
        }
      },
      [createUser.fulfilled]: (state, { payload })=>{
        state.loader = false
        if(payload && payload.success) {
          state.user_list = payload.user_list
        }
      },
      [deleteUser.fulfilled]: (state, { payload })=>{
        state.loader = false
        if(payload && payload.success) {
          state.user_list = payload.user_list
        }
      },
    }
  })
  

  export {
    getUsers,
    updateUser,
    createUser,
    deleteUser
  }

  // Export the reducer, either as a default or named export
  export default userSlice

