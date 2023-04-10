import axios, { AxiosResponse } from "axios";
import { BASIC_PASSWORD, BASIC_USERNAME, URL_BACKEND_ALLOW_FEEDBACK, URL_BACKEND_AUCTION_BY_NICKNAME, URL_BACKEND_FEEDBACK, URL_BACKEND_GIVE_FEEDBACK, URL_BACKEND_KYC, URL_BACKEND_PROFILE_BY_NICKNAME, URL_BACKEND_UPDATE_BASIC_INFO, URL_BACKEND_USER_CAN_FOLLOW, URL_BACKEND_USER_FOLLOW, URL_BACKEND_USER_UPLOAD_ID_BACK, URL_BACKEND_USER_UPLOAD_ID_FRONT, URL_BACKEND_USER_UPLOAD_PROFILE } from "../app/appConst";
import { AUTH_BASIC, HEAD_URLENCODED, HEADER_AUTH } from "../app/types";
import BadResponseError from "../error/BadResponseError";
import { CategoryAuctionListResponseDto } from "../models/auction/CategoryAuctionListResponseDto";
import { FeedbackListResponseDto } from "../models/feedback/FeedbackListResponseDto";
import { GiveFeedbackRequestDto } from "../models/feedback/GiveFeedbackRequestDto";
import MessageResponseDto from "../models/MessageResponseDto";
import TokenResponseDto from "../models/TokenResponseDto";
import { AskFollowResponseDto } from "../models/user/AskFollowResponseDto";
import { KycStatusResponseDto } from "../models/user/KycStatusResponseDto";
import { UpdateBasicInfoRequestDto } from "../models/user/UpdateBasicInfoRequestDto";
import UserProfileResponseDto from "../models/user/UserProfileResponseDto";
import { ApiClient, ApiUtility } from "../utility/ApiUtility";
import UserUtility from "../utility/UserUtility";

// ================================================================== //
export const kycStatus = async () => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = URL_BACKEND_KYC;
  const response = await ApiClient().get<KycStatusResponseDto>(url, config);

  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const getUserByNickname = async (nickname:string) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = `${URL_BACKEND_PROFILE_BY_NICKNAME}?nickname=${nickname}`
  const response = await ApiClient().get<UserProfileResponseDto>(url, config);

  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const getAuctionsByNickname = async ({nickname, page, size}:{nickname:string, page:number, size:number}) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = `${URL_BACKEND_AUCTION_BY_NICKNAME}?nickname=${nickname}&page=${page}&size=${size}`
  const response = await ApiClient().get<CategoryAuctionListResponseDto>(url, config);

  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const userGiveFeedback = async (request:GiveFeedbackRequestDto) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = URL_BACKEND_GIVE_FEEDBACK;
  const response = await ApiClient().post<MessageResponseDto>(url, JSON.stringify(request), config);

  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const getFeedbacksByNickname = async ({nickname, page, size}:{nickname:string, page:number, size:number}) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = `${URL_BACKEND_FEEDBACK}?nickname=${nickname}&page=${page}&size=${size}`
  const response = await ApiClient().get<FeedbackListResponseDto>(url, config);

  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const isFeedbackAllowed = async (userId:number) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = `${URL_BACKEND_ALLOW_FEEDBACK}?user-id=${userId}`
  const response = await ApiClient().get<MessageResponseDto>(url, config);

  if(response.status >= 200 && response.status < 300) {
    return response.data;
  } 
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const userUpdateBasicInfo = async (request:UpdateBasicInfoRequestDto) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = URL_BACKEND_UPDATE_BASIC_INFO;
  const response = await ApiClient().post<MessageResponseDto>(url, JSON.stringify(request), config);

  if(response.status >= 200 && response.status < 300) {
    return response.data;
  } 
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const userUploadIdFront = async (file:File) => {
  const config = {
    headers: ApiUtility.getMultipartDataHeader(),
  }

  const formData = new FormData();
  formData.append("data", file);

  const url = URL_BACKEND_USER_UPLOAD_ID_FRONT;
  const response = await ApiClient().post<MessageResponseDto>(url, formData, config);

  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const userUploadIdBack = async (file:File) => {
  const config = {
    headers: ApiUtility.getMultipartDataHeader(),
  }

  const formData = new FormData();
  formData.append("data", file);

  const url = URL_BACKEND_USER_UPLOAD_ID_BACK;
  const response = await ApiClient().post<MessageResponseDto>(url, formData, config);

  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const userUploadProfile = async (file:File) => {
  const config = {
    headers: ApiUtility.getMultipartDataHeader(),
  }

  const formData = new FormData();
  formData.append("data", file);

  const url = URL_BACKEND_USER_UPLOAD_PROFILE;
  const response = await ApiClient().post<MessageResponseDto>(url, formData, config);

  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const userAskFollow = async (userId:number) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }

  const url = `${URL_BACKEND_USER_CAN_FOLLOW}?user-id=${userId}`;
  const response = await ApiClient().get<AskFollowResponseDto>(url, config);

  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const userFollow = async (userId:number, action:string) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }

  const url = `${URL_BACKEND_USER_FOLLOW}?user-id=${userId}&action=${action}`;
  const response = await ApiClient().get<MessageResponseDto>(url, config);

  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}
