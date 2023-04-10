import {
  TabsBodyStylesType,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { RESPONSE_SUCCESS } from "../../app/appConst";
import { HistoryDto } from "../../models/nft/NftHistory";
import { TransferDto } from "../../models/wallet/TokenHistoryResponseDto";
import {
  BalanceHistoryResponseDto,
  BalanceHistoryDto,
} from "../../models/account/BalanceHistoryResponseDto";
import { getNftHistory } from "../../service/cardApiClient";
import {
  walletBalanceHistory,
  walletTokenHistory,
} from "../../service/walletApiClient";
import ErrorManager from "../../utility/ErrorManager";
import StringUtility from "../../utility/StringUtility";
import NomadPagination from "../nomad/NomadPagination";
interface TabItemsProps {
  selected: string;
}

export enum Type {
  IN = "in",
  OUT = "out",
}

const WalletTabs = (props: TabItemsProps) => {
  const { t } = useTranslation();

  const [balance, setBalance] = useState({
    size: 10,
    page: 0,
    type: "",
    status: 0,
    totalPage: 0,
    currentPage: 0,
    error: "",
    isLoading: false,
    balance_history: Array<BalanceHistoryDto>(),
  });

  const [token, setToken] = useState({
    size: 10,
    page: 0,
    type: Type.IN,
    status: 0,
    totalPage: 0,
    currentPage: 0,
    symbol: "",
    transfers: Array<TransferDto>(),
    error: "",
    isLoading: false,
  });

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  useEffect(() => {
    if (props.selected === "urgx") {
      tokenHistory(token.type, 0);
    } else if (props.selected === "mnt") {
      balanceHistory(token.type, 0);
    }
  }, [props.selected]);

  async function balanceHistory(type: Type, page: number) {
    setBalance({ ...balance, isLoading: true });
    try {
      const response = await walletBalanceHistory({
        type: type,
        page: page,
        size: balance.size,
      });
      if (response.status === RESPONSE_SUCCESS) {
        setBalance({
          ...balance,
          isLoading: false,
          size: response.size,
          page: response.page,
          totalPage: Math.ceil(response.total / balance.size),
          type: type,
          balance_history: response.balance_history,
        });
      } else {
        setBalance({
          ...balance,
          isLoading: false,
          error: response.msg,
        });
      }
    } catch (error) {
      setBalance({
        ...balance,
        isLoading: false,
        error: ErrorManager.handleRequestError(error),
      });
    }
  }

  async function tokenHistory(type: Type, page: number) {
    setToken({ ...token, isLoading: true });
    try {
      const response = await walletTokenHistory({
        type: type,
        page: page,
        size: token.size,
      });
      if (response.status === RESPONSE_SUCCESS) {
        setToken({
          ...token,
          isLoading: false,
          page: response.page,
          size: response.size,
          currentPage: response.page,
          type: type,
          totalPage: Math.ceil(response.total / token.size),
          transfers: response.transfers,
        });
      } else {
        setToken({
          ...token,
          isLoading: false,
          error: response.msg,
        });
      }
    } catch (error) {
      setToken({
        ...token,
        isLoading: false,
        error: ErrorManager.handleRequestError(error),
      });
    }
  }

  const thead = "text-pro-label text-xs font-bold text-left p-3";

  const EmptyTable = () => {
    return (
      <tr className="bg-white text-sm odd:bg-tab even:bg-white font-semibold text-td">
        <td colSpan={5} className="text-center p-3">
          {t("label.emptyHistory")}
        </td>
      </tr>
    );
  };

  const Income = () => {
    return (
      <>
        <div className="relative overflow-x-auto">
          <table className="w-full table-auto border-spacing-y-0 border-spacing-x-px">
            <thead>
              <tr>
                <th className={thead}>{t("label.date")}</th>
                <th className={thead}>{t("label.fiat")}</th>
                <th className={thead}>{t("label.size")}</th>
                <th className={thead}>{t("label.where")}</th>
              </tr>
            </thead>
            <tbody>{TableIncome(props.selected)}</tbody>
          </table>
        </div>
      </>
    );
  };

  const TableIncome = (selected: string) => {
    if (selected === "urgx") {
      return token.transfers.length > 0
        ? token.transfers.map((item, idx) => {
            return (
              <tr
                key={idx}
                className="bg-white text-sm odd:bg-tab even:bg-white font-semibold text-td"
              >
                {
                  <>
                    <td className="p-3">
                      {StringUtility.getDateAsLocal(
                        new Date(item.createdDate),
                        false
                      )}
                    </td>
                    <td className="p-3">{t("label.urgCoin")}</td>
                    <td className="p-3">
                      {StringUtility.numberToCurrency(item.amount, "")}
                    </td>
                    <td className="p-3">{item.from}</td>
                    <td className="p-3">{}</td>
                  </>
                }
              </tr>
            );
          })
        : EmptyTable();
    } else if (selected === "mnt") {
      return balance.balance_history.length > 0
        ? balance.balance_history.map((item, idx) => {
            return (
              <tr
                key={idx}
                className="bg-white text-sm odd:bg-tab even:bg-white font-semibold text-td"
              >
                {
                  <>
                    <td className="p-3">
                      {StringUtility.getDateAsLocal(
                        new Date(item.created_date),
                        false
                      )}
                    </td>
                    <td className="p-3">{item.currency}</td>
                    <td className="p-3">
                      {StringUtility.numberToCurrency(item.amount, "")}
                    </td>
                    <td className="p-3"></td>
                  </>
                }
              </tr>
            );
          })
        : EmptyTable();
    }
    return <></>;
  };

  const TableWithdraw = (selected: string) => {
    if (selected === "urgx") {
      return token.transfers.length > 0
        ? token.transfers.map((item, idx) => {
            return (
              <tr
                key={idx}
                className="bg-white text-sm odd:bg-tab even:bg-white font-semibold text-td"
              >
                {
                  <>
                    <td className="p-3">
                      {StringUtility.getDateAsLocal(
                        new Date(item.createdDate),
                        false
                      )}
                    </td>
                    <td className="p-3">{t("label.urgCoin")} </td>
                    <td className="p-3">
                      {StringUtility.numberToCurrency(item.amount, "")}
                    </td>
                    <td className="p-3">{}</td>
                    <td className="p-3"></td>
                  </>
                }
              </tr>
            );
          })
        : EmptyTable();
    } else if (selected === "mnt") {
      return balance.balance_history.length > 0
        ? balance.balance_history.map((item, idx) => {
            return (
              <tr
                key={idx}
                className="bg-white text-sm odd:bg-tab even:bg-white font-semibold text-td"
              >
                {
                  <>
                    <td className="p-3">
                      {StringUtility.getDateAsLocal(
                        new Date(item.created_date),
                        false
                      )}
                    </td>
                    <td className="p-3">{item.currency}</td>
                    <td className="p-3">
                      {StringUtility.numberToCurrency(item.amount, "")}
                    </td>
                  </>
                }
              </tr>
            );
          })
        : EmptyTable();
    }
    return <></>;
  };

  const Withdraw = () => {
    return (
      <div className="relative overflow-x-auto">
        <table className="w-full table-auto border-spacing-y-0 border-spacing-x-px">
          <thead>
            <tr>
              <th className={thead}>{t("label.date")}</th>
              <th className={thead}>{t("label.fiat")}</th>
              <th className={thead}>{t("label.size")}</th>
              <th className={thead}>{t("label.status")}</th>
              <th className={thead}>{t("label.information")}</th>
            </tr>
          </thead>
          <tbody>{TableWithdraw(props.selected)}</tbody>
        </table>
      </div>
    );
  };

  const data = [
    {
      label: t("label.income"),
      content: Income(),
    },
    {
      label: t("label.withdraw"),
      content: Withdraw(),
    },
  ];

  return (
    <>
      <div className="bg-white border border-tab-border rounded-lg shadow-table grid">
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
                // Change the active tab on click.
                onClick={() => {
                  setActiveTabIndex(idx);
                  if (idx === 0) {
                    if (token.type != Type.IN && props.selected === "urgx") {
                      tokenHistory(Type.IN, 0);
                    }
                    if (balance.type != Type.IN && props.selected === "mnt") {
                      balanceHistory(Type.IN, 0);
                    }
                  } else if (idx === 1) {
                    if (token.type != Type.OUT && props.selected === "urgx") {
                      tokenHistory(Type.OUT, 0);
                    }
                    if (balance.type != Type.OUT && props.selected === "mnt") {
                      balanceHistory(Type.OUT, 0);
                    }
                  }
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        {/* Show active tab content. */}
        <div>
          <div>{data[activeTabIndex].content}</div>
        </div>
      </div>
      <div className="py-10 w-full grid justify-items-stretch">
        <div className="justify-self-center">
          {props.selected === "urgx" && (
            <NomadPagination
              onClick={(page: number) => {
                tokenHistory(token.type, page);
              }}
              totalPage={token.totalPage}
              currentPage={token.currentPage}
            />
          )}
          {props.selected === "mnt" && (
            <NomadPagination
              onClick={(page: number) => {
                balanceHistory(token.type, page);
              }}
              totalPage={balance.totalPage}
              currentPage={balance.currentPage}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default WalletTabs;
