export interface MyBankAccountResponseDto {
  msg: string;
  status: number;
  accounts: MyAccountDto[];
}

export interface MyAccountDto {
  id: number;
  upUserId: number;
  fiatCode: string;
  fiatName: string;
  bankCode: string;
  bankName: string;
  accountNo: string;
  accountName: string;
  confirmedFlag: boolean;
}
