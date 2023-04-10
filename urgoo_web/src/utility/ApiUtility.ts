import axios from "axios";
// import { Agent } from "https";
import {
  BASIC_PASSWORD,
  BASIC_USERNAME,
  REFRESH_TOKEN_MAX_ITERATE,
  URL_BACKEND_AUTH,
  URL_DAX_GRAPHQL,
} from "../app/appConst";
import {
  AUTH_BASIC,
  AUTH_BEARER,
  GRAND_CLIENT_CREDENTIALS,
  GRANT_PASSWORD,
  GRANT_REFRESH_TOKEN,
  HEADER_AUTH,
  HEADER_CONTENT,
  HEAD_GRAPHQL,
  HEAD_JSON,
  HEAD_MULTIPART,
  HEAD_URLENCODED,
  PARAM_GRANT,
  PARAM_PASSWORD,
  PARAM_REFRESH_TOKEN,
  PARAM_USERNAME,
} from "../app/types";
import BadResponseError from "../error/BadResponseError";
import RefreshTokenExpError from "../error/RefreshTokenExpError";
import TokenResponseDto from "../models/TokenResponseDto";
import StringUtility from "./StringUtility";
import UserUtility from "./UserUtility";

const interceptorWhitelist = [
  URL_BACKEND_AUTH,
  URL_DAX_GRAPHQL
]

// =================================================== //
export const getAvailableStoredToken = async () => {
  let token:string;
  if(UserUtility.isUserLoggedIn()) {
    token = UserUtility.getUserCredential().accessToken;
  } else {
    token = UserUtility.getClientCredential();
    if(token === '') {
      await ApiUtility.getClientAccessToken();
      token = UserUtility.getClientCredential();
    }
  }
  return token;
}

