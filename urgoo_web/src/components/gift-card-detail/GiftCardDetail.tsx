import { Transition } from "@headlessui/react";
import {
  RESPONSE_ERROR,
  RESPONSE_SUCCESS,
  URL_IMG_ROOT,
} from "../../app/appConst";
import React, { useEffect, useState } from "react";
import NomadBtn, { BtnType } from "../nomad/NomadBtn";
import { GiftCardDetailPriceDto } from "../../models/gift/GiftCardDetailPrice";
import { useAppSelector } from "../../app/hooks";
import {
  getBalanceEvent,
  getBalanceState,
} from "../../redux/Wallet/balanceSlice";
import { useTranslation } from "react-i18next";
import URGCoin from "../logo/urg-coin";
import { useDispatch } from "react-redux";
import StringUtility from "../../utility/StringUtility";
import ErrorManager from "../../utility/ErrorManager";
import { buyGiftCard } from "../../service/cardApiClient";
import clsx from "clsx";
import NomadToast, { ToastAlert, ToastType } from "../nomad/NomadToast";
import NomadCountdown from "../countdown/countdown";
import moment from "moment";
interface DetailProp {
  id?: number;
  name?: string;
  description?: string;
  photo?: string;
  title?: string;
  symbol?: string;
  startDate?: Date;
  endDate?: Date;
  availableCount?: number;
  price?: GiftCardDetailPriceDto[];
  urgPrice?: number;
}

interface Basket {
  count: number;
  available: number;
  price: GiftCardDetailPriceDto;
}

