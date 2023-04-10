import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "../redux/user/userSlice";
import addWalletReducer from "../redux/Account/addAccountSlice";
import fiatMineReducer from "../redux/Wallet/fiatMineSlice";
import getBalanceReducer from "../redux/Wallet/balanceSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    addWallet: addWalletReducer,
    fiatMine: fiatMineReducer,
    getBalance: getBalanceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
