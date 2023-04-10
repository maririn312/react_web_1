export interface GiftCardBuyRequestDto {
  inquireId:   string;
  giftCardId:  number;
  quantity:    number;
  tokenSymbol: string;
  bsNetworkId: number;
}
