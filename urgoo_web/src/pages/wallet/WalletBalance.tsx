import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import eyeHide from "../../assets/img/eye_hide_icon.svg";
import eyeOpen from "../../assets/img/eye_open_icon.svg";
import walletIcon from "../../assets/img/wallet_icon.svg";
import {
  getBalanceEvent,
  getBalanceState,
} from "../../redux/Wallet/balanceSlice";
import { fiatMineEvent, fiatMineState } from "../../redux/Wallet/fiatMineSlice";
import { getFiatMine } from "../../service/walletApiClient";
import urgIcon from "../../assets/icons/urg_coin.webp";
import mntIcon from "../../assets/icons/mnt.svg";
import { Link } from "react-router-dom";
import downIcon from "../../assets/img/down_icon.svg";
import upIcon from "../../assets/img/up_icon.svg";
import { TabTitle } from "../../utility/TabTitleUtility";
import MnTranslation from "../../i18n/mn/translation.json";
import StringUtility from "../../utility/StringUtility";

const WalletBalance = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch<any>();
  const getBalances = useAppSelector(getBalanceState);
  const fiatMine = useAppSelector(fiatMineState);
  const [toggleEye, setToggleEye] = useState(false);

  TabTitle(MnTranslation.mainTitle.walletBalance);

  useEffect(() => {
    if (fiatMine.status === "empty") {
      dispatch(fiatMineEvent());
    }
  }, [fiatMine.status]);

  useEffect(() => {
    if (getBalances.status === "empty") {
      dispatch(getBalanceEvent());
    }
  }, [getBalances.status]);

  const thead = "text-pro-label text-xs font-bold text-left p-3";
  const coin = getBalances.balances;
  const fiat = fiatMine.balances;

  return (
    <>
      <div className="relative p-4 bg-balance rounded-lg mb-4">
        <button
          className="balance__eye flex items-center justify-center absolute top-1/2 right-5 h-10 w-10 bg-balance-eye -translate-y-1/2 rounded-lg cursor-pointer"
          onClick={() => setToggleEye((toggleEye) => !toggleEye)}
        >
          <img
            className="object-contain flex w-6 h-6"
            src={toggleEye ? eyeOpen : eyeHide}
            alt=""
          />
        </button>
        <div className="grid gap-2 grid-cols-24px">
          <img src={walletIcon} className="flex h-6 w-6" />
          <div>
            <label className="mb-0.5 font-semibold text-xs text-count">
              {t("label.totalBalance")}
            </label>
            <h4 className="mt-5 text-lg font-semibold">
              {fiat?.map((item, idx) => {
                return (
                  <span>
                    {toggleEye ? <>{StringUtility.numberToCurrency(item.balance, '')}</> : <>{t("label.toggleStar")} </>}
                    {item.code} /
                  </span>
                );
              })}
              {coin?.map((item, idx) => {
                return (
                  <span>
                    {" "}
                    {toggleEye ? <>{StringUtility.numberToCurrency(item.available, '')}</> : <>{t("label.toggleStar")} </>} {item.code}
                  </span>
                );
              })}
            </h4>
          </div>
        </div>
      </div>
      <h3 className="relative text-sec-black text-xl font-medium mb-4 flex items-center justify-between">
        {t("label.balance")}
      </h3>
      <div className="bg-white border border-tab-border rounded-lg shadow-table">
        <div className="relative overflow-x-auto">
          <table className="w-full table-auto border-spacing-y-0 border-spacing-x-px">
            <thead>
              <tr>
                <th className={thead}>{t("label.fiat")}</th>
                <th className={thead}>{t("label.name")}</th>
                <th className={thead}>{t("label.balance")}</th>
                <th className={thead}>{t("label.action")}</th>
              </tr>
            </thead>
            <tbody>
              {coin?.map((item, idx) => {
                return (
                  <tr
                    key={idx}
                    className="bg-white odd:bg-tab even:bg-white font-semibold text-td"
                  >
                    {
                      <>
                        <td className="p-3">
                          <div className="flex items-center">
                            <img
                              className="h-6 w-6 mr-1.5"
                              src={urgIcon}
                              alt=""
                            />
                            <h4>{item.code}</h4>
                          </div>
                        </td>
                        <td className="p-3">{item.name}</td>
                        <td className="p-3">{StringUtility.numberToCurrency(item.available, '')}</td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <Link
                              className="flex items-center cursor-pointer"
                              to={"/wallet/income"}
                            >
                              <img src={downIcon} alt="" />
                              <span>{t("label.income")}</span>
                            </Link>
                            <Link
                              className="ml-5 flex items-center cursor-pointer"
                              to={"/wallet/withdraw"}
                            >
                              <img src={upIcon} alt="" />
                              <span>{t("label.withdraw")}</span>
                            </Link>
                          </div>
                        </td>
                      </>
                    }
                  </tr>
                );
              })}
              {fiat?.map((item, idx) => {
                return (
                  <tr
                    key={idx}
                    className="bg-white odd:bg-tab even:bg-white font-semibold text-td"
                  >
                    {
                      <>
                        <td className="p-3">
                          <div className="flex items-center">
                            <img
                              className="h-6 w-6 mr-1.5"
                              src={mntIcon}
                              alt=""
                            />
                            <h4>{item.code}</h4>
                          </div>
                        </td>
                        <td className="p-3">{item.name}</td>
                        <td className="p-3">{StringUtility.numberToCurrency(item.balance, '')}</td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <Link
                              className="flex items-center cursor-pointer"
                              to={"/wallet/income"}
                            >
                              <img src={downIcon} alt="" />
                              <span>{t("label.income")}</span>
                            </Link>
                            <Link
                              className="ml-5 flex items-center cursor-pointer"
                              to={"/wallet/withdraw"}
                            >
                              <img src={upIcon} alt="" />
                              <span>{t("label.withdraw")}</span>
                            </Link>
                          </div>
                        </td>
                      </>
                    }
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default WalletBalance;
