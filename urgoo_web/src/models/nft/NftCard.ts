import { NftPriceDto } from "./NftPrice";
import { NftCreatorDto } from "./NftCreator";
import { NftCardDetailPriceDto } from "./NftCardDetailPrice";

export interface NftCardDto {
  photo: string;
  name: string;
  type: string;
  bsId: number;
  code: string;
  likes: number;
  shares: number;
  creator: NftCreatorDto;
  prices: Array<NftPriceDto>;
  start_date: Date;
  end_date: Date;
}
