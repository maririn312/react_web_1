import { FunctionComponent, useEffect, useState } from "react";
import Main from "../../components/layout/main/main";
import NomadSwiper from "../../components/swiper/swiper";
import NftCard from "../../components/nft-card/NftCard";
import { getCategoryById, getNftCard } from "../../service/cardApiClient";
import { NftCardDto } from "../../models/nft/NftCard";
import { NftCategoryDto } from "../../models/nft/NftCategory";
import { RESPONSE_ERROR, RESPONSE_SUCCESS } from "../../app/appConst";
import { NftPriceDto } from "../../models/nft/NftPrice";
import { useTranslation } from "react-i18next";
import ErrorManager from "../../utility/ErrorManager";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { TabTitle } from "../../utility/TabTitleUtility";
import MnTranslation from "../../i18n/mn/translation.json";
import NomadPagination from "../../components/nomad/NomadPagination";
import NomadToast, {
  ToastAlert,
  ToastType,
} from "../../components/nomad/NomadToast";
import { NomadLoadingIndicator } from "../../components/nomad/NomadLoadingIndicator";

interface Categories {
  error?: string;
  isLoading: boolean;
  categories: Array<NftCategoryDto>;
  nftList: Array<NftCardDto>;
  page: number;
  currentPage: number;
  totalPage: number;
  size: number;
}

const NftPage: FunctionComponent = () => {
  TabTitle(MnTranslation.mainTitle.marketTitle);
  const [activeCategory, setActiveCategory] = useState<number>();

  const [items, setItems] = useState<Categories>({
    error: "",
    isLoading: false,
    categories: [],
    nftList: [],
    page: 0,
    currentPage: 0,
    totalPage: 0,
    size: 20,
  });

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    if (items.categories.length > 0 && activeCategory === undefined) {
      setActiveCategory(items.categories[0].id);
      getNft(items.categories[0].id, 0);
    }
  }, [items.categories]);

  /* =========================================== */
  async function getCategory() {
    setItems({ ...items, isLoading: true });
    try {
      const response = await getCategoryById();
      if (response.status === RESPONSE_SUCCESS) {
        setItems({
          ...items,
          isLoading: false,
          categories: response.categories,
        });
      } else if (response.status === RESPONSE_ERROR) {
        setItems({ ...items, isLoading: false });
        ToastAlert(response.msg, ToastType.ERROR);
      }
    } catch (error) {
      setItems({ ...items, isLoading: false });
      ToastAlert(ErrorManager.handleRequestError(error), ToastType.ERROR);
    }
  }

  /* =========================================== */
  async function getNft(categoryId?: number, page?: number) {
    setItems({ ...items, isLoading: true });
    try {
      const response = await getNftCard({
        id: categoryId,
        page: page ?? 0,
        size: items.size,
      });
      if (response.status === RESPONSE_SUCCESS) {
        setItems({
          ...items,
          isLoading: false,
          nftList: response.nfts,
          totalPage: Math.ceil(response.total / items.size),
          currentPage: response.page,
        });
      } else if (response.status === RESPONSE_ERROR) {
        setItems({ ...items, isLoading: false });
        ToastAlert(response.msg, ToastType.ERROR);
      }
    } catch (error) {
      setItems({ ...items, isLoading: false });
      ToastAlert(ErrorManager.handleRequestError(error), ToastType.ERROR);
    }
  }

  /* =========================================== */
  const NftList = () => {
    if (items.isLoading) {
      return (
        <div className="grid w-full place-items-center p-10">
          <NomadLoadingIndicator />
        </div>
      );
    }

    return (
      <div className="w-full m-0 p-0 ">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 mb-4">
          {items.nftList?.map((card, index) => {
            return (
              <Link to={`/nft/detail/${card.bsId}/${card.code}`}>
                <NftCard
                  id={card.code}
                  key={card.bsId}
                  photo={card.photo}
                  name={card.name}
                  likes={card.likes}
                  shares={card.shares}
                  creator={card.creator}
                  prices={card.prices}
                />
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="pt-12">
      <Main>
        <div className="flex gap-7">
          {items.categories.map((category, idx) => {
            return (
              <button
                key={idx}
                className={`py-2 text-base transition-colors duration-300 gap-3 ${
                  category.id === activeCategory
                    ? " text-white"
                    : "text-status-detail"
                }`}
                onClick={() => {
                  setActiveCategory(category.id);
                  getNft(category.id, 0);
                }}
              >
                {category.name}
              </button>
            );
          })}
        </div>
        <div className="w-full pt-5">{NftList()}</div>
      </Main>
      <div className="py-10 w-full grid justify-items-stretch">
        <div className="justify-self-center">
          <NomadPagination
            onClick={(page: number) => {
              getNft(1, page);
            }}
            totalPage={items.totalPage}
            currentPage={items.currentPage}
          />
        </div>
      </div>
      <NomadToast />
    </div>
  );
};

export default NftPage;
