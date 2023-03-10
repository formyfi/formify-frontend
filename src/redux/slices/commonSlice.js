import { createSlice } from "@reduxjs/toolkit"


const commonSlice = createSlice({
    name: 'common',
    initialState: {
      locale: "en",
      dir: "ltr",
      isLogged: false,
      userData: null,
    },
    reducers: {
      createPost(state, action) {},
      updatePost(state, action) {},
      deletePost(state, action) {},
    },
  })
  
  // Extract the action creators object and the reducer
  const { actions, reducer } = commonSlice
  // Extract and export each action creator by name
  export const { createPost, updatePost, deletePost } = actions
  // Export the reducer, either as a default or named export
  export default commonSlice

