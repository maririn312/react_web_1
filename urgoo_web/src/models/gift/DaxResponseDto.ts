export interface DaxResponseDto {
  data: DaxData;
}

export interface DaxData {
  sys_pair: SysPair[];
}

export interface SysPair {
  id:              number;
  symbol:          string;
  base_max_size:   number;
  base_min_size:   number;
  base_tick_size:  number;
  quote_max_size:  number;
  quote_min_size:  number;
  quote_tick_size: number;
  baseAsset:       EAsset;
  quoteAsset:      EAsset;
  price:           DaxPrice;
  stats24:         Stats24;
  __typename:      string;
}

export interface EAsset {
  id:         number;
  code:       string;
  name:       string;
  scale:      number;
  is_crypto?: boolean;
  __typename: string;
}

export interface DaxPrice {
  last_price:    number;
  last_price_dt: string;
  __typename:    string;
}

export interface Stats24 {
  high:       null;
  low:        null;
  change24h:  number;
  vol:        null;
  __typename: string;
}
