export interface BalanceResponseDto {
  msg:    string;
  status: number;
  fiats:  BalanceFiatDto[];
}

export interface BalanceFiatDto {
  id:                 number;
  type:               string;
  type_name:          string;
  reference_id:       number;
  balance:            number;
  fiat_code:          string;
  fiat_name:          string;
  fiat_symbol:        string;
  active_flag:        boolean;
  deactivated_reason: string;
}
