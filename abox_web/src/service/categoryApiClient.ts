import internal from "stream";
import { URL_BACKEND_CATEGORY_LIST, URL_BACKEND_CATEGORY_PRODUCT_LIST, URL_BACKEND_FACTORY_LIST, URL_BACKEND_PRODUCT_LIST } from "../app/appConst";
import BadResponseError from "../error/BadResponseError";
import { CategoryListResponseDto } from "../models/category/CategoryListResponseDto";
import { FactoryListResponseDto } from "../models/category/FactoryListResponseDto";
import { ProductListResponseDto } from "../models/category/ProductListResponseDto";
import { ApiClient, ApiUtility } from "../utility/ApiUtility";

// ================================================================== //
export const categoryList = async ({page, size, parentCategory}:{page:number, size:number, parentCategory?:number}) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  let url = `${URL_BACKEND_CATEGORY_LIST}?&page=${page}&size=${size}`;
  if(parentCategory !== undefined) url += `&parent-category=${parentCategory}`;
  
  const response = await ApiClient().get<CategoryListResponseDto>(url, config);
  
  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const factoryList = async ({page, size, category}:{page:number, size:number, category:number}) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  let url = `${URL_BACKEND_FACTORY_LIST}?&page=${page}&size=${size}`;
  if(category !== undefined) url += `&category=${category}`;
  const response = await ApiClient().get<FactoryListResponseDto>(url, config);

  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const productList = async ({page, size, factory}:{page:number, size:number, factory:number}) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  let url = `${URL_BACKEND_PRODUCT_LIST}?factory=${factory}&page=${page}&size=${size}`;

  const response = await ApiClient().get<ProductListResponseDto>(url, config);

  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const productCategoryList = async ({category, factory}:{category:number | undefined, factory:number | undefined}) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  let url = URL_BACKEND_CATEGORY_PRODUCT_LIST;
  if(category !== undefined) {
    url += `?category=${category}`;
  }
  if(factory !== undefined) {
    if(category !== undefined) {
      url += '&';
    }
    url += `factory=${factory}`;
  }

  const response = await ApiClient().get<ProductListResponseDto>(url, config);
  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}