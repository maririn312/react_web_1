export interface WalletFiatBalanceDto {
  msg: string;
  status: number;
  balances: FiatBalanceDto[];
}

export interface FiatBalanceDto {
  code: string;
  name: string;
  symbol: string;
  balance: number;
}
