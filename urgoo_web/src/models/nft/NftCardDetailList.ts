import { NftCardDetailCreatorDto } from "./NftCardDetailCreator";
import { NftCardDetailPriceDto } from "./NftCardDetailPrice";

export interface NftCardDetailListDto {
  msg: string;
  status: number;
  smartContract: string;
  photo: string;
  name: string;
  type: string;
  seen: number;
  bsId: number;
  code: string;
  likes: number;
  shares: number;
  creator: NftCardDetailCreatorDto;
  unavailable: number;
  available: number;
  total: number;
  description: string;
  prices: NftCardDetailPriceDto[];
  type_name: string;
  start_date: string;
  end_date: string;
  collection_name: string;
  collection_id: number;
}
