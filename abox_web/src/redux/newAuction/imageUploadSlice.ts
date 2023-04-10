import { createSlice } from "@reduxjs/toolkit";

export interface ImageState {
  isLoading: boolean,
  images: [],
  error?: string,
}

const initialState: ImageState = {
  isLoading: false,
  images: [],
}

export const imageUploadSlice = createSlice({
  name: 'imageUpload',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    
  }
});

export default imageUploadSlice.reducer;