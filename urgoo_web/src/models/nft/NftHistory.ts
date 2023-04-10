export interface NftHistoryDto {
  msg: string;
  status: number;
  page: number;
  size: number;
  total: number;
  histories: HistoryDto[];
}

export interface HistoryDto {
  id: number;
  createdDate: Date;
  createdDateStr: Date;
  eventName: string;
  fromNickname: string;
  toNickname: string;
  nftId: number;
  nftItemId: number;
  eventType: string;
  txnHash: string;
  tokenId: string;
  address: string;
  currencyCode: string;
  currencyAmount: number;
  nftName: string;
  nftType: string;
  buyerPhoneNo: string;
  firstName: string;
  lastName: string;
}
