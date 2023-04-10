export interface WalletDepositResponseDto {
  msg:          string;
  status:       number;
  statement:    string;
  banks:        DepositBank[];
  warn_message: string;
}

export interface DepositBank {
  bank_code:           string;
  account_no:          string;
  account_holder_name: string;
  bank_name:           string;
}