const GiftCardDetail = (props: DetailProp) => {
  const { t } = useTranslation();
  const balance = useAppSelector(getBalanceState);
  const dispatch = useDispatch<any>();
  const [basket, setBasket] = useState<Basket[]>();
  const [buyStatus, setBuyStatus] = useState({
    error: "",
    isLoading: false,
  });

  // ================================================================== //
  useEffect(() => {
    if (balance.status === "empty" || balance.status === "error") {
      dispatch(getBalanceEvent());
    }
  }, []);

  // ================================================================== //
  useEffect(() => {
    if (
      balance.balances !== undefined &&
      balance.balances.length > 0 &&
      props.price !== undefined
    ) {
      let buffer = Array<Basket>();

      for (const balanceItem of balance.balances) {
        for (const priceItem of props.price) {
          if (balanceItem.symbol === priceItem.symbol) {
            buffer.push({
              count: 0,
              available: balanceItem.available,
              price: priceItem,
            });
            break;
          }
        }
      }

      setBasket(buffer);
    }
  }, [balance?.balances]);

  // ================================================================== //
  async function buy(item: Basket) {
    setBuyStatus({ ...buyStatus, isLoading: true });
    try {
      const response = await buyGiftCard({
        inquireId: StringUtility.generateInquireId(),
        giftCardId: props.id ?? 0,
        quantity: item.count,
        tokenSymbol: item.price.symbol,
        bsNetworkId: item.price.bsNetworkId,
      });

      if (response.status === RESPONSE_SUCCESS) {
        setBuyStatus({ ...buyStatus, isLoading: false });
        if (basket !== undefined) {
          setBasket(
            [...basket].map((object) => {
              if (object.price.symbol === item.price.symbol) {
                return {
                  ...object,
                  count: 0,
                };
              } else return object;
            })
          );
        }
        ToastAlert(response.msg, ToastType.SUCCESS);
        dispatch(getBalanceEvent());
      } else if (response.status === RESPONSE_ERROR) {
        ToastAlert(response.msg, ToastType.ERROR);
        setBuyStatus({ ...buyStatus, isLoading: false, error: response.msg });
      }
    } catch (ex) {
      ToastAlert(ErrorManager.handleRequestError(ex), ToastType.ERROR);
      setBuyStatus({
        ...buyStatus,
        isLoading: false,
        error: ErrorManager.handleRequestError(ex),
      });
    }
  }

  // ================================================================== //
  function validateForm(count) {
    if (count <= 0) {
      return false;
    }
    return true;
  }

  // ================================================================== //
  const counter = ({
    onPlus,
    onMinus,
    value,
  }: {
    onPlus: () => void;
    onMinus: () => void;
    value: number;
  }) => {
    const btnClass =
      "btn text-lg text-white border-[#22293d] bg-[#22293d] hover:border-[#394152] hover:bg-[#394152] no-animation";

    return (
      <div className="btn-group btn-group-vertical lg:btn-group-horizontal">
        <button className={btnClass} onClick={onMinus}>
          {t("holder.minus")}
        </button>
        <button className={clsx(btnClass, "w-12")}>{value}</button>
        <button className={btnClass} onClick={onPlus}>
          {t("holder.plus")}
        </button>
      </div>
    );
  };

  // ================================================================== //
  const actionBtn = (detail: Basket) => {
    let hasAction = true;
    let text = t("label.buy");
    const n = new Date();
    const now = moment(n).format("YYYY-MM-DD HH:mm:ss");
    const startDate = moment(props.startDate).format("YYYY-MM-DD HH:mm:ss");
    const endDate = moment(props.endDate).format("YYYY-MM-DD HH:mm:ss");

    if (props.startDate !== undefined) {
      if (now < startDate) {
        hasAction = false;
        text = t("label.giftcardNotStarted");
      }
    }
    if (props.endDate !== undefined) {
      if (now > endDate) {
        hasAction = false;
        text = t("label.giftcardEnded");
      }
    }

    if (props.availableCount === undefined || props.availableCount <= 0) {
      hasAction = false;
      text = t("label.giftcardEmpty");
    }

    return (
      <NomadBtn
        type={BtnType.secondary}
        isLoading={buyStatus.isLoading}
        className={"w-full h-12 place-items-center"}
        onClick={() => {
          if (hasAction) {
            if (validateForm(detail.count)) {
              buy(detail);
            } else {
              ToastAlert(t("validation.emptyCounter"), ToastType.WARNING);
            }
          }
        }}
      >
        {text}
      </NomadBtn>
    );
  };

  // ================================================================== //
  const priceDetails = (detail: Basket, index: number) => {
    return (
      <div className="w-full">
        <div className="mb-4">
          <ul className="price-list pt-4 mt-4 border-t border-b-color">
            <li className="flex items-center justify-between">
              <div className="left-side">
                <label className="text-red-700 font-bold">
                  {t("label.availableBalance")}:
                </label>
                <p className="text-white font-bold text-sm">
                  {StringUtility.numberToCurrency(detail.available, "")}{" "}
                  {detail.price.symbol}
                </p>
              </div>
              {props.urgPrice ? (
                <p className="text-white font-bold">
                  {t("holder.urg")}{" "}
                  {StringUtility.numberToCurrency(props.urgPrice)}
                </p>
              ) : (
                ""
              )}
            </li>
          </ul>
        </div>
        <div className="flex items-center">
          <div className="count flex items-center mr-3">
            {counter({
              onMinus: () => {
                if (basket !== undefined && detail.count > 0) {
                  setBasket(
                    [...basket].map((object) => {
                      if (object.price.symbol === detail.price.symbol) {
                        return {
                          ...object,
                          count: object.count - 1,
                        };
                      } else return object;
                    })
                  );
                }
              },
              value: detail.count,
              onPlus: () => {
                if (basket !== undefined && detail.count < 100) {
                  setBasket(
                    [...basket].map((object) => {
                      if (object.price.symbol === detail.price.symbol) {
                        return {
                          ...object,
                          count: object.count + 1,
                        };
                      } else return object;
                    })
                  );
                }
              },
            })}
          </div>
          {actionBtn(detail)}
        </div>
      </div>
    );
  };

  // ================================================================== //
  const CountdownSection = () => {
    let text = t("label.endDate");
    const date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let cntDate: Date = new Date();
    const startDate = moment(props.startDate).format("YYYY-MM-DD HH:mm:ss");
    const endDate = moment(props.endDate).format("YYYY-MM-DD HH:mm:ss");

    if (props.startDate !== undefined) {
      if (startDate > date) {
        text = t("label.startDate");
        cntDate = props.startDate;
      }
    }

    if (props.endDate !== undefined) {
      if (endDate < date) {
        text = t("label.endDate");
        cntDate = props.endDate;
      }
    }

    return (
      <div className="gift__valid-date flex items-center justify-end flex-col right-4 bottom-4 z-10">
        <p className="flex text-white font-bold mb-2">{text}</p>
        <div className="flex items-center relative">
          <NomadCountdown position="initial" theme="yellow" date={cntDate} />
        </div>
      </div>
    );
  };

  // ================================================================== //
  return (
    <div className="w-full py-5 relative grid grid-cols-1 mx-auto max-w-7xl">
      <div className="grid gap-10 lg:grid-cols-2 md:grid-cols-1">
        <div className="detail-l">
          <div className="detail-img relative p-px bg-detail overflow-hidden">
            <Transition
              appear={true}
              show={true}
              enter="transition-opacity duration-75"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <span className="trans absolute content-[''] h-12 w-12 bg-white blur-lg rounded-full"></span>
            </Transition>
            <div className="flex items-center justify-center h-full w-full bg-sec-black relative overflow-hidden p-0">
              <div className="img-content flex items-center justify-center h-full w-full">
                <img
                  className="relative h-full w-full min-h-[280px]"
                  src={`${URL_IMG_ROOT + props.photo}`}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="detail-r">
          <div className="detail-content relative">
            <div className="detail-header">
              <h1 className="text-white text-3xl font-bold pb-4 mb-4 border-b border-b-color">
                {props.name}
              </h1>
            </div>
            <div className="detail-main p-0 m-0">
              <div className="mb-5">
                <div className="flex items-center justify-between md:items-start sm:flex-col md:flex-row lg:flex-row">
                  {/* <div className="price-content"> */}
                  <div className="price md:mb-2 text-left text-white text-base min-w-[180px]">
                    <p className="flex text-white text-xs font-bold mb-3">
                      {t("label.price")}
                    </p>
                    <div className="flex items-center">
                      <URGCoin />
                      <div className="text-2xl ml-3">
                        {(props.price ?? []).map((value, key) => {
                          return <div>{`${value.price} ${value.symbol}`}</div>;
                        })}
                      </div>
                    </div>
                  </div>
                  {CountdownSection()}
                </div>
              </div>

              {basket?.map((item, index) => priceDetails(item, index))}

              <div className="description-content pt-5 mt-5 border-t border-b-color">
                <p className="text-custom-gray text-sm font-bold">
                  {props.description}
                </p>
              </div>
              <NomadToast />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCardDetail;
