import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { ApiUtility } from "../../utility/ApiUtility";
import UserUtility from "../../utility/UserUtility";
import ErrorManager from "../../utility/ErrorManager";
import { userMeStatus } from "../../service/userApiClient";
import { UserProfileResponseDto } from "../../models/user/UserProfileResponseDto";

interface UserInfo {
  userMe: UserProfileResponseDto;
  // image?: string;
}

export interface UserState {
  isLoggedIn: boolean;
  error?: string;
  status: "empty" | "loading" | "loaded" | "error";
  info?: UserInfo;
}

const initialState: UserState = {
  isLoggedIn: false,
  error: undefined,
  status: "empty",
};
// Async action ашиглах үед
export const userLogin = createAsyncThunk(
  "user/userLogin",
  async ({ username, password }: { username: string; password: string }) => {
    try {
      const response = await ApiUtility.getUserAccessToken(username, password);
      UserUtility.saveUserCredential({
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
      });

      return response;
    } catch (error) {
      return ErrorManager.handleRequestError(error);
    }
  }
);

export const userLogout = createAsyncThunk("user/userLogout", async () => {
  try {
    await UserUtility.deleteUserCredential();
  } catch (error) {
    return ErrorManager.handleRequestError(error);
  }
});

export const userMe = createAsyncThunk("user/userLoad", async () => {
  try {
    const userMeResponse = await userMeStatus();

    return {
      userMe: userMeResponse,
    };
  } catch (error) {
    return ErrorManager.handleRequestError(error);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action
    checkUser: (state) => {
      state.isLoggedIn = UserUtility.isUserLoggedIn();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        if (typeof action.payload === "string") {
          state.status = "error";
          state.error = `${action.payload}`;
          state.isLoggedIn = false;
        } else {
          state.status = "loaded";
          state.isLoggedIn = true;
        }
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "error";
        state.error = `${action.error.code}:${action.error.message}`;
      })

      //=========================================================
      .addCase(userMe.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userMe.fulfilled, (state, action) => {
        if (typeof action.payload === "string") {
          state.status = "error";
          state.error = `${action.payload}`;
        } else {
          state.info = action.payload as UserInfo;
        }
      })
      .addCase(userMe.rejected, (state, action) => {
        state.status = "error";
        state.error = `${action.error.message} (${action.error.code})`;
      })

      //===========================================================
      .addCase(userLogout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.status = "empty";
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.status = "error";
        state.error = `${action.error.message} (${action.error.code})`;
      });
  },
});

export const userState = (state: RootState) => state.user;
export const { checkUser } = userSlice.actions;
export default userSlice.reducer;
