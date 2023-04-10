import { GiftCardDetailPriceDto } from "./GiftCardDetailPrice";

export interface GiftCardDetailDto {
  id: number;
  type: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  fiatBalance: number;
  fiatCode: string;
  fiatSymbol: string;
  photo: string;
  availableCount: number;
  prices: GiftCardDetailPriceDto[];
}
