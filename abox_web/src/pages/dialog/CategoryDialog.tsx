import { Dialog } from "@headlessui/react"
import clsx from 'clsx';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RESPONSE_ERROR, RESPONSE_SUCCESS, URL_BACKEND_DOWNLOAD } from "../../app/appConst";
import { BxButton, BxButtonType, BxLoadingIndicator } from "../../components";
import { CategoryDto } from "../../models/category/CategoryListResponseDto";
import { FactoryDto } from "../../models/category/FactoryListResponseDto";
import { ProductDto } from "../../models/category/ProductListResponseDto";
import { categoryList, factoryList, productCategoryList } from "../../service/categoryApiClient";
import ErrorManager from "../../utility/ErrorManager";
import StringUtility from "../../utility/StringUtility";

interface CategoryDialogProps {
  isOpen: boolean,
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  type: "category" | "factory" | "product",
  categoryId?: number | undefined,
  factoryId?: number | undefined,
  onSelect?: (id:number[], name:string) => void 
}

export const CategoryDialog = (props:CategoryDialogProps) => {
  const { t } = useTranslation();
  const page = 0;
  const size = 100;
  let ids:number[] = [];
  
  const [items, setItems] = useState({
    isLoading: false,
    error: '',
    categories: Array<CategoryDto>(),
    factories: Array<FactoryDto>(),
    prdoucts: Array<ProductDto>()
  });

  useEffect(() => {
    if(props.isOpen) {
      if(props.type === "category") {
        getCategory(undefined, undefined);
      } else if(props.type === "factory") {
        getFactory();
      } else if(props.type === "product") {
        getProduct();
      }
    }
  }, [props.isOpen]);

  // ================================================================== //
  async function getCategory(parentCategory:number | undefined, name:string | undefined) {
    setItems({...items, isLoading:true});
    try {
      const response = await categoryList({page, size, parentCategory});
      if(response.status === RESPONSE_SUCCESS) {
        if(StringUtility.isListEmpty(response.categories)) {
          if(props.onSelect !== undefined) {
            props.onSelect(ids, name ?? '');
          }
          props.setIsOpen(false);
        } else {
          setItems({...items, isLoading:false, categories:response.categories});
        }
      } else if(response.status === RESPONSE_ERROR) {
        setItems({...items, isLoading:false, error: response.msg});
      }
    } catch(ex) {
      setItems({...items, isLoading:false, error: ErrorManager.handleRequestError(ex)})
    }
  }

  // ================================================================== //
  async function getFactory() {
    setItems({...items, isLoading:true});
    try {
      const response = await factoryList({page, size, category:props.categoryId ?? 0});
      if(response.status === RESPONSE_SUCCESS) {
        setItems({...items, isLoading:false, factories:response.factories});
      } else if(response.status === RESPONSE_ERROR) {
        setItems({...items, isLoading:false, error: response.msg});
      }
    } catch(ex) {
      setItems({...items, isLoading:false, error: ErrorManager.handleRequestError(ex)})
    }
  }

  // ================================================================== //
  async function getProduct() {
    setItems({...items, isLoading:true});
    try {
      const response = await productCategoryList({
        category:props.categoryId, 
        factory:props.factoryId,
      });
      if(response.status === RESPONSE_SUCCESS) {
        setItems({...items, isLoading:false, prdoucts:response.products});
      } else if(response.status === RESPONSE_ERROR) {
        setItems({...items, isLoading:false, error: response.msg});
      }
    } catch(ex) {
      setItems({...items, isLoading:false, error: ErrorManager.handleRequestError(ex)})
    }
  }

  // ================================================================== //
  async function select(id:number, name:string) {
    if(props.onSelect !== undefined) {
      if(props.type === "category") {
        ids.push(id);
        getCategory(id, name);
      } else {
        props.onSelect([id], name);
        props.setIsOpen(false);
      }
    }
  }

  // ================================================================== //
  const ItemList = () => {
    if(items.isLoading) {
      return <div className="grid p-10">
        <div className="content-center justify-self-center">
          <BxLoadingIndicator size={80} color="#6669f1"/>
        </div>
      </div>
    }
    
    if(props.type === "category") {
      return <div className="grid gap-2">
        {items.categories.map((item, index) => {
          return ClickableItem({
            image: item.icon, 
            name: item.name, 
            value: item.id
          });
        })}
      </div>
    } else if(props.type === "factory") {
      return <div className="grid gap-2">
        {items.factories.map((item, index) => {
          return ClickableItem({
            image: item.icon, 
            name: item.name, 
            value: item.id
          });
        })}
      </div>
    } else if(props.type === "product") {
      return <div className="grid gap-2">
        {items.prdoucts.map((item, index) => {
          return ClickableItem({
            image: item.icon, 
            name: item.name, 
            value: item.id
          });
        })}
      </div>
    }
  }

  // ================================================================== //
  const ClickableItem = ({image, name, value}:{image:string, name:string, value:number}) => {
    return <BxButton 
      type={BxButtonType.gradient}
      onClick={() => {
        select(value, name);
      }}
    >
      <img 
        className={clsx('w-10 h-10', props.type === "category" ? 'icon-color-invert' : '')} 
        alt={name} 
        src={`${URL_BACKEND_DOWNLOAD}/${image}`} 
      />
      <span className="ml-2">{name}</span>
    </BxButton>
  }

  // ================================================================== //
  return <Dialog
      open={props.isOpen}
      onClose={props.setIsOpen}
      as="div"
      className={clsx(
        "fixed inset-0 z-10 flex items-center justify-center overflow-y-auto",
        {
          "bg-gray-900 bg-opacity-50": props.isOpen === true,
        },
      )}
    >
      <div className="flex flex-col bg-white text-black w-96 py-6 px-4 text-center rounded-lg">
        <Dialog.Overlay />
        <div className="max-h-50 overflow-auto">
          {ItemList()}
        </div>
        <div className="mb-4"></div>
        <BxButton className="" type={BxButtonType.bordered}
          onClick={() => {
            props.setIsOpen(false);
          }}
        >
          {t('action.back')}
        </BxButton>
      </div>
    </Dialog>

}