import {
  URL_BACKEND_COLLECTED_BY_NICKNAME,
  URL_BACKEND_CREATED_BY_NICKNAME,
  URL_BACKEND_CREATOR_BY_NICKNAME,
} from "../app/appConst";
import BadResponseError from "../error/BadResponseError";
import { CollectedByNicknameResponseDto } from "../models/creator/CollectedByNicknameResponseDto";
import { getCreatedByNicknameResponseDto } from "../models/creator/CreatedByNicknameResponseDto";
import { CreatorByNicknameResponseDto } from "../models/creator/CreatorByNicknameResponseDto";
import MessageResponseDto from "../models/MessageResponseDto";
import { ApiClient, ApiUtility } from "../utility/ApiUtility";

export const getCreatorByNickname = async ({
  nickname,
}: {
  nickname: string;
}) => {
  const url = `${URL_BACKEND_CREATOR_BY_NICKNAME}/${nickname}`;
  const response = await ApiClient().get<CreatorByNicknameResponseDto>(url);

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
};

export const getCollectedByNickname = async ({
  nickname,
  page,
  size,
}: {
  nickname: string;
  page: number;
  size: number;
}) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  };
  const url = `${URL_BACKEND_COLLECTED_BY_NICKNAME}?nickname=${nickname}&page=${page}&size=${size}`;
  const response = await ApiClient().get<CollectedByNicknameResponseDto>(
    url,
    config
  );

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
};

export const getCreatedByNickname = async ({
  nickname,
}: {
  nickname: string;
}) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  };
  const url = `${URL_BACKEND_CREATED_BY_NICKNAME}?nickname=${nickname}`;
  const response = await ApiClient().get<getCreatedByNicknameResponseDto>(
    url,
    config
  );

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
};
