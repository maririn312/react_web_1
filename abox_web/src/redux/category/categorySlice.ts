import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface CategoryState {

}

const initialState: CategoryState = {
  isLoggedIn: false,
  error: undefined,
  status: 'empty',
};

export const categorylSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    
  }
})

/* ============================================================================ */
/* ============================================================================ */
export const categoryState = (state: RootState) => state.category;
// export const { checkUser } = categorylSlice.actions; 
export default categorylSlice.reducer;