export interface getCreatedByNicknameResponseDto {
  msg: string;
  status: number;
  page: number;
  size: number;
  total: number;
  nfts: NftDto[];
}

export interface NftDto {
  photo: string;
  name: string;
  type: Type;
  bsId: number;
  code: string;
  likes: number;
  shares: number;
  creator: CreatorDto;
  prices: PriceDto[];
  start_date: Date;
  end_date: Date;
}

export interface CreatorDto {
  nickname: string;
  picture: string;
}

export interface PriceDto {
  price: number;
  symbol: Symbol;
}

export enum Symbol {
  Mnt = "MNT",
  Urgx = "URGX",
}

export enum Type {
  Limited = "LIMITED",
  One = "ONE",
}
