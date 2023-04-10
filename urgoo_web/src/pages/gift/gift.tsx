import { useEffect, useState } from "react";
import Main from "../../components/layout/main/main";
import GiftCard from "../../components/gift-card/GiftCard";
import {
  RESPONSE_ERROR,
  RESPONSE_SUCCESS,
  URL_BACKEND_ROOT,
} from "../../app/appConst";
import axios from "axios";
import { GiftCardDto } from "../../models/gift/GiftCard";
import { getGiftCardList } from "../../service/cardApiClient";
import { useTranslation } from "react-i18next";
import ErrorManager from "../../utility/ErrorManager";
import { Link, useRoutes } from "react-router-dom";
import { TabTitle } from "../../utility/TabTitleUtility";
import MnTranslation from "../../i18n/mn/translation.json";
import NomadPagination from "../../components/nomad/NomadPagination";
import { ToastAlert, ToastType } from "../../components/nomad/NomadToast";

const Gift = () => {
  const { t } = useTranslation();

  const [card, setCard] = useState({
    size: 10,
    page: 0,
    currentPage: 0,
    totalPage: 0,
    error: "",
    isLoading: false,
    cards: Array<GiftCardDto>(),
  });

  TabTitle(MnTranslation.mainTitle.giftCard);

  useEffect(() => {
    getGiftCard(0);
  }, []);

  async function getGiftCard(page: number) {
    setCard({ ...card, isLoading: true });
    try {
      const response = await getGiftCardList({
        page: page,
        size: card.size,
      });

      if (response.status === RESPONSE_SUCCESS) {
        setCard({
          ...card,
          isLoading: false,
          error: "",
          totalPage: Math.ceil(response.total / card.size),
          currentPage: response.page,
          cards: response.giftCards,
        });
        // console.log("gift card list: ", Math.ceil(52 / card.size));
      } else if (response.status === RESPONSE_ERROR) {
        setCard({ ...card, isLoading: false });
        ToastAlert(response.msg, ToastType.ERROR);
      }
    } catch (error) {
      setCard({ ...card, isLoading: false });
      ToastAlert(ErrorManager.handleRequestError(error), ToastType.ERROR);
    }
  }

  return (
    <div>
      <Main>
        <div className="gift_wrapper py-5">
          <h2 className="gift__title text-white my-10 relative font-bold text-2xl after:absolute after:content-[''] after:left-0 after:-bottom-3 after:h-[2px] after:w-20 after:bg-sec-green after:box-border">
            {t("label.giftCard")}
          </h2>
          <div className="w-full m-0 p-0 relative ">
            <div className="grid  lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5 ">
              {card.cards.map((item, index) => {
                let price = 0;
                let symbol = '0';

                if (item.prices !== undefined && item.prices.length > 0) {
                  price = item.prices[0].price ?? 0;
                  symbol = item.prices[0].symbol ?? "0";
                }

                return (
                  <Link to={`detail/${item.id}`}>
                    <GiftCard
                      key={index}
                      id={item.id}
                      photo={item.photo}
                      name={item.name}
                      description={item.description}
                      fiatBalance={item.fiatBalance}
                      fiatSymbol={item.fiatSymbol}
                      price={price}
                      symbol={item.prices[0].symbol}
                    ></GiftCard>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </Main>
      <div className="py-10 w-full grid justify-items-stretch">
        <div className="justify-self-center">
          <NomadPagination
            onClick={(page: number) => {
              getGiftCard(page);
            }}
            totalPage={card.totalPage}
            currentPage={card.currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Gift;
