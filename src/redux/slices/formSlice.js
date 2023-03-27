import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import apis from "redux/apis"


const getCheckLists = createAsyncThunk(
  'get_checklists',
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

const getTaskForm = createAsyncThunk(
  'get_task_form',
  async (values) => {
    const response = await apis.getTaskForm(values).then((response)=>{
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
    'upsert_checklist',
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

  const updateCheckListForm = createAsyncThunk(
    'upsert_checklist_form',
    async (values) => {
      const response = await apis.upsertCheckListForm(values).then((response)=>{
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

  const deleteChecklist = createAsyncThunk(
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
    name: 'checkList',
    initialState: {
      listData: [],
      form_data:[],
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
      [getTaskForm.pending]: (state)=>{
        state.loader = true
        state.listData = []
      },
      [getTaskForm.fulfilled]: (state, { payload })=>{
        state.loader = false
        if(payload && payload.success) {
          state.form_data = payload.form_data
        }
      },
      [getTaskForm.rejected]: (state,action)=>{
        state.loader = false
        state.error = "something went wrong"
      },
      [updateCheckListAction.fulfilled]: (state, { payload })=>{
        state.loader = false
        if(payload && payload.success) {
          state.listData = payload.checkilists
        }
      },
      [updateCheckListForm.fulfilled]: (state, { payload })=>{
        state.loader = false
        if(payload && payload.success) {
          state.listData = payload.checkilists
        }
      },
      [createCheckListAction.fulfilled]: (state, { payload })=>{
        state.loader = false
        if(payload && payload.success) {
          state.listData = payload.checkilists
        }
      },
      [deleteChecklist.fulfilled]: (state, { payload })=>{
        state.loader = false
        if(payload && payload.success) {
          state.listData = payload.checkilists
        }
      },
    }
  })
  

  export {
    getCheckLists,
    updateCheckListAction,
    updateCheckListForm,
    createCheckListAction,
    deleteChecklist,
    getTaskForm
  }

  // Export the reducer, either as a default or named export
  export default checkListsReducer

