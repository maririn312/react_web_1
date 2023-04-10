export interface MyBankAccountResponseDto {
  msg:         string;
  status:      number;
  my_accounts: MyAccountDto[];
}

export interface MyAccountDto {
  id:           number;
  status:       number;
  user_id:      number;
  account_no:   string;
  bank_code:    string;
  bank_name:    string;
  fiat_code:    string;
  fiat_symbol:  string;
  fiat_name:    string;
  account_name: string;
  status_text:  string;
}
