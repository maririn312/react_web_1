import React, { ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NomadSelect from "../../components/nomad/NomadSelect";
import walletIcon from "../../assets/img/wallet_icon.svg";
import { useAppSelector } from "../../app/hooks";
import {
  getBalanceEvent,
  getBalanceState,
} from "../../redux/Wallet/balanceSlice";
import {
  balanceCharge,
  getBalance,
  getFiatMine,
} from "../../service/walletApiClient";
import urgIcon from "../../assets/icons/urg_coin.webp";
import mntIcon from "../../assets/icons/mnt.svg";
import Select, {
  components,
  SingleValueProps,
  OptionProps,
} from "react-select";
import { ValueType } from "rc-cascader/lib/Cascader";
import { fiatMineEvent, fiatMineState } from "../../redux/Wallet/fiatMineSlice";
import { useDispatch } from "react-redux";
import { RESPONSE_SUCCESS } from "../../app/appConst";
import { BankChargeDto } from "../../models/wallet/BalanceChargeResponseDto";
import ErrorManager from "../../utility/ErrorManager";
import { BalanceDto } from "../../models/account/BalanceResponseDto";
import QRCode from "react-qr-code";
import {
  FiatBalanceDto,
  WalletFiatBalanceDto,
} from "../../models/wallet/WalletFiatBalanceDto";
import { WalletBalanceDto } from "../../models/wallet/WalletBalanceResponseDto";
import golomtIcon from "../../assets/icons/golomt_bank.svg";
import copyIcon from "../../assets/icons/copy_icon.svg";
import { TabTitle } from "../../utility/TabTitleUtility";
import MnTranslation from "../../i18n/mn/translation.json";
import StringUtility from "../../utility/StringUtility";

export enum Type {
  URGX = "urgx",
  MNT = "mnt",
}

interface SelectType {
  value: string;
  text: string;
  icon: string;
}

const WalletIncome = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<any>();
  const getBalances = useAppSelector(getBalanceState);
  const getFiat = useAppSelector(fiatMineState);

  TabTitle(MnTranslation.mainTitle.walletIncome);

  const [selectedOption, setSelectedOption] = useState<SelectType>({
    value: Type.URGX,
    text: t("label.historyURG"),
    icon: urgIcon,
  });

  const [banks, setBanks] = useState({
    isLoading: false,
    error: "",
    statement: "",
    banks: Array<BankChargeDto>(),
  });

  // ================================================================== //
  useEffect(() => {
    if (getBalances.address === undefined) {
      dispatch(getBalanceEvent());
    }
  }, [getBalances.address]);

  // ================================================================== //
  useEffect(() => {
    if (getFiat.balances === undefined) {
      dispatch(fiatMineEvent());
    }
    mntBalanceCharge();
  }, [getFiat.balances]);

  // ================================================================== //
  function handleChange(e) {
    setSelectedOption(e);
  }

  // ================================================================== //
  const fiatBalanceAmount = () => {
    if (selectedOption?.value === Type.MNT) {
      return (
        <div className="font-semibold mt-5">
          {getFiat.balances?.map((balance, idx) => {
            return (
              <>
                <p className="text-lg ">{StringUtility.numberToCurrency(balance.balance)}</p>
                <p className="text-base">{balance.code}</p>
              </>
            );
          })}
        </div>
      );
    } else if (selectedOption?.value === Type.URGX) {
      return (
        <div className="font-semibold mt-5">
          {getBalances.balances?.map((balance, idx) => {
            return (
              <>
                <p className="text-lg ">{StringUtility.numberToCurrency(balance.available)}</p>
                <p className="text-base">{balance.code}</p>
              </>
            );
          })}
        </div>
      );
    }
  };

  // ================================================================== //
  const beforeCopy =
    "before:absolute before:content-[''] before:top-1 before:left-0 before:h-4 before:w-4 before:bg-white before:border-2 before:border-pro-label before:z-20";
  const afterCopy =
    "after:absolute after:content-[''] after:top-0 after:left-1 after:h-4 after:w-4 after:bg-white after:border-2 after:border-pro-label after:z-10";
  const thead = "text-pro-label text-xs font-bold text-left p-3";

  // ================================================================== //
  const selectData: SelectType[] = [
    {
      value: Type.URGX,
      text: t("label.historyURG"),
      icon: urgIcon,
    },
    {
      value: Type.MNT,
      text: t("label.historyMNT"),
      icon: mntIcon,
    },
  ];

  // ================================================================== //
  async function mntBalanceCharge() {
    setBanks({ ...banks, isLoading: true });
    try {
      const response = await balanceCharge();
      if (response.status === RESPONSE_SUCCESS) {
        setBanks({
          ...banks,
          isLoading: false,
          statement: response.statement,
          banks: response.banks,
        });
      } else {
        setBanks({
          ...banks,
          isLoading: false,
          error: response.msg,
        });
      }
    } catch (error) {
      setBanks({
        ...banks,
        isLoading: false,
        error: ErrorManager.handleRequestError(error),
      });
    }
  }

  // ================================================================== //
  const SingleValue = (singleValueProps: SingleValueProps<SelectType>) => {
    const {
      data: { value, text, icon },
    } = singleValueProps;

    return (
      <components.SingleValue {...singleValueProps}>
        <span className="flex items-center py-2">
          {icon && <img height={28} width={28} src={icon} alt={value} />}
          <span className="ml-2">{text}</span>
        </span>
      </components.SingleValue>
    );
  };

  // ================================================================== //
  const Option = (optionProps: OptionProps<SelectType>) => {
    const { data } = optionProps;
    return (
      <components.Option {...optionProps}>
        <span className="flex items-center py-2">
          {data.icon && (
            <img height={28} width={28} src={data.icon} alt={data.value} />
          )}
          <span className="ml-2">{data.text}</span>
        </span>
      </components.Option>
    );
  };

  // ================================================================== //
  const FiatContent = () => {
    return (
      <>
        <div className="alert_notice border border-alert flex bg-alert-bg rounded-lg p-4">
          <p className="font-semibold text-black">
            {t("description.balanceNotice")}
          </p>
        </div>
        <div className="mt-6 ">
          <div className="grid p-4 grid-cols-44px items-center border border-tab-border rounded-lg">
            <h2 className="text-sm font-semibold px-3 overflow-x-auto text-black">
              {t("label.getBankAccount")}
            </h2>
            <br />
            {banks.banks.map((bank, indx) => {
              return (
                <div className="my-6 relative">
                  <div className="grid gap-6 grid-cols-4">
                    <div className="border  border-sec-black flex flex-col items-center text-center justify-start p-4 cursor-pointer">
                      <div className="w-11 h-11 mb-2.5">
                        <img className="w-full" src={golomtIcon} alt="" />
                      </div>
                      <a>{bank.bankName}</a>
                    </div>
                  </div>
                  <div className="relative bank_content mt-2.5">
                    <ul>
                      <li className="flex items-center justify-between">
                        <div>
                          <label className="text-xs font-medium text-count">
                            {t("label.accountNo")}
                          </label>
                          <p>{bank.accountNo}</p>
                        </div>
                        <div className="flex items-center cursor-pointer text-count">
                          <span className="flex w-3.5 h-3.5 mr-1.5 ">
                            <img
                              className="object-cover"
                              src={copyIcon}
                              alt=""
                            />
                          </span>
                          {t("label.copy")}
                        </div>
                      </li>

                      <li className="flex  items-center justify-between mt-4 border-t border-dashed border-tab-border">
                        <div className="mt-4">
                          <label className="text-xs font-medium text-count">
                            {t("label.bankAccountName")}
                          </label>
                          <p>{bank.accountName}</p>
                        </div>
                        <div className="flex items-center cursor-pointer text-count">
                          <span className="flex w-3.5 h-3.5 mr-1.5 ">
                            <img
                              className="object-cover"
                              src={copyIcon}
                              alt=""
                            />
                          </span>
                          {t("label.copy")}
                        </div>
                      </li>
                      <li className="flex items-center justify-between mt-4 border-t border-dashed border-tab-border">
                        <div className="mt-4">
                          <label className="text-xs font-medium text-count">
                            {t("label.transitionValue")}
                          </label>
                          <p>{banks.statement}</p>
                        </div>
                        <div className="flex items-center cursor-pointer text-count">
                          <span className="flex w-3.5 h-3.5 mr-1.5 ">
                            <img
                              className="object-cover"
                              src={copyIcon}
                              alt=""
                            />
                          </span>
                          {t("label.copy")}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  // ================================================================== //
  const TokenContent = () => {
    return (
      <>
        <div className="alert_notice border border-alert flex bg-alert-bg rounded-lg p-4">
          <p className="font-semibold text-black">
            {t("description.incomeNotice")}
          </p>
        </div>
        <div className="mt-6">
          <div className="grid grid-cols-44px items-center border border-tab-border rounded-lg">
            <h2 className="text-sm font-semibold px-3 overflow-x-auto text-black">
              {getBalances.address}
            </h2>
            <div className="relative flex items-center justify-center h-10 border-l cursor-pointer">
              <span
                className={`relative flex items-center justify-center h-5 w-5 ${beforeCopy} ${afterCopy}`}
              ></span>
            </div>
          </div>
          <div className="flex items-center justify-center pt-6">
            <QRCode
              width={200}
              height={200}
              value={`${getBalances.address}`}
            ></QRCode>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <h3 className="relative text-xl font-semibold mb-4 text-sec-black">
        {t("label.income")}
      </h3>
      <div className="bg-white border border-tab-border rounded-lg shadow-table grid">
        <div className="p-10">
          <label className="flex text-pro-label font-semibold mb-1.5 text-sm">
            {t("label.enterIncome")}
          </label>
          {/* <NomadSelect
          
            name="income"
            key="income"
            data={
              new Map<string, string>(
                SelectType.map((item, idx) => {
                  return [item.code, item.name];
                })
              )
            }
          /> */}
          <Select
            value={selectedOption}
            options={selectData}
            defaultValue={selectData}
            onChange={handleChange}
            isSearchable={false}
            components={{ SingleValue, Option }}
          />

          <div className="mt-7 grid ">
            <div className=" border border-tab-border rounded-lg shadow-table grid">
              <div className="p-5">
                <div className="grid gap-5 grid-cols-3">
                  <div className="grid grid-cols-24px gap-2.5 ">
                    <img className="flex h-6 w-6" src={walletIcon} />
                    <div>
                      <label className="text-count text-xs font-semibold mb-0.5">
                        {t("label.totalBalance")}
                      </label>
                      {fiatBalanceAmount()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-10 border-t border-tab-border">
          {selectedOption?.value === Type.URGX && TokenContent()}
          {selectedOption?.value === Type.MNT && FiatContent()}
        </div>
      </div>
      {/* <h3 className="mt-10 relative text-sec-black text-xl font-semibold mb-4 flex items-center justify-between">
        {t("label.lastIncomeHistory")}
        <a className="text-card text-sm cursor-pointer">
          {t("action.seeAllHistory")}
        </a>
      </h3>
      <div className="bg-white border border-tab-border rounded-lg shadow-table">
        <div className="relative overflow-x-auto">
          <table className="w-full table-auto border-spacing-y-0 border-spacing-x-px">
            <thead>
              <tr>
                <th className={thead}>{t("label.date")}</th>
                <th className={thead}>{t("label.fiat")}</th>
                <th className={thead}>{t("label.size")}</th>
                <th className={thead}>{t("label.quantity")}</th>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
            </tbody>
          </table>
        </div>
      </div> */}
    </>
  );
};

export default WalletIncome;
