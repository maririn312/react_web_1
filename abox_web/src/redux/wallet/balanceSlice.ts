import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store";
import { BalanceFiatDto } from "../../models/wallet/BalanceResponseDto";
import { walletMyBalance } from "../../service/walletApiClient";
import { ApiUtility } from "../../utility/ApiUtility";
import ErrorManager from "../../utility/ErrorManager";

export interface BalanceState {
  fiats: BalanceFiatDto[];
}

const initialState: BalanceState = {
  fiats: [],
}

/* ============================================================================ */
/* ============================================================================ */
export const getBalance = createAsyncThunk(
  'wallet/getBalance',
  async() => {
    try {
      const response = await walletMyBalance();
      return response;
    } catch(ex) {
      return ErrorManager.handleRequestError(ex);
    }
  }
)

/* ============================================================================ */
/* ============================================================================ */
export const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBalance.pending, (state) => {
        
      })
      .addCase(getBalance.fulfilled, (state) => {
        
      })
      .addCase(getBalance.rejected, (state) => {
        
      })
  }
});

/* ============================================================================ */
/* ============================================================================ */
export const balanceState = (state: RootState) => state.balance;
export default balanceSlice.reducer;