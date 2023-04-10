import { GiftCardDto } from "./GiftCard";

export interface GiftCardListDto {
  msg: string;
  status: number;
  page: number;
  size: number;
  total: number;
  giftCards: GiftCardDto[];
}
