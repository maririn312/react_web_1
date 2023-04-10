export interface BankListResponseDto {
  msg:    string;
  status: number;
  banks:  BankDto[];
}

export interface BankDto {
  id:   number;
  name: string;
  code: string;
}
