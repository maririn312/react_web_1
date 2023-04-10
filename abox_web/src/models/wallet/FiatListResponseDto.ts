export interface FiatListResponseDto {
  msg:    string;
  status: number;
  fiats:  FiatDto[];
}

export interface FiatDto {
  id:          number;
  name:        string;
  symbol:      string;
  code:        string;
  active_flag: boolean;
  latin_name:  string;
}
