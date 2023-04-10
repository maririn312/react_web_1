export interface FiatListResponseDto {
  msg: string;
  status: number;
  fiats: FiatDto[];
}

export interface FiatDto {
  id: number;
  name: string;
  code: string;
  symbol: string;
  latinName: string;
  activeFlag: boolean;
}
