export interface CategoryProductListResponseDto {
  msg:      string;
  status:   number;
  products: CategoryProductDto[];
}

export interface CategoryProductDto {
  id:                number;
  name:              string;
  icon:              string;
  factory:           null;
  category:          null;
  total_active_item: number;
  factory_id:        number;
}
