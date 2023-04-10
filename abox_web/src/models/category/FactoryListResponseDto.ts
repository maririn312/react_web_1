export interface FactoryListResponseDto {
  msg:       string;
  status:    number;
  total:     number;
  page:      number;
  size:      number;
  factories: FactoryDto[];
}

export interface FactoryDto {
  id:              number;
  name:            string;
  icon:            string;
  totalActiveItem: number;
}
