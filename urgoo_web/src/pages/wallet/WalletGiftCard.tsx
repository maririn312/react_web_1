import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  RESPONSE_ERROR,
  RESPONSE_SUCCESS,
  URL_IMG_ROOT,
} from "../../app/appConst";
import NomadBtn, { BtnType } from "../../components/nomad/NomadBtn";
import { GiftMineDto } from "../../models/gift/GiftMineResponseDto";
import {
  giftMineList,
  giftMineReceivedList,
} from "../../service/giftMineApiClient";
import ErrorManager from "../../utility/ErrorManager";
import { TabTitle } from "../../utility/TabTitleUtility";
import MnTranslation from "../../i18n/mn/translation.json";
import { NomadLoadingIndicator } from "../../components/nomad/NomadLoadingIndicator";
import { giftCardUse, sendGiftCard } from "../../service/cardApiClient";
import NomadToast, {
  ToastAlert,
  ToastType,
} from "../../components/nomad/NomadToast";
import GiftCardSendDialog from "../dialog/GiftCardSendDialog";
import GiftCardUseDialog from "../dialog/GiftCardUseDialog";
import { GiftCardUseResponseDto } from "../../models/gift/GiftCardUseResponseDto";
import NomadPagination from "../../components/nomad/NomadPagination";

const WalletGiftCard = () => {
  const { t } = useTranslation();

  TabTitle(MnTranslation.mainTitle.walletGiftCard);

  const [isSendDialogOpen, setSendDialogOpen] = useState<boolean>(false);
  const [isQRDialogOpen, setQRDialogOpen] = useState<boolean>(false);

  const [selectedGiftCard, setSelectedGiftCard] = useState<GiftMineDto>();
  const [usedResponse, setUsedResponse] = useState<GiftCardUseResponseDto>();
  const [isUseLoading, setUseLoading] = useState<boolean>(false);
  const [isSendLoading, setSendLoading] = useState<boolean>(false);

  const [giftCard, setGiftCard] = useState({
    isLoading: false,
    error: "",
    size: 10,
    page: 0,
    totalPage: 0,
    currentPage: 0,
    mines: Array<GiftMineDto>(),
  });

  const [giftCardReceived, setGiftCardReceived] = useState({
    isLoading: false,
    error: "",
    size: 10,
    page: 0,
    totalPage: 0,
    currentPage: 0,
    mines: Array<GiftMineDto>(),
  });

  const [activeTable, setActiveTable] = useState({
    isGiftedActive: true,
    isPurchasedActive: false,
    isLotteryActive: false,
  });

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // ================================================================== //
  useEffect(() => {
    // getMineGift(0);
    getMineReceivedGift(0);
  }, []);

  useEffect(() => {
    getMineGift(0);
  }, [giftCard.totalPage]);

  // ================================================================== //
  async function giftcardUse(gcId: number, itemId: number) {
    setUseLoading(true);
    try {
      const response = await giftCardUse({ gcId: gcId, itemId: itemId });
      if (response.status === RESPONSE_SUCCESS) {
        setUsedResponse(response);
        setQRDialogOpen(true);
        getMineGift(giftCard.page);
        ToastAlert(response.msg, ToastType.SUCCESS);
      } else if (response.status === RESPONSE_ERROR) {
        ToastAlert(response.msg, ToastType.ERROR);
      }
      setUseLoading(false);
    } catch (ex) {
      ToastAlert(ErrorManager.handleRequestError(ex), ToastType.ERROR);
      setUseLoading(false);
    }
  }

  // ================================================================== //
  async function sendCard({
    gcId,
    itemId,
    phone,
  }: {
    gcId: number;
    itemId: number;
    phone: string;
  }) {
    setSendLoading(true);
    try {
      const response = await sendGiftCard({ gcId, itemId, phone });
      if (response.status === RESPONSE_SUCCESS) {
        getMineGift(giftCard.page);
        ToastAlert(response.msg, ToastType.SUCCESS);
      } else if (response.status === RESPONSE_ERROR) {
        ToastAlert(response.msg, ToastType.ERROR);
      }
      setSendDialogOpen(false);
      setSendLoading(false);
    } catch (ex) {
      ToastAlert(ErrorManager.handleRequestError(ex), ToastType.ERROR);
      setSendDialogOpen(false);
      setSendLoading(false);
    }
  }

  // ================================================================== //
  async function getMineGift(page: number) {
    setGiftCard({ ...giftCard, isLoading: true });
    try {
      const response = await giftMineList({
        page: page,
        size: giftCard.size,
      });
      if (response.status === RESPONSE_SUCCESS) {
        setGiftCard({
          ...giftCard,
          isLoading: false,
          totalPage: Math.ceil(response.total / giftCard.size),
          currentPage: response.page,
          mines: response.mines,
        });
      } else {
        setGiftCard({
          ...giftCard,
          isLoading: false,
          error: response.msg,
        });
      }
    } catch (error) {
      setGiftCard({
        ...giftCard,
        isLoading: false,
        error: ErrorManager.handleRequestError(error),
      });
    }
  }

  // ================================================================== //
  async function getMineReceivedGift(page: number) {
    setGiftCardReceived({ ...giftCardReceived, isLoading: true });
    try {
      const response = await giftMineReceivedList({
        page: page,
        size: giftCardReceived.size,
      });
      if (response.status === RESPONSE_SUCCESS) {
        setGiftCardReceived({
          ...giftCardReceived,
          isLoading: false,
          totalPage: Math.ceil(response.total / giftCardReceived.size),
          currentPage: response.page,
          mines: response.mines,
        });
      } else {
        setGiftCardReceived({
          ...giftCardReceived,
          isLoading: false,
          error: response.msg,
        });
      }
    } catch (error) {
      setGiftCardReceived({
        ...giftCardReceived,
        isLoading: false,
        error: ErrorManager.handleRequestError(error),
      });
    }
  }

  // ================================================================== //
  const thead = "text-pro-label text-xs font-bold text-left p-3";

  // ================================================================== //
  const lotteryTable = () => {
    return (
      <>
        <h3 className="relative text-xl font-semibold mb-4 text-sec-black mt-10">
          {t("title.myGiftLottery")}
        </h3>
        <div className="bg-white border border-tab-border rounded-lg shadow-table">
          <div className="relative overflow-x-auto">
            <table className="w-full table-auto border-spacing-y-0 border-spacing-x-px">
              <thead>
                <tr>
                  <th className={thead}>{t("label.picture")}</th>
                  <th className={thead}>{t("label.name")}</th>
                  <th className={thead}>{t("label.price")}</th>
                  <th className={thead}>{t("label.quantity")}</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </>
    );
  };

  // ================================================================== //
  const myReceivedTable = () => {
    return (
      <>
        <h3 className="relative text-xl font-semibold mb-4 text-sec-black mt-10">
          {t("title.myReceivedGiftCard")}
        </h3>

        <div className="bg-white border border-tab-border rounded-lg shadow-table">
          <div className="relative overflow-x-auto">
            <table className="w-full table-auto border-spacing-y-0 border-spacing-x-px">
              <thead>
                <tr>
                  <th className={thead}>{t("label.picture")}</th>
                  <th className={thead}>{t("label.name")}</th>
                  <th className={thead}>{t("label.price")}</th>
                  <th className={thead}>{t("label.quantity")}</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {giftCardReceived.mines.length < 0 ? (
                    <td
                      colSpan={5}
                      className="p-3 text-td font-semibold text-sm"
                    >
                      {t("label.empty")}
                    </td>
                  ) : giftCardReceived.isLoading ? (
                    <td
                      colSpan={5}
                      className="p-3 text-td font-semibold text-sm"
                    >
                      <div className="grid place-items-center w-full">
                        <NomadLoadingIndicator color="#09ffa7" />
                      </div>
                    </td>
                  ) : (
                    giftCardReceived.mines.map((mine, index) => {
                      return (
                        <tr
                          key={index}
                          className="bg-white odd:bg-tab even:bg-white font-semibold text-td"
                        >
                          {
                            <>
                              <td width={144} colSpan={1} className="p-3">
                                <img
                                  className="w-[120px]"
                                  src={`${URL_IMG_ROOT}/${mine.photo}`}
                                  alt=""
                                />
                              </td>
                              <td width={294} colSpan={1} className="p-3">
                                {mine.giftCardName} <br />
                                {mine.receivedUserPhoneNo && (
                                  <div className="mt-1">
                                    <span className="text-xs py-1 px-3 bg-receive-blue rounded-2xl text-white">
                                      {t("label.giftedBy")} -{" "}
                                      {mine.receivedUserPhoneNo}
                                    </span>
                                  </div>
                                )}
                              </td>
                              <td colSpan={1} className="p-3">
                                {mine.fiatBalance} <br /> {mine.fiatCode}
                              </td>
                              <td colSpan={1} className="p-3">
                                1
                              </td>
                              <td colSpan={1} className="p-3">
                                {/* {!mine.receivedUserPhoneNo && (
                                  
                                )} */}
                                <NomadBtn
                                  className="text-xs"
                                  type={BtnType.secondary}
                                  isLoading={isUseLoading}
                                  onClick={() => {
                                    giftcardUse(
                                      mine.giftCardId,
                                      mine.giftCardItemId
                                    );
                                  }}
                                >
                                  {t("label.toUse")}
                                </NomadBtn>
                              </td>
                            </>
                          }
                        </tr>
                      );
                    })
                  )}
                </>
              </tbody>
            </table>
          </div>
        </div>
        <NomadPagination
          key={1}
          onClick={(page: number) => {
            getMineReceivedGift(page);
          }}
          totalPage={giftCardReceived.totalPage}
          currentPage={giftCardReceived.currentPage}
        />
      </>
    );
  };

  // ================================================================== //
  const myGiftCardTable = () => {
    return (
      <>
        <h3 className="relative text-xl font-semibold mb-4 text-sec-black mt-10">
          {t("title.myGiftCard")}
        </h3>
        <div className="bg-white border border-tab-border rounded-lg shadow-table">
          <div className="relative overflow-x-auto">
            <table className="w-full table-auto border-spacing-y-0 border-spacing-x-px">
              <thead>
                <tr>
                  <th className={thead}>{t("label.picture")}</th>
                  <th className={thead}>{t("label.name")}</th>
                  <th className={thead}>{t("label.price")}</th>
                  <th className={thead}>{t("label.quantity")}</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {giftCard.mines.length < 0 ? (
                    <td
                      colSpan={5}
                      className="p-3 text-td font-semibold text-sm"
                    >
                      {t("label.empty")}
                    </td>
                  ) : giftCard.isLoading ? (
                    <td
                      colSpan={5}
                      className="p-3 text-td font-semibold text-sm"
                    >
                      <div className="grid place-items-center w-full">
                        <NomadLoadingIndicator color="#09ffa7" />
                      </div>
                    </td>
                  ) : (
                    giftCard.mines.map((mine, index) => {
                      return (
                        <tr
                          key={index}
                          className="bg-white odd:bg-tab even:bg-white font-semibold text-td"
                        >
                          {
                            <>
                              <td width={144} colSpan={1} className="p-3">
                                <img
                                  className="w-[120px]"
                                  src={`${URL_IMG_ROOT}/${mine.photo}`}
                                  alt=""
                                />
                              </td>
                              <td width={294} colSpan={1} className="p-3">
                                {mine.giftCardName} <br />
                                {mine.receivedUserPhoneNo && (
                                  <div className="mt-1">
                                    <span className="text-xs py-1 px-3 bg-receive-blue rounded-2xl text-white">
                                      {t("label.giftedBy")} -{" "}
                                      {mine.receivedUserPhoneNo}
                                    </span>
                                  </div>
                                )}
                              </td>
                              <td colSpan={1} className="p-3">
                                {mine.fiatBalance} <br /> {mine.fiatCode}
                              </td>
                              <td colSpan={1} className="p-3">
                                1
                              </td>
                              <td colSpan={1} className="p-3">
                                <div className="flex gap-2 place-items-center">
                                  {mine.seenDate === undefined &&
                                  mine.allowedForTheGift ? (
                                    <NomadBtn
                                      className="text-xs"
                                      type={BtnType.secondary}
                                      isLoading={isSendLoading}
                                      onClick={() => {
                                        setSelectedGiftCard(mine);
                                        setSendDialogOpen(true);
                                      }}
                                    >
                                      {t("action.send")}
                                    </NomadBtn>
                                  ) : (
                                    <></>
                                  )}
                                  <NomadBtn
                                    className="text-xs"
                                    isLoading={isUseLoading}
                                    type={BtnType.secondary}
                                    onClick={() => {
                                      giftcardUse(
                                        mine.giftCardId,
                                        mine.giftCardItemId
                                      );
                                    }}
                                  >
                                    {t("label.toUse")}
                                  </NomadBtn>

                                  {/* {!mine.receivedUserPhoneNo && (
                                    <NomadBtn
                                      className="text-xs"
                                      isLoading={isUseLoading}
                                      type={BtnType.secondary}
                                      onClick={() => {
                                        giftcardUse(
                                          mine.giftCardId,
                                          mine.giftCardItemId
                                        );
                                      }}
                                    >
                                      {t("label.toUse")}
                                    </NomadBtn>
                                  )} */}
                                </div>
                              </td>
                            </>
                          }
                        </tr>
                      );
                    })
                  )}
                </>
              </tbody>
            </table>
          </div>
        </div>
        <NomadPagination
          key={2}
          onClick={(page: number) => {
            getMineGift(page);
          }}
          totalPage={giftCard.totalPage}
          currentPage={giftCard.currentPage}
        />
      </>
    );
  };

  const data = [
    {
      label: t("label.giftedGiftCard"),
      content: myReceivedTable(),
    },
    {
      label: t("label.purchasedGiftCard"),
      content: myGiftCardTable(),
    },
    // {
    //   label: t("label.lotteryGiftCard"),
    //   content: lotteryTable(),
    // },
  ];

  // ================================================================== //
  return (
    <div>
      <div className="flex">
        {/* Loop through tab data and render button for each. */}
        {data.map((tab, idx) => {
          return (
            <button
              key={idx}
              className={`p-4 border-b-2 font-semibold transition-colors duration-300 gap-3 w-full ${
                idx === activeTabIndex
                  ? "border-b-2 border-bor-bottom bg-primary-green bg-opacity-10 text-black"
                  : "border-transparent text-status-detail"
              }`}
              onClick={() => {
                setActiveTabIndex(idx);
                if (idx === 0) {
                  activeTable.isLotteryActive = false;
                  activeTable.isPurchasedActive = false;
                  activeTable.isGiftedActive = true;
                } else if (idx === 1) {
                  activeTable.isLotteryActive = false;
                  activeTable.isPurchasedActive = true;
                  activeTable.isGiftedActive = false;
                } else if (idx === 2) {
                  activeTable.isLotteryActive = true;
                  activeTable.isPurchasedActive = false;
                  activeTable.isGiftedActive = false;
                }
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {activeTable.isGiftedActive ? myReceivedTable() : <div> </div>}
      {activeTable.isPurchasedActive ? myGiftCardTable() : <div> </div>}
      {/* {activeTable.isLotteryActive ? lotteryTable() : <div> </div>} */}
      <NomadToast />
      <GiftCardSendDialog
        isOpen={isSendDialogOpen}
        setIsOpen={setSendDialogOpen}
        action={(phone: string) => {
          sendCard({
            gcId: selectedGiftCard?.giftCardId ?? 0,
            itemId: selectedGiftCard?.giftCardItemId ?? 0,
            phone: phone,
          });
        }}
      />
      <GiftCardUseDialog
        isOpen={isQRDialogOpen}
        setIsOpen={setQRDialogOpen}
        giftcard={usedResponse}
      />
    </div>
  );
};

export default WalletGiftCard;
