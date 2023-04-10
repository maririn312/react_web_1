export interface BalanceChargeResponseDto {
  msg: string;
  status: number;
  statement: string;
  banks: BankChargeDto[];
}

export interface BankChargeDto {
  bankCode: string;
  bankName: string;
  accountNo: string;
  accountName: string;
}
