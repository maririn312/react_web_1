import { URL_BACKEND_AUCTION_CURRENT_STATUS, URL_BACKEND_BID, URL_BACKEND_BID_ALLOWANCE, URL_BACKEND_INCREASE_DEPOSIT } from "../app/appConst";
import BadResponseError from "../error/BadResponseError";
import { AllowanceResponseDto } from "../models/bid/AllowanceResponseDto";
import { AuctionCurrentStatusResponseDto } from "../models/bid/AuctionCurrentStatusResponseDto";
import { BidRequestDto } from "../models/bid/BidRequestDto";
import { PutDepositRequestDto } from "../models/bid/PudDepositRequestDto";
import MessageResponseDto from "../models/MessageResponseDto";
import { ApiClient, ApiUtility } from "../utility/ApiUtility";

// ================================================================== //
export const auctionBid = async (request:BidRequestDto) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = URL_BACKEND_BID;
  const response = await ApiClient().post<MessageResponseDto>(url, JSON.stringify(request), config);

  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const auctionGetAllowance = async (auctionId:number) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = `${URL_BACKEND_BID_ALLOWANCE}?auction-id=${auctionId}`;
  const response = await ApiClient().get<AllowanceResponseDto>(url, config);

  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const putDeposit = async (request:PutDepositRequestDto) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = URL_BACKEND_INCREASE_DEPOSIT;
  const response = await ApiClient().post<MessageResponseDto>(url, JSON.stringify(request), config);

  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const currentStats = async (auctionId:number) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = `${URL_BACKEND_AUCTION_CURRENT_STATUS}?auction-id=${auctionId}`;
  const response = await ApiClient().get<AuctionCurrentStatusResponseDto>(url, config);

  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}