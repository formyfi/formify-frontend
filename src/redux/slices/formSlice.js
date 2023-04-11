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

const getTaskLists = createAsyncThunk(
  'get_tasklists',
  async (values) => {
    const response = await apis.getTaskLists(values).then((response)=>{
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

const getTemplates = createAsyncThunk(
  'get_templates',
  async (values) => {
    const response = await apis.getTemplates(values).then((response)=>{
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
  
  const updateCheckListFormAsTemplate = createAsyncThunk(
    'upsert_checklist_form_template',
    async (values) => {
      const response = await apis.updateCheckListFormAsTemplate(values).then((response)=>{
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
  
  const updateTaskForm = createAsyncThunk(
    'update_task_form',
    async (values) => {
      const response = await apis.updateTaskForm(values).then((response)=>{
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

  const getFormTimeLine = createAsyncThunk(
    'getFormTimeLine',
    async (values) => {
      const response = await apis.getAllTimelines(values).then((response)=>{
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

  const setFormTimeLine = createAsyncThunk(
    'setFormTimeLine',
    async (values) => {
      const response = await apis.setFormTimeLine(values).then((response)=>{
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
      templates:[],
      taskLists:[],
      loader: false,
      partTimeline: []
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
      [getTemplates.pending]: (state)=>{
        state.loader = true
        state.listData = []
      },
      [getTemplates.fulfilled]: (state, { payload })=>{
        state.loader = false
        if(payload && payload.success) {
          state.templates = payload.templates
        }
      },
      [getTemplates.rejected]: (state,action)=>{
        state.loader = false
        state.error = "something went wrong"
      },
      [getTaskLists.pending]: (state)=>{
        state.loader = true
        state.listData = []
      },
      [getTaskLists.fulfilled]: (state, { payload })=>{
        state.loader = false
        if(payload && payload.success) {
          state.taskLists = payload.task_lists
        }
      },
      [getTaskLists.rejected]: (state,action)=>{
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
      [updateCheckListFormAsTemplate.fulfilled]: (state, { payload })=>{
        state.loader = false
        if(payload && payload.success) {
          state.templates = payload.templates
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
      [updateTaskForm.fulfilled]: (state, { payload })=>{
        state.loader = false
        if(payload && payload.success) {
          state.listData = payload.checkilists
        }
      },
      [getFormTimeLine.pending]: (state, { payload  }) => {
        state.loader = false
      },
      [getFormTimeLine.fulfilled]: (state, { payload  }) => {
        state.partTimeline = payload
      },
    }
  })
  

  export {
    getCheckLists,
    getTemplates,
    updateCheckListAction,
    updateCheckListForm,
    createCheckListAction,
    deleteChecklist,
    getTaskForm,
    updateTaskForm,
    getTaskLists,
    updateCheckListFormAsTemplate,
    getFormTimeLine,
    setFormTimeLine
  }

  // Export the reducer, either as a default or named export
  export default checkListsReducer

