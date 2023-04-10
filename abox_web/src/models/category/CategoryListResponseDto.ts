export interface CategoryListResponseDto {
  msg:        string;
  status:     number;
  total:      number;
  page:       number;
  size:       number;
  categories: CategoryDto[];
}

export interface CategoryDto {
  id:              number;
  icon:            string;
  name:            string;
  parentId:        null;
  totalActiveItem: number;
}
