import { URL_BACKEND_GIFT_CARDS_MINE, URL_BACKEND_GIFT_RECEIVED } from "../app/appConst";
import BadResponseError from "../error/BadResponseError";
import { GiftMineResponseDto } from "../models/gift/GiftMineResponseDto";
import { ApiClient, ApiUtility } from "../utility/ApiUtility";

// ================================================================== //
export const giftMineList = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  };
  const url = `${URL_BACKEND_GIFT_CARDS_MINE}?page=${page}&size=${size}`;

  const response = await ApiClient().get<GiftMineResponseDto>(url, config);
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
};

// ================================================================== //
export const giftMineReceivedList = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  };
  const url = `${URL_BACKEND_GIFT_RECEIVED}?page=${page}&size=${size}`;

  const response = await ApiClient().get<GiftMineResponseDto>(url, config);
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
};
