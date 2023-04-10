import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RESPONSE_ERROR, RESPONSE_SUCCESS } from "../../app/appConst";
import GiftCardDetail from "../../components/gift-card-detail/GiftCardDetail";
import { GiftCardBuyRequestDto } from "../../models/gift/GiftCardBuyRequestDto";
import { GiftCardDetailDto } from "../../models/gift/GiftCardDetail";
import {
  buyGiftCard,
  getDaxStats,
  getGiftCardDetailById,
  sendGiftCard,
} from "../../service/cardApiClient";
import ErrorManager from "../../utility/ErrorManager";
import { TabTitle } from "../../utility/TabTitleUtility";
import MnTranslation from "../../i18n/mn/translation.json";
import { ToastAlert, ToastType } from "../../components/nomad/NomadToast";

const GiftDetailPage = () => {
  let { giftId } = useParams();
  const [item, setItem] = useState({
    giftId,
    isLoading: false,
    error: "",
    items: {} as GiftCardDetailDto,
  });

  TabTitle(MnTranslation.mainTitle.giftCardDetail);
  const [urgPrice, setUrgPrice] = useState<number>();

  // ================================================================== //
  useEffect(() => {
    getDetail();
    getDax();
  }, []);

  // ================================================================== //
  async function getDetail() {
    if (giftId === undefined) return;
    setItem({ ...item, isLoading: true });
    try {
      const response = await getGiftCardDetailById({
        id: parseInt(giftId),
      });
      if (response.status === RESPONSE_SUCCESS) {
        setItem({
          ...item,
          isLoading: false,
          items: response.giftCard,
        });
      } else if (response.status === RESPONSE_ERROR) {
        setItem({ ...item, isLoading: false });
        ToastAlert(response.msg, ToastType.ERROR);
      }
    } catch (error) {
      setItem({ ...item, isLoading: false });
      ToastAlert(ErrorManager.handleRequestError(error), ToastType.ERROR);
    }
  }

  // ================================================================== //
  async function getDax() {
    try {
      const response = await getDaxStats();
      if (response.data !== undefined) {
        for (var pair of response.data.sys_pair) {
          if (pair.symbol === "URG") {
            setUrgPrice(pair.price.last_price);
          }
        }
      }
    } catch (error) {}
  }

  // ================================================================== //
  const data = item.items;
  return (
    <div className="px-16 py-6 w-full relative mx-auto">
      <GiftCardDetail
        key={data.id}
        id={data.id}
        name={data.name}
        photo={data.photo}
        description={data.description}
        price={data.prices}
        symbol={data.fiatSymbol}
        urgPrice={urgPrice}
        startDate={data.startDate}
        endDate={data.endDate}
        availableCount={data.availableCount}
      />
    </div>
  );
};

export default GiftDetailPage;
