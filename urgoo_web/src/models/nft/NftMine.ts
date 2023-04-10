export interface NftMineResponseDto {
  msg: string;
  status: number;
  page: number;
  size: number;
  total: number;
  mine: MineDto[];
}

export interface MineDto {
  status: number;
  statusText: string;
  photo: string;
  name: string;
  type: string;
  code: string;
  likes: number;
  shares: number;
  creator: CreatorDto;
  bsId: number;
  token_id: number;
  smart_contract_address: string;
  bought_date: Date;
}

export interface CreatorDto {
  nickname: string;
  picture: string;
}
