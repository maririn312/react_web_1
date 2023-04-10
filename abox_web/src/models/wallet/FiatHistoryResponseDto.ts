export interface FiatHistoryResponseDto {
  msg:       string;
  status:    number;
  page:      number;
  size:      number;
  total:     number;
  histories: FiatHistoryDto[];
}

export interface FiatHistoryDto {
  date:   string;
  type:   string;
  amount: number;
}
