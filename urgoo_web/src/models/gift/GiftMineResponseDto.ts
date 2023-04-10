export interface GiftMineResponseDto {
  msg: string;
  status: number;
  page: number;
  size: number;
  total: number;
  mines: GiftMineDto[];
}

export interface GiftMineDto {
  allowedForTheGift: boolean;
  seenDate: Date | null;
  fiatBalance: number;
  fiatCode: string;
  giftCardItemId: number;
  giftCardId: number;
  giftCardName: string;
  photo: string;
  receivedUserPhoneNo: string;
}
