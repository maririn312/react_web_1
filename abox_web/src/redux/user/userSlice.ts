import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { USER_INDIVIDUAL } from '../../app/appConst';
import { RootState } from '../../app/store';
import { KycStatusResponseDto } from '../../models/user/KycStatusResponseDto';
import { getUserByNickname, kycStatus } from '../../service/userApiClient';
import { ApiUtility } from '../../utility/ApiUtility';
import ErrorManager from '../../utility/ErrorManager';
import UserUtility from '../../utility/UserUtility';

interface UserInfo {
  kyc: KycStatusResponseDto,
  image?: string
}

export interface UserState {
  isLoggedIn: boolean;
  error?: string;
  status: 'empty' | 'loading' | 'loaded' |'error';
  info?: UserInfo
}

const initialState: UserState = {
  isLoggedIn: false,
  error: undefined,
  status: 'empty',
};

/* ============================================================================ */
/* ============================================================================ */
export const userLogin = createAsyncThunk(
  'user/userLogin',
  async ({username, password}:{username:string, password:string}) => {
    try {
      const response = await ApiUtility.getUserAccessToken(USER_INDIVIDUAL, username, password);
      UserUtility.saveUserCredential(
        {
          accessToken: response.access_token, 
          refreshToken: response.refresh_token
        }
      );
      return response;
    } catch(ex) {
      return ErrorManager.handleRequestError(ex);
    }
  }
);

/* ============================================================================ */
/* ============================================================================ */
export const userLogout = createAsyncThunk(
  'user/userLogout',
  async () => {
    try {
      await UserUtility.deleteUserCredential();
    } catch(ex) {
      return ErrorManager.handleRequestError(ex);
    }
  }
);

/* ============================================================================ */
/* ============================================================================ */
export const userKyc = createAsyncThunk(
  'user/userLoad',
  async () => {
    try {
      const kycResponse = await kycStatus();
      if(kycResponse.nickname_status) {
        const nicknameResponse = await getUserByNickname(kycResponse.nickname);
        return {
          kyc: kycResponse,
          image: nicknameResponse.profile_photo_small,
        }
      }
      
      return {
        kyc: kycResponse,
        image: undefined,
      };
    } catch(ex) {
      return ErrorManager.handleRequestError(ex);
    }
  }
)

/* ============================================================================ */
/* ============================================================================ */
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    checkUser: (state) => {
      state.isLoggedIn = UserUtility.isUserLoggedIn();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        if(typeof action.payload === 'string') {
          state.status = 'error';
          state.error = `${action.payload}`;
          state.isLoggedIn = false;
        } else {
          state.status = 'loaded';
          state.isLoggedIn = true;
        }
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = 'error';
        state.error = `${action.error.message} (${action.error.code})`;
      })
      // ====================================================== //
      .addCase(userKyc.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(userKyc.fulfilled, (state, action) => {
        if(typeof action.payload === 'string') {
          state.status = 'error';
          state.error = `${action.payload}`;
        } else {
          state.info = action.payload as UserInfo;
        }
      })
      .addCase(userKyc.rejected, (state, action) => {
        state.status = 'error';
        state.error = `${action.error.message} (${action.error.code})`;
      }) 
      // ====================================================== //
      .addCase(userLogout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.info = undefined;
        state.error = '';
        state.isLoggedIn = false;
        state.status = 'empty';
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.status = 'error';
        state.error = `${action.error.message} (${action.error.code})`;
      });
      
  },
});

/* ============================================================================ */
/* ============================================================================ */
export const userState = (state: RootState) => state.user;
export const { checkUser } = userSlice.actions; 
export default userSlice.reducer;