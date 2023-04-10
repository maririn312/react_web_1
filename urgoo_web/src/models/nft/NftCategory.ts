import { NftCardDto } from "./NftCard";

export interface NftCategoryDto {
  id: number;
  name: string;
  order: number;
  parentCategoryId: null;
  activeFlag: boolean;
}
