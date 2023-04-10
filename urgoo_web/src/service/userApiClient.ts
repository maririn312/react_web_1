import { request } from "http";
import {
  URL_BACKEND_CHANGE_INFO,
  URL_BACKEND_CHANGE_USER_PASSWORD,
  URL_BACKEND_ME,
  URL_BACKEND_UPLOAD_COVER,
  URL_BACKEND_UPLOAD_PROFILE,
  URL_BACKEND_USER_UPDATE_PROFILE,
  URL_BACLEND_UPLOAD_KYC_BACK,
  URL_BACLEND_UPLOAD_KYC_FRONT,
  URL_BACLEND_UPLOAD_KYC_SELFIE,
} from "../app/appConst";
import { HEADER_AUTH, HEADER_CONTENT, HEAD_JSON } from "../app/types";
import BadResponseError from "../error/BadResponseError";
import MessageResponseDto from "../models/MessageResponseDto";
import { ChangeInfoRequestDto } from "../models/user/ChangeInfoRequestDts";
import { UpdateProfileRequestDto } from "../models/user/UpdateProfileRequestDto";
import { UserPasswordChangeRequestDto } from "../models/user/UserPasswordChangeRequestDto";
import { UserProfileResponseDto } from "../models/user/UserProfileResponseDto";
import { ApiClient, ApiUtility } from "../utility/ApiUtility";

// ================================================================== //
export const userMeStatus = async () => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  };
  const url = URL_BACKEND_ME;
  const response = await ApiClient().get<UserProfileResponseDto>(url, config);

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
};

// ================================================================== //
export const UpdateProfile = async (request: UpdateProfileRequestDto) => {
  const token = await ApiUtility.getClientAccessToken();
  
  const config = {
    headers: {
      [HEADER_AUTH]: `Bearer ${token.access_token}`,
      [HEADER_CONTENT]: `${HEAD_JSON}`,
    },
  };

  const url = URL_BACKEND_USER_UPDATE_PROFILE;
  const response = await ApiClient().post<MessageResponseDto>(
    url,
    JSON.stringify(request),
    config
  );

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }

  throw new BadResponseError(response.status);
};

export const ChangeInfo = async (request: ChangeInfoRequestDto) => {
  const url = URL_BACKEND_CHANGE_INFO;
  const response = await ApiClient().post<MessageResponseDto>(url, request);

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
};

// ================================================================== //
export const ChangeUserPassword = async (
  request: UserPasswordChangeRequestDto
) => {
  const token = await ApiUtility.getClientAccessToken();

  const config = {
    headers: {
      [HEADER_AUTH]: `Bearer ${token.access_token}`,
      [HEADER_CONTENT]: `${HEAD_JSON}`,
    },
  };

  const url = URL_BACKEND_CHANGE_USER_PASSWORD;
  const response = await ApiClient().post<MessageResponseDto>(
    url,
    JSON.stringify(request),
    config
  );

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }

  throw new BadResponseError(response.status);
};

// ================================================================== //
export const UserUploadProfile = async (file: File) => {
  const config = {
    headers: ApiUtility.getMultipartDataHeader(),
  };

  const formData = new FormData();
  formData.append("data", file);

  const url = URL_BACKEND_UPLOAD_PROFILE;
  const response = await ApiClient().post<MessageResponseDto>(
    url,
    formData,
    config
  );

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
};

// ================================================================== //
export const UserUploadCover = async (file: File) => {
  const config = {
    headers: ApiUtility.getMultipartDataHeader(),
  };

  const formData = new FormData();
  formData.append("data", file);

  const url = URL_BACKEND_UPLOAD_COVER;
  const response = await ApiClient().post<MessageResponseDto>(
    url,
    formData,
    config
  );

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
};

// ================================================================== //
export const UserUploadKycSelfie = async (file: File) => {
  const config = {
    headers: ApiUtility.getMultipartDataHeader(),
  };

  const formData = new FormData();
  formData.append("data", file);

  const url = URL_BACLEND_UPLOAD_KYC_SELFIE;
  const response = await ApiClient().post<MessageResponseDto>(
    url,
    formData,
    config
  );

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
};

// ================================================================== //
export const UserUploadKycFront = async (file: File) => {
  const config = {
    headers: ApiUtility.getMultipartDataHeader(),
  };

  const formData = new FormData();
  formData.append("data", file);

  const url = URL_BACLEND_UPLOAD_KYC_FRONT;
  const response = await ApiClient().post<MessageResponseDto>(
    url,
    formData,
    config
  );

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
};

// ================================================================== //
export const UserUploadKycBack = async (file: File) => {
  const config = {
    headers: ApiUtility.getMultipartDataHeader(),
  };

  const formData = new FormData();
  formData.append("data", file);

  const url = URL_BACLEND_UPLOAD_KYC_BACK;
  const response = await ApiClient().post<MessageResponseDto>(
    url,
    formData,
    config
  );

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
};
