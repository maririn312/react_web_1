import { FunctionComponent, useEffect, useState } from "react";
import Main from "../../components/layout/main/main";
import NomadSwiper from "../../components/swiper/swiper";
import NftCard from "../../components/nft-card/NftCard";
import { getCategoryById, getNftCard } from "../../service/cardApiClient";
import { NftCardDto } from "../../models/nft/NftCard";
import { NftCategoryDto } from "../../models/nft/NftCategory";
import { RESPONSE_ERROR, RESPONSE_SUCCESS } from "../../app/appConst";
import { useTranslation } from "react-i18next";
import ErrorManager from "../../utility/ErrorManager";
import { Link } from "react-router-dom";
import { TabTitle } from "../../utility/TabTitleUtility";
import MnTranslation from "../../i18n/mn/translation.json";

interface CardsByCategory {
  category: NftCategoryDto;
  cards?: Array<NftCardDto>;
}

interface Categories {
  error?: string;
  categories: Array<CardsByCategory>;
}

const NftPage: FunctionComponent = () => {
  const { t } = useTranslation();

  const [items, setItems] = useState<Categories>({
    error: "",
    categories: [],
  });

  TabTitle(MnTranslation.mainTitle.nftTitle);

  useEffect(() => {
    if (items.categories.length == 0) {
      getCardsByCategory();
    }
  }, []);

  async function getCardsByCategory() {
    try {
      const categoryResponse = await getCategory();
      if (categoryResponse) {
        items.categories = categoryResponse.map<CardsByCategory>(
          (item, index) => {
            return {
              category: item,
              cards: [],
            };
          }
        );

        categoryResponse.forEach(async (item, index) => {
          const cardResponse = await getCard(item.id);
          items.categories[index].cards = cardResponse;
          setItems({ ...items });
        });
      }
    } catch (error) {
      // TODO: import handle error pass string value to error
      setItems({ ...items, error: ErrorManager.handleRequestError(error) });
    }
  }

  async function getCategory() {
    try {
      const response = await getCategoryById();
      if (response.status === RESPONSE_SUCCESS) {
        return response.categories;
      } else if (response.status === RESPONSE_ERROR) {
        throw Error(response.msg);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getCard(id: number) {
    try {
      const response = await getNftCard({
        id: id,
        page: 0,
        size: 10,
      });
      if (response.status === RESPONSE_SUCCESS) {
        return response.nfts;
      } else if (response.status === RESPONSE_ERROR) {
        throw Error(response.msg);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <NomadSwiper />
      <Main>
        {items.categories.map((item, index) => {
          return (
            <section key={index}>
              <h3
                className=" relative pt-12 text-white text-[26px] leading-none mb-6 font-semibold cursor-pointer outline-none box-border"
                style={{ order: item.category.order }}
              >
                {item.category.name}
              </h3>
              <div className="relative p-0 m-0">
                <div className="p-0 m-0 outline-none box-border">
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 ">
                    {item.cards?.map((card, index) => {
                      return (
                        <Link to={`/nft/detail/${card.bsId}/${card.code}`}>
                          <NftCard
                            id={card.code}
                            key={index}
                            photo={card.photo}
                            name={card.name}
                            likes={card.likes}
                            shares={card.shares}
                            collection={false}
                            creator={card.creator}
                            prices={card.prices}
                          />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </Main>
    </div>
  );
};

export default NftPage;
