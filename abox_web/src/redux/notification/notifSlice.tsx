import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface NotifState {
  notifs: string[],
  isLoading: false,
  error?: string | undefined,
}

const initialState:NotifState = {
  notifs: [],
  isLoading: false
} 


export const notifSlice = createSlice({
  name: 'notif',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    
  }
});

/* ============================================================================ */
/* ============================================================================ */
export const notifState = (state: RootState) => state.notif;
// export const { checkUser } = notifSlice.actions; 
export default notifSlice.reducer;