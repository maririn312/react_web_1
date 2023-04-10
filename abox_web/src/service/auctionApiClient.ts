import { URL_BACKEND_AUCTION_ADD_CONDITION, URL_BACKEND_AUCTION_DETAIL, URL_BACKEND_AUCTION_POLICY, URL_BACKEND_AUCTION_REMOVE_CONDITION, URL_BACKEND_AUCTION_REMOVE_IMAGE, URL_BACKEND_AUCTION_SWITCH_CONDITION, URL_BACKEND_AUCTION_UPLOAD_IMAGE, URL_BACKEND_BID, URL_BACKEND_CONDITION_LIST, URL_BACKEND_CONFIRM_AUCTION, URL_BACKEND_CREATE_AUCTION, URL_BACKEND_CREATE_AUCTION_DATA, URL_BACKEND_MY_HISTORY, URL_BACKEND_SUBSCRIBE_AUCTION } from "../app/appConst";
import BadResponseError from "../error/BadResponseError";
import { AddConditionRequestDto } from "../models/auction/AddConditionRequestDto";
import { AddConditionResponseDto } from "../models/auction/AddConditionResponseDto";
import { AuctionBidRequestDto } from "../models/auction/AuctionBidRequestDto";
import { CreateAuctionResponseDto } from "../models/auction/AuctionCreateResponseDto";
import { AuctionDataRequestDto } from "../models/auction/AuctionDataRequestDto";
import { AuctionDetailResponseDto } from "../models/auction/AuctionDetailResponseDto";
import { AuctionMyHistoryResponseDto } from "../models/auction/AuctionMyHistoryResponseDto";
import { AuctionNewRequestDto } from "../models/auction/AuctionNewRequestDto";
import { AuctionPolicyResponseDto } from "../models/auction/AuctionPolicyResponseDto";
import { AuctionUpdateInfoRequestDto } from "../models/auction/AuctionUpdateInfoRequestDto";
import AuctionUploadResponseDto from "../models/auction/AuctionUploadResponseDto";
import { ConditionListResponseDto } from "../models/auction/ConditionListResponseDto";
import MessageResponseDto from "../models/MessageResponseDto";
import { ApiClient, ApiUtility } from "../utility/ApiUtility";

// ================================================================== //
export const auctionDetail = async (id:number) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = `${URL_BACKEND_AUCTION_DETAIL}?auction-id=${id}`;
  const response = await ApiClient().get<AuctionDetailResponseDto>(url, config);
  
  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const auctionCreate = async (request:AuctionNewRequestDto) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = URL_BACKEND_CREATE_AUCTION;
  const response = await ApiClient().post<CreateAuctionResponseDto>(url, JSON.stringify(request), config);
  
  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const auctionCreateData = async (request:AuctionDataRequestDto) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = URL_BACKEND_CREATE_AUCTION_DATA;
  const response = await ApiClient().post<MessageResponseDto>(url, JSON.stringify(request), config);

  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const getNewConditions = async () => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  
  const url = URL_BACKEND_CONDITION_LIST;
  const response = await ApiClient().get<ConditionListResponseDto>(url, config);

  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const addCondition = async (request:AddConditionRequestDto) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  
  const url = URL_BACKEND_AUCTION_ADD_CONDITION;
  const response = await ApiClient().post<AddConditionResponseDto>(url, JSON.stringify(request), config);

  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const switchCondition = async (auctionId:number, first:number, second:number) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }

  const url = `${URL_BACKEND_AUCTION_SWITCH_CONDITION}?auction-id=${auctionId}&first=${first}&second=${second}`;
  const response = await ApiClient().get<MessageResponseDto>(url, config);

  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const auctionUploadImage = async (inquire_id:string, file:File) => {
  const config = {
    headers: ApiUtility.getMultipartDataHeader(),
  }

  const formData = new FormData();
  formData.append("data", file);
  formData.append("inquire_id", inquire_id);

  const url = URL_BACKEND_AUCTION_UPLOAD_IMAGE;
  const response = await ApiClient().post<AuctionUploadResponseDto>(url, formData, config);

  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const auctionRemoveImage = async (auctionId:number, imageId:number) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }

  const url = `${URL_BACKEND_AUCTION_REMOVE_IMAGE}?auction-id=${auctionId}&image-ids=${imageId}`;
  const response = await ApiClient().get<MessageResponseDto>(url, config);

  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const removeCondition = async (auctionId:number, conditionId:number) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = `${URL_BACKEND_AUCTION_REMOVE_CONDITION}?auction-id=${auctionId}&condition-id=${conditionId}`;

  const response = await ApiClient().get<MessageResponseDto>(url, config);
  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const auctionCreationPolicy = async () => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = URL_BACKEND_AUCTION_POLICY;

  const response = await ApiClient().get<AuctionPolicyResponseDto>(url, config);
  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const auctionCreateConfirm = async () => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = URL_BACKEND_CONFIRM_AUCTION;

  const response = await ApiClient().post(url, null, config);
  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const auctionUpdateInfo = async (request:AuctionUpdateInfoRequestDto) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = URL_BACKEND_CONFIRM_AUCTION;
  const response = await ApiClient().post<MessageResponseDto>(url, JSON.stringify(request), config);
  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
// export const auctionBid = async (request:AuctionBidRequestDto) => {
//   const config = {
//     headers: ApiUtility.getRestHeader(),
//   }
//   const url = URL_BACKEND_BID;
//   const response = await ApiClient().post(url, JSON.stringify(request), config);
//   if(response.status >= 200 && response.status < 300) {
//     return response.data;
//   }
//   throw new BadResponseError(response.status);
// }

// ================================================================== //
export const subscribe = async ({auctionId, action}:{auctionId:number, action:string}) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = `${URL_BACKEND_SUBSCRIBE_AUCTION}?auction-id=${auctionId}&action=${action}`;
  const response = await ApiClient().get<MessageResponseDto>(url, config);
  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const auctionMyHistory = async (auctionId:number) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = `${URL_BACKEND_MY_HISTORY}?auction-id=${auctionId}`;
  const response = await ApiClient().get<AuctionMyHistoryResponseDto>(url, config);
  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const auctionSubscribe = async (auctionId:number, action:'ON'|'OFF') => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = `${URL_BACKEND_SUBSCRIBE_AUCTION}?auction-id=${auctionId}&action=${action}`;
  const response = await ApiClient().get<MessageResponseDto>(url, config);
  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}