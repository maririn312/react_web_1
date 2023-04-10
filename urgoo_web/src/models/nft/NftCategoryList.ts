import { NftCategoryDto } from "./NftCategory";

export interface NftCategoryListDto {
  msg: string;
  status: number;
  categories: NftCategoryDto[];
}
