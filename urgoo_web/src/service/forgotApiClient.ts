import { URL_BACKEND_FORGOT } from "../app/appConst";
import { HEADER_AUTH, HEADER_CONTENT, HEAD_JSON } from "../app/types";
import BadResponseError from "../error/BadResponseError";
import MessageResponseDto from "../models/MessageResponseDto";
import { ForgotRequestDto } from "../models/user/ForgetRequestDto";
import { ApiClient, ApiUtility } from "../utility/ApiUtility";

// ================================================================== //
export const forgot = async (request: ForgotRequestDto) => {
  const token = await  ApiUtility.getClientAccessToken();

  const config = {
    headers: {
      [HEADER_AUTH]: `Bearer ${token.access_token}`,
      [HEADER_CONTENT]: `${HEAD_JSON}`
    },
  }

  const url = URL_BACKEND_FORGOT;
  const response = await ApiClient().post<MessageResponseDto>(url, JSON.stringify(request), config);

  if (response.status >= 200 && response.status < 300) {
      return response.data;
  }
  
  throw new BadResponseError(response.status);
}