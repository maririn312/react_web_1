export interface PriceDto {
  type: PriceType;
  symbol: Symbol;
  price: number;
  decimal: number;
  bsNetworkId: number;
}

export enum Symbol {
  Urgx = "URGX",
}

export enum PriceType {
  Bep20 = "BEP20",
}
