import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RESPONSE_SUCCESS } from "../../app/appConst";
import { RootState } from "../../app/store";
import { FiatBalanceDto } from "../../models/wallet/WalletFiatBalanceDto";
import { getFiatMine } from "../../service/walletApiClient";
import ErrorManager from "../../utility/ErrorManager";

export interface FiatBalance {
  balances: FiatBalanceDto;
}

export interface FiatMineState {
  error?: string;
  status: "empty" | "loading" | "loaded" | "error";
  balances?: FiatBalanceDto[];
}

const initialState: FiatMineState = {
  error: undefined,
  status: "empty",
};

export const fiatMineEvent = createAsyncThunk("fiat/mine", async function () {
  try {
    const response = await getFiatMine();
    if (response.status === RESPONSE_SUCCESS) {
      return response;
    } else {
      return response.msg;
    }
  } catch (error) {
    return ErrorManager.handleRequestError(error);
  }
});

export const fiatMineSlice = createSlice({
  name: "fiat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fiatMineEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fiatMineEvent.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          if (typeof action.payload !== "string") {
            state.status = "loaded";
            state.balances = action.payload.balances;
            // console.log(state.balances);
          } else {
            state.status = "error";
            state.error = action.payload;
          }
        }
      });
  },
});

export const fiatMineState = (state: RootState) => state.fiatMine;
export default fiatMineSlice.reducer;
