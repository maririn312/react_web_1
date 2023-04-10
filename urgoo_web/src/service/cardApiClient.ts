import {
  URL_BACKEND_GIFT_BUY,
  URL_BACKEND_GIFT_CARD_DETAIL,
  URL_BACKEND_GIFT_LIST,
  URL_BACKEND_GIFT_SEND,
  URL_BACKEND_GIFT_USE,
  URL_BACKEND_NFT_BUY,
  URL_BACKEND_NFT_CARD_DETAIL,
  URL_BACKEND_NFT_CATEGORIES,
  URL_BACKEND_NFT_COLLECTION,
  URL_BACKEND_NFT_LIST,
  URL_DAX_GRAPHQL,
} from "../app/appConst";
import BadResponseError from "../error/BadResponseError";
import { DaxResponseDto } from "../models/gift/DaxResponseDto";
import { GiftCardBuyRequestDto } from "../models/gift/GiftCardBuyRequestDto";
import { GiftCardDetailListDto } from "../models/gift/GiftCardDetailList";
import { GiftCardListDto } from "../models/gift/GiftCardList";
import { GiftCardUseResponseDto } from "../models/gift/GiftCardUseResponseDto";
import MessageResponseDto from "../models/MessageResponseDto";
import { NftBuyRequestDto } from "../models/nft/NftBuyRequestDto";
import { NftCardDto } from "../models/nft/NftCard";
import { NftCardDetailListDto } from "../models/nft/NftCardDetailList";
import { NftCardListDto } from "../models/nft/NftCardList";
import { NftCategoryListDto } from "../models/nft/NftCategoryList";
import { NftCollectionResponseDto } from "../models/nft/NftCollectionResponseDto";
import { NftHistoryDto } from "../models/nft/NftHistory";
import { ApiClient, ApiUtility } from "../utility/ApiUtility";

// ================================================================== //
export const getCategoryById = async () => {
  const url = `${URL_BACKEND_NFT_CATEGORIES}`;
  const response = await ApiClient().get<NftCategoryListDto>(url);

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }

  throw new BadResponseError(response.status);
};

// ================================================================== //
export const getNftCard = async ({
  id,
  page,
  size,
}: {
  id?: number;
  page: number;
  size: number;
}) => {
  let url = URL_BACKEND_NFT_LIST;
  if (id === undefined) {
    url += `?page=${page}&size=${size}`;
  } else {
    url += `?category-ids=${id}&page=${page}&size=${size}`;
  }

  const response = await ApiClient().get<NftCardListDto>(url);
  
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
};

// ================================================================== //
export const getGiftCardList = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  const url = `${URL_BACKEND_GIFT_LIST}?page=${page}&size=${size}`;
  const response = await ApiClient().get<GiftCardListDto>(url);

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
};

// ================================================================== //
export const getGiftCardDetailById = async ({ id }: { id: number }) => {
  const url = `${URL_BACKEND_GIFT_CARD_DETAIL}?id=${id}`;
  const response = await ApiClient().get<GiftCardDetailListDto>(url);

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
};

// ================================================================== //
export const getNftCardDetailById = async ({
  id,
  code,
}: {
  id: any;
  code: any;
}) => {
  const url = `${URL_BACKEND_NFT_CARD_DETAIL}/${id}/${code}`;
  const response = await ApiClient().get<NftCardDetailListDto>(url);

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
};

// ================================================================== //
export const buyGiftCard = async (request: GiftCardBuyRequestDto) => {
  const url = URL_BACKEND_GIFT_BUY;
  const response = await ApiClient().post<MessageResponseDto>(url, request);

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
};

// ================================================================== //
export const giftCardUse = async ({
  gcId,
  itemId,
}: {
  gcId: number;
  itemId: number;
}) => {
  const url = `${URL_BACKEND_GIFT_USE}/?gift-card-id=${gcId}&gift-card-item-id=${itemId}`;
  const response = await ApiClient().get<GiftCardUseResponseDto>(url);

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
};

// ================================================================== //
export const sendGiftCard = async ({
  gcId,
  itemId,
  phone,
}: {
  gcId: number;
  itemId: number;
  phone: string;
}) => {
  const url = `${URL_BACKEND_GIFT_SEND}/?gift-card-id=${gcId}&gift-card-item-id=${itemId}&phone-no=${phone}`;
  const response = await ApiClient().get<MessageResponseDto>(url);

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
};

// ================================================================== //
export const getDaxStats = async () => {
  const url = URL_DAX_GRAPHQL;
  const config = {
    headers: ApiUtility.getGraphQLHeader(),
  };

  const query =
    '{"query":"query ActivePairs {sys_pair(where: {is_active: {_eq: true}, order_by: {id: asc}) {id symbol base_max_size base_min_size base_tick_size quote_max_size quote_min_size quote_tick_size baseAsset {id code name scale is_crypto __typename} quoteAsset {id code name scale\\n      __typename} price {last_price last_price_dt __typename} stats24 {high low change24h vol __typename} __typename}}"}';
  const response = await ApiClient().post<DaxResponseDto>(url, query, config);

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
};

// ================================================================== //
export const getNftHistory = async ({
  page,
  size,
  id,
  code,
}: {
  page: number;
  size: number;
  id: any;
  code: any;
}) => {
  const url = `${URL_BACKEND_NFT_CARD_DETAIL}/${id}/${code}/history?page=${page}&size=${size}`;
  const response = await ApiClient().get<NftHistoryDto>(url);
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
};

// ================================================================== //
export const getNftCollection = async ({
  collection_Id,
}: {
  collection_Id: any;
}) => {
  const url = `${URL_BACKEND_NFT_COLLECTION}?collection-id=${collection_Id}`;
  const response = await ApiClient().get<NftCollectionResponseDto>(url);
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
};

// ================================================================== //
export const buyNft = async (request: NftBuyRequestDto) => {
  const url = URL_BACKEND_NFT_BUY;
  const response = await ApiClient().post<NftHistoryDto>(
    url,
    JSON.stringify(request)
  );
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
};
