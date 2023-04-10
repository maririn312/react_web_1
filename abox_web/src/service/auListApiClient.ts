import { URL_BACKEND_AUCTION_LIST_ACTIVE, URL_BACKEND_AUCTION_MY_CREATED, URL_BACKEND_AUCTION_MY_PARTICIPATING, URL_BACKEND_AUCTION_MY_SUBSCRIBED, URL_BACKEND_AUCTION_MY_WON, URL_BACKEND_CATEGORY_PRODUCT_LIST, URL_BACKEND_PROMOTED_AUCTION, URL_BACKEND_PROMOTED_SOON } from "../app/appConst";
import BadResponseError from "../error/BadResponseError";
import { MyAuctionResponseDto } from "../models/auction/MyAuctionResponseDto";
import { PromotedAuctionResponseDto } from "../models/auction/PromotedAuctionResponseDto";
import MessageResponseDto from "../models/MessageResponseDto";
import { ApiClient, ApiUtility } from "../utility/ApiUtility";

// ================================================================== //
export const auPromotedLiveList = async () => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = URL_BACKEND_PROMOTED_AUCTION;
  
  const response = await ApiClient().get<PromotedAuctionResponseDto>(url, config);
  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const auPromotedSoonList = async () => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = URL_BACKEND_PROMOTED_SOON;

  const response = await ApiClient().get<PromotedAuctionResponseDto>(url, config);
  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const auCenterList = async ({page,size}:{page:number,size:number}) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = `${URL_BACKEND_AUCTION_LIST_ACTIVE}?page=${page}&size=${size}`;

  const response = await ApiClient().get<PromotedAuctionResponseDto>(url, config);
  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const auListByCategoryAndProduct = async (categoryId:number, productId?:number) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  let url = `${URL_BACKEND_CATEGORY_PRODUCT_LIST}?category=${categoryId}`;
  if(productId !== undefined) {
    url += `&product=${productId}`
  }

  const response = await ApiClient().get(url, config);
  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const auMyParticipating = async (page:number, size:number) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = `${URL_BACKEND_AUCTION_MY_PARTICIPATING}?page=${page}&size=${size}`;

  const response = await ApiClient().get<MyAuctionResponseDto>(url, config);
  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const auMyWon = async (page:number, size:number) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = `${URL_BACKEND_AUCTION_MY_WON}?page=${page}&size=${size}`;

  const response = await ApiClient().get<MyAuctionResponseDto>(url, config);
  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const auMySubscribed = async (page:number, size:number) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = `${URL_BACKEND_AUCTION_MY_SUBSCRIBED}?page=${page}&size=${size}`;

  const response = await ApiClient().get<MyAuctionResponseDto>(url, config);
  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const myCreated = async (status:Array<number>, page:number, size:number) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  
  let statusString:string = '';
  status.forEach((item, index) => {
    statusString += item;
    if(index < status.length - 1) {
      statusString += ',';
    }
  });

  const url = `${URL_BACKEND_AUCTION_MY_CREATED}?status=${statusString}&page=${page}&size=${size}`;

  const response = await ApiClient().get<MyAuctionResponseDto>(url, config);
  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}
