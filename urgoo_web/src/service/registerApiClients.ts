import { URL_BACKEND_CONFIRM, URL_BACKEND_GET_TAN, URL_BACKEND_REGISTER } from "../app/appConst";
import { HEADER_AUTH, HEADER_CONTENT, HEAD_JSON } from "../app/types";
import BadResponseError from "../error/BadResponseError";
import MessageResponseDto from "../models/MessageResponseDto";
import { RegisterConfirmRequestDto } from "../models/user/RegisterConfirmResponseDto";
import { RegisterRequestDto } from "../models/user/RegisterRequestDto";
import { UserRegisterReTanRequestDto } from "../models/user/UserRegisterReTanRequestDto";
import { ApiClient, ApiUtility } from "../utility/ApiUtility";

// ================================================================== //
export const register = async (request: RegisterRequestDto) => {
  const token = await  ApiUtility.getAccessTokenConfig();

  const config = {
    headers: {
      [HEADER_AUTH]: `Bearer ${token}`,
      [HEADER_CONTENT]: `${HEAD_JSON}`
    },
  }

  const url = URL_BACKEND_REGISTER;
  const response = await ApiClient().post<MessageResponseDto>(url, JSON.stringify(request), config);

  if (response.status >= 200 && response.status < 300) {
      return response.data;
  }
  
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const registerConfirm = async (request: RegisterConfirmRequestDto) => {
  const token = await  ApiUtility.getAccessTokenConfig();

  const config = {
    headers: {
      [HEADER_AUTH]: `Bearer ${token}`,
      [HEADER_CONTENT]: `${HEAD_JSON}`
    },
  }

  const url = URL_BACKEND_CONFIRM;

  const response = await ApiClient().post<MessageResponseDto>(url, request, config);

  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }

  throw new BadResponseError(response.status);
}

// ================================================================== //
export const registerGetReTanCode = async (request: UserRegisterReTanRequestDto) => {
  const token = await  ApiUtility.getAccessTokenConfig();

  const config = {
    headers: {
      [HEADER_AUTH]: `Bearer ${token}`,
      [HEADER_CONTENT]: `${HEAD_JSON}`
    },
  }

  const url = URL_BACKEND_GET_TAN;

  const response = await ApiClient().post<MessageResponseDto>(url, request, config);

  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }

  throw new BadResponseError(response.status);
}
