import { URL_BACKEND_NFT_MINE } from "../app/appConst";
import BadResponseError from "../error/BadResponseError";
import { NftMineResponseDto } from "../models/nft/NftMine";
import { ApiClient, ApiUtility } from "../utility/ApiUtility";

export const getNftMine = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  };
  const url = `${URL_BACKEND_NFT_MINE}?page=${page}&size=${size}`;
  const response = await ApiClient().get<NftMineResponseDto>(url, config);

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
};
