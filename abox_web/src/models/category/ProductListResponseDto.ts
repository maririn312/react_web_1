export interface ProductListResponseDto {
  msg:      string;
  status:   number;
  total:    number;
  page:     number;
  size:     number;
  products: ProductDto[];
}

export interface ProductDto {
  id:              number;
  name:            string;
  totalActiveItem: number;
  factoryId:       number;
  icon:            string;
}
