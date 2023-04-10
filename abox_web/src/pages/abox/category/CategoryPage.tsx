import { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { RESPONSE_ERROR, RESPONSE_SUCCESS, URL_BACKEND_DOWNLOAD } from "../../../app/appConst";
import { BxButton, BxButtonType, BxLoadingIndicator } from "../../../components";
import { BxMessage, BxMessageType } from "../../../components/bx/BxMessage";
import { AuctionDto } from "../../../models/auction/AuctionDto";
import { CategoryDto } from "../../../models/category/CategoryListResponseDto";
import { auListByCategoryAndProduct } from "../../../service/auListApiClient";
import { categoryList } from "../../../service/categoryApiClient";
import ErrorManager from "../../../utility/ErrorManager";

const CategoryPage: FunctionComponent = () => {

  const { t } = useTranslation();
  const { categoryId, factoryId, productId } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState({
    error: '',
    isLoading: false,
    categories: Array<CategoryDto>()
  });

  const [auctions, setAuctions] = useState({
    error: '',
    isLoading: false,
    auctions: Array<AuctionDto>()
  });

  useEffect(() => {
    getCategories();
  }, [categoryId]);

  /* ============================================================================ */
  /* ============================================================================ */
  async function getCategories() {
    if(categoryId === undefined) return;

    setCategories({...categories, isLoading: true, error: ''});
    try {
      const response = await categoryList({page: 0, size: 100, parentCategory: Number(categoryId)});
      if(response.status === RESPONSE_SUCCESS) {
        setCategories({...categories, categories: response.categories});
      } else if(response.status === RESPONSE_ERROR) {
        setCategories({...categories, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setCategories({...categories, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  /* ============================================================================ */
  /* ============================================================================ */
  async function getAuctions() {
    if(categoryId === undefined) return;

    setAuctions({...auctions, isLoading: true, error: ''});
    try {
      const response = await auListByCategoryAndProduct(Number(categoryId), undefined);
      if(response.status === RESPONSE_SUCCESS) {
        
      } else if(response.status === RESPONSE_ERROR) {
        setAuctions({...auctions, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setAuctions({...auctions, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  /* ============================================================================ */
  /* ============================================================================ */
  const Categories = () => {
    if(categories.isLoading) {
      return <div>
        <BxLoadingIndicator size={10}/>
      </div>;
    }

    if(categories.error) {
      return <BxMessage
        type={BxMessageType.error}
        message={categories.error}
      />
    }

    return (
      <div className="flex flex-wrap">
        {categories.categories.map((category, index) => {
          return (
            <div className="flex flex-col flex-wrap grid justify-items-center content-start text-center w-20 mr-2 ml-2">
              <BxButton 
              onClick={() => { 
                navigate(`/category/${category.id}`);
              }} 
              type={BxButtonType.gradientIcon} 
              className="w-20 h-20">
                <img className="icon-color-invert w-10 h-10" alt={category.name} src={`${URL_BACKEND_DOWNLOAD}/${category.icon}`} />
              </BxButton>
              <span className="text-sm">{category.name}</span>
            </div>
          );
        })}
      </div>
    );
  }

  /* ============================================================================ */
  /* ============================================================================ */
  return (
    <div>
      <section className="mb-7">
        {Categories()}
      </section>
    </div>
  );
}

export default CategoryPage;