export interface BalanceResponseDto {
  msg: string;
  status: number;
  balances: BalanceDto[];
}

export interface BalanceDto {
  code: string;
  name: string;
  symbol: string;
  balance: number;
}
