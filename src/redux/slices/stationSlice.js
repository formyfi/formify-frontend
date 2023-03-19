import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import apis from "redux/apis"


const getStationList = createAsyncThunk(
  'get_station_list',
  async (values) => {
    const response = await apis.stationList(values).then((response)=>{
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

const upsertStation = createAsyncThunk(
    'upsert_station',
    async (values) => {
      const response = await apis.upsertStation(values).then((response)=>{
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

  const deleteStation = createAsyncThunk(
    'delete_station',
    async (values) => {
      const response = await apis.deleteStation(values).then((response)=>{
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

const stationSlice = createSlice({
    name: 'station',
    initialState: {
      locale: "en",
      dir: "ltr",
      station_list: [],
      loader: false,
    },
    extraReducers: {

      [getStationList.pending]: (state)=>{
        state.loader = true
      },
      [getStationList.fulfilled]: (state, { payload })=>{
        state.loader = false
        if(payload && payload.success) {
          state.station_list = payload.station_list
        }
      },
      [getStationList.rejected]: (state,action)=>{
        state.loader = false
        state.error = "something went wrong"
      },

      [upsertStation.fulfilled]: (state, { payload })=>{
        state.loader = false
        if(payload && payload.success) {
          state.station_list = payload.station_list
        }
      },
      [deleteStation.fulfilled]: (state, { payload })=>{
        state.loader = false
        if(payload && payload.success) {
          state.station_list = payload.station_list?payload.station_list:[]
        }
      },
    }
  })
  

  export {
    getStationList,
    upsertStation,
    deleteStation
  }

  // Export the reducer, either as a default or named export
  export default stationSlice

