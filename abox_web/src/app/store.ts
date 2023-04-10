import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../redux/user/userSlice';
import categoryReducer from '../redux/category/categorySlice';
import balanceReducer from '../redux/wallet/balanceSlice';
import conditionReducer from '../redux/newAuction/conditionsSlice';
import notifReducer from '../redux/notification/notifSlice';

export const store = configureStore({
  reducer: {
    conditions: conditionReducer,
    user: userReducer,
    category: categoryReducer,
    balance: balanceReducer,
    notif: notifReducer,
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

