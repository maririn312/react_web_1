import { PriceDto } from "./GiftCardPrice";

export interface GiftCardDto {
  id: number;
  type: GiftCardType;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  fiatBalance: number;
  fiatCode: FiatCode;
  fiatSymbol: FiatSymbol;
  photo: string;
  availableCount: number;
  prices: PriceDto[];
}

export enum FiatCode {
  Mnt = "MNT",
}

export enum FiatSymbol {
  Empty = "₮",
}

export enum GiftCardType {
  Default = "DEFAULT",
  Ori = "ORI",
}
