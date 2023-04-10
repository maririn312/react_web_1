export interface AuctionMyHistoryResponseDto {
  msg:       string;
  status:    number;
  total:     number;
  histories: MyHistoryDto[];
}

export interface MyHistoryDto {
  id:           number;
  type:         string;
  statement:    string;
  created_date: string;
}
