import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import apis from "redux/apis"


const getPartList = createAsyncThunk(
  'get_parts_list',
  async (values) => {
    const response = await apis.partList(values).then((response)=>{
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

const getPartsByStation = createAsyncThunk(
  'get_parts_by_station',
  async (values) => {
    const response = await apis.getPartsByStation(values).then((response)=>{
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

const getPartVnumbers = createAsyncThunk(
  'get_part_vnumbers',
  async (values) => {
    const response = await apis.getPartVnumbers(values).then((response)=>{
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

const upsertPart = createAsyncThunk(
    'upsert_part',
    async (values) => {
      const response = await apis.upsertPart(values).then((response)=>{
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

  const deletePart = createAsyncThunk(
    'delete_part',
    async (values) => {
      const response = await apis.deletePart(values).then((response)=>{
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

const partSlice = createSlice({
    name: 'part',
    initialState: {
      locale: "en",
      dir: "ltr",
      part_list: [],
      loader: false,
    },
    extraReducers: {

      [getPartList.pending]: (state)=>{
        state.loader = true
      },
      [getPartList.fulfilled]: (state, { payload })=>{
        state.loader = false
        if(payload && payload.success) {
          state.part_list = payload.part_list
        }
      },
      [getPartList.rejected]: (state,action)=>{
        state.loader = false
        state.error = "something went wrong"
      },

      [upsertPart.fulfilled]: (state, { payload })=>{
        state.loader = false
        if(payload && payload.success) {
          state.part_list = payload.part_list
        }
      },
      [deletePart.fulfilled]: (state, { payload })=>{
        state.loader = false
        if(payload && payload.success) {
          state.part_list = payload.part_list
        }
      },
    }
  })
  

  export {
    getPartList,
    upsertPart,
    deletePart,
    getPartVnumbers,
    getPartsByStation
  }

  // Export the reducer, either as a default or named export
  export default partSlice

