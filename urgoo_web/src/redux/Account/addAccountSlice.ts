import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RESPONSE_SUCCESS } from "../../app/appConst";
import { RootState } from "../../app/store";
import { BankDto } from "../../models/account/BankListResponseDto";
import { FiatDto } from "../../models/account/FiatListResponseDto";
import { MyAccountDto } from "../../models/account/MyBankAccountResponseDto";
import {
  walletAddAccount,
  walletBankList,
  walletMyBankAccounts,
} from "../../service/walletApiClient";
import ErrorManager from "../../utility/ErrorManager";

export interface AddAccountState {
  error?: string;
  status: "empty" | "loading" | "loaded" | "error";
}

const initialState: AddAccountState = {
  status: "empty",
  error: undefined,
};

export const addAccountEvent = createAsyncThunk(
  "account/addAccount",
  async function ({
    fiat_code,
    bank_code,
    account_no,
    account_name,
  }: {
    fiat_code: string;
    bank_code: string;
    account_no: string;
    account_name: string;
  }) {
    try {
      const response = await walletAddAccount({
        fiat_code: fiat_code,
        bank_code: bank_code,
        account_no: account_no,
        account_name: account_name,
      });
      if (response.status === RESPONSE_SUCCESS) {
        return true;
      } else {
        return response.msg;
      }
    } catch (error) {
      return ErrorManager.handleRequestError(error);
    }
  }
);

export const addAccountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAccountEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAccountEvent.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          if (typeof action.payload !== "string") {
            state.status = "loaded";
          } else {
            state.status = "error";
            state.error = action.payload;
          }
        }
      });
  },
});

export const addWalletState = (state: RootState) => state.addWallet;
export default addAccountSlice.reducer;
