import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import apis from "redux/apis"


const getCheckLists = createAsyncThunk(
  'get_users',
  async (values) => {
    const response = await apis.getCheckLists(values).then((response)=>{
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

const updateCheckListAction = createAsyncThunk(
    'upsert_user',
    async (values) => {
      const response = await apis.upsertCheckLists(values).then((response)=>{
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
  
  const createCheckListAction = createAsyncThunk(
    'createCheckListAction',
    async (values) => {
      const response = await apis.upsertCheckLists(values).then((response)=>{
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

  const deleteAction = createAsyncThunk(
    'deleteAction',
    async (values) => {
      const response = await apis.deleteCheckLists(values).then((response)=>{
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

const checkListsReducer = createSlice({
    name: 'user',
    initialState: {
      listData: [],
      loader: false,
    },
    extraReducers: {

      [getCheckLists.pending]: (state)=>{
        state.loader = true
        state.listData = []
      },
      [getCheckLists.fulfilled]: (state, { payload })=>{
        state.loader = false
        if(payload && payload.success) {
          state.listData = payload.checkilists
        }
      },
      [getCheckLists.rejected]: (state,action)=>{
        state.loader = false
        state.error = "something went wrong"
      },

      [updateCheckListAction.fulfilled]: (state, { payload })=>{
        state.loader = false
        if(payload && payload.success) {
          state.listData = payload.user_list
        }
      },
      [createCheckListAction.fulfilled]: (state, { payload })=>{
        state.loader = false
        if(payload && payload.success) {
          state.user_list = payload.user_list
        }
      },
      [deleteAction.fulfilled]: (state, { payload })=>{
        state.loader = false
        if(payload && payload.success) {
          state.user_list = payload.user_list
        }
      },
    }
  })
  

  export {
    getCheckLists,
    updateCheckListAction,
    createCheckListAction,
    deleteAction,
  }

  // Export the reducer, either as a default or named export
  export default checkListsReducer

