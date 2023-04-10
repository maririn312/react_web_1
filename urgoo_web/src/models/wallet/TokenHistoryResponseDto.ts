export interface TokenHistoryResponseDto {
  msg: string;
  status: number;
  page: number;
  size: number;
  symbol: string;
  total: number;
  transfers: TransferDto[];
}

export interface TransferDto {
  createdDate: Date;
  amount: number;
  from: string;
  to: string;
  txnHash: string;
}

