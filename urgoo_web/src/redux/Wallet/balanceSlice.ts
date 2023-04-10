import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RESPONSE_SUCCESS } from "../../app/appConst";
import { RootState } from "../../app/store";
import {
  BalanceDto,
  BalanceResponseDto,
} from "../../models/account/BalanceResponseDto";
import { WalletBalanceDto } from "../../models/wallet/WalletBalanceResponseDto";
import WalletBalance from "../../pages/wallet/WalletBalance";
import { getBalance } from "../../service/walletApiClient";
import { ApiUtility } from "../../utility/ApiUtility";
import ErrorManager from "../../utility/ErrorManager";

export interface BalanceState {
  error?: string;
  status: "empty" | "loading" | "loaded" | "error";
  address?: string;
  balances?: WalletBalanceDto[];
}

const initialState: BalanceState = {
  error: undefined,
  status: "empty",
  address: undefined,
};

export const getBalanceEvent = createAsyncThunk("balance/get", async () => {
  try {
    const response = await getBalance();
    if (response.status === RESPONSE_SUCCESS) {
      return response;
    } else {
      return response.msg;
    }
  } catch (error) {
    return ErrorManager.handleRequestError(error);
  }
});

export const getBalanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBalanceEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBalanceEvent.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          if (typeof action.payload !== "string") {
            state.status = "loaded";
            state.address = action.payload.address;
            state.balances = action.payload.balances;
          } else {
            state.status = "error";
            state.error = action.payload;
          }
        }
      });
  },
});

export const getBalanceState = (state: RootState) => state.getBalance;
export default getBalanceSlice.reducer;
