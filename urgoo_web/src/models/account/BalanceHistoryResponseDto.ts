export interface BalanceHistoryResponseDto {
  msg: string;
  status: number;
  page: number;
  size: number;
  total: number;
  balance_history: BalanceHistoryDto[];
}

export interface BalanceHistoryDto {
  created_date: Date;
  amount: number;
  currency: string;
}