//** Axios instance */
export const ApiClient = () => {

  // validate all http response
  const instance = axios.create({
    validateStatus: function (status) {
      return true;
    },
    timeout: 30000,
  });

  // REQUEST INTERCEPTOR
  instance.interceptors.request.use(
    async function (config) {
      const isListed = interceptorWhitelist.find(item => item === config.url);
      
      if(!isListed) {
        let token = await getAvailableStoredToken();
        config.headers = {
          ...config.headers,
          [HEADER_AUTH]:`${AUTH_BEARER} ${token}`,
        }
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // RESPONSE INTERCEPTOR
  instance.interceptors.response.use(
    async function (response) {
      if (response.status === 401) {
        if (UserUtility.isUserLoggedIn()) {
          const refreshToken = UserUtility.getUserCredential().refreshToken;
          await ApiUtility.getRefreshToken(refreshToken);
          response.config.headers = ApiUtility.getRestHeader();
          return instance.request(response.config);
        } else {
          await ApiUtility.getClientAccessToken();
          response.config.headers = ApiUtility.getRestHeader();
          return instance.request(response.config);
        }
      } else if (response.status === 400) {
        if (UserUtility.isUserLoggedIn()) {
          await UserUtility.deleteUserCredential();
        } else {
          await UserUtility.deleteClientCredential();
        }
      }
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  return instance;
};

//** Utility class */
export class ApiUtility {

  static tokenClientMutexLock:boolean = false;
  static tokenUserMutexLock:boolean = false;
  static lockWaitDuration:number = 2000;

  static getAccessTokenConfig = () => {
    return {
      headers: {
        [HEADER_AUTH]: `${AUTH_BASIC} ${window.btoa(
          `${BASIC_USERNAME}:${BASIC_PASSWORD}`
        )}`,
        [HEADER_CONTENT]: `${HEAD_URLENCODED}`,
      },
    };
  };

  static getClientTokenConfig  = () => {
    return {
      headers: {
        [HEADER_AUTH]: `${AUTH_BASIC} ${window.btoa(
          `${BASIC_USERNAME}:${BASIC_PASSWORD}`
        )}`,
        [HEADER_CONTENT]: `${HEAD_URLENCODED}`,
      },
    }
  }

  static getRestHeader = () => {
    return {
      [HEADER_CONTENT]: `${HEAD_JSON}`,
    };
  };

  static getMultipartDataHeader = () => {
    return {
      [HEADER_CONTENT]: `${HEAD_MULTIPART}`,
    }
  }

  static getGraphQLHeader = () => {
    return {
      [HEADER_CONTENT]: `${HEAD_GRAPHQL}`,
    }
  }

  /* ============================================================================ */
  /* ============================================================================ */
  static getClientAccessToken = async (fromCache?:boolean, failedCount?:number) => {
    if(failedCount === undefined) failedCount = 0;
    if(fromCache === undefined) fromCache = false;

    if(failedCount > REFRESH_TOKEN_MAX_ITERATE) {
      throw new RefreshTokenExpError();
    }

    if(ApiUtility.tokenClientMutexLock) {
      await new Promise(f => setTimeout(f, ApiUtility.lockWaitDuration));
      return await this.getClientAccessToken(true, failedCount + 1);
    } else {
      if(fromCache) {
        return await UserUtility.getClientCredential();
      } else {
        ApiUtility.tokenClientMutexLock = true;
        
        const config = ApiUtility.getAccessTokenConfig();
        const params = new URLSearchParams();
        params.append(PARAM_GRANT, GRAND_CLIENT_CREDENTIALS);
        const response = await ApiClient().post<TokenResponseDto>(URL_BACKEND_AUTH, params, config);
        
        ApiUtility.tokenClientMutexLock = false;
        if(response.status >= 200 && response.status < 300) {
          UserUtility.saveClientCredential(response.data.access_token);
          return response.data.access_token;
        } else if(response.status === 401) {
          throw new BadResponseError(response.status, response.data.error_description);
        }
        throw new BadResponseError(response.status);
      }
    }
  }

  /* ============================================================================ */
  /* ============================================================================ */
  static getUserAccessToken = async (username: string, password: string) => {
    const config = ApiUtility.getAccessTokenConfig();

    const params = new URLSearchParams();
    params.append(PARAM_USERNAME, username);
    params.append(PARAM_PASSWORD, password);
    params.append(PARAM_GRANT, GRANT_PASSWORD);

    const response = await ApiClient().post<TokenResponseDto>(
      URL_BACKEND_AUTH,
      params,
      config
    );

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else if (response.status === 401) {
      throw new BadResponseError(
        response.status,
        response.data.error_description
      );
    }
    throw new BadResponseError(response.status);
  };

  /* ============================================================================ */
  /* ============================================================================ */
  static getNewUserTokenByRefresh = async (refreshToken: string) => {
    const config = ApiUtility.getAccessTokenConfig();

    const params = new URLSearchParams();
    params.append(PARAM_REFRESH_TOKEN, refreshToken);
    params.append(PARAM_GRANT, GRANT_REFRESH_TOKEN);

    const response = await ApiClient().post<TokenResponseDto>(
      URL_BACKEND_AUTH,
      params,
      config
    );
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else if (response.status === 400) {
      throw new RefreshTokenExpError();
    } else if (response.status === 401) {
      throw new RefreshTokenExpError();
    }
    throw new BadResponseError(response.status);
  };

  /* ============================================================================ */
  /* ============================================================================ */
  static getRefreshToken = async (
    refreshToken: string,
    fromCache?: boolean,
    failedCount?: number
  ) => {
    if (!StringUtility.isValidText(refreshToken)) {
      await UserUtility.deleteUserCredential();
      throw Error("null");
    }

    if (failedCount === undefined) failedCount = 0;
    if (fromCache === undefined) fromCache = false;
    if (failedCount > REFRESH_TOKEN_MAX_ITERATE) {
      throw new RefreshTokenExpError();
    }

    if (ApiUtility.tokenUserMutexLock) {
      await new Promise((f) => setTimeout(f, ApiUtility.lockWaitDuration));
      return await this.getRefreshToken(refreshToken, true, failedCount + 1);
    } else {
      if (fromCache) {
        return await UserUtility.getUserCredential();
      } else {
        ApiUtility.tokenUserMutexLock = true;

        const token = await this.getNewUserTokenByRefresh(refreshToken);
        UserUtility.saveUserCredential({
          accessToken: token.access_token,
          refreshToken: token.refresh_token,
        });

        ApiUtility.tokenUserMutexLock = false;
        return {
          accessToken: token.access_token,
          refreshToken: token.refresh_token,
        };
      }
    }
  };
}
