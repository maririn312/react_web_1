export interface WalletBalanceResponseDto {
  msg: string;
  status: number;
  address: string;
  balances: WalletBalanceDto[];
}

export interface WalletBalanceDto {
  type: string;
  symbol: string;
  code: string;
  name: string;
  bsNetworkId: number;
  decimal: number;
  available: number;
  withdrawAllowedFlag: boolean;
  withdrawPercentage: number;
}

