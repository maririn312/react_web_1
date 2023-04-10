export interface WalletDischargeRequestDto {
  inquireId:       string;
  pinCode:         string;
  dischargeAmount: number;
  bankAccountId:   number;
}
