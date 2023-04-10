import { NftCardDto } from "./NftCard";

export interface NftCardListDto {
  msg: string;
  status: number;
  page: number;
  size: number;
  total: number;
  nfts: NftCardDto[];
}
