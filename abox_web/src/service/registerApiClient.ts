import { URL_BACKEND_CONFIRM, URL_BACKEND_REGISTER } from "../app/appConst";
import BadResponseError from "../error/BadResponseError";
import MessageResponseDto from "../models/MessageResponseDto";
import { RegisterRequestDto } from "../models/user/RegisterRequestDto";
import { ApiClient, ApiUtility } from "../utility/ApiUtility";

// ================================================================== //
export const register = async (request:RegisterRequestDto) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = URL_BACKEND_REGISTER;
  const response = await ApiClient().post<MessageResponseDto>(url, JSON.stringify(request), config);

  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const registerConfirm = async (tanCode:string, phone:string) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = `${URL_BACKEND_CONFIRM}?phone-no=${phone}&tan-code=${tanCode}`;
  const response = await ApiClient().get<MessageResponseDto>(url, config);

  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}


