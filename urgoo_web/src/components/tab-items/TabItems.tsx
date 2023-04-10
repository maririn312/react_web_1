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
import { getNftHistory } from "../../service/cardApiClient";
import ErrorManager from "../../utility/ErrorManager";
interface TabItemsProps {
  smartContract?: string;
  bsId: number;
  code: string;
}

const TabItems = (props: TabItemsProps) => {
  const { t } = useTranslation();
  let { nftId, nftCode } = useParams();

  const [history, setHistory] = useState({
    isLoading: false,
    error: "",
    nftId,
    nftCode,
    page: 0,
    size: 10,
    histories: Array<HistoryDto>(),
  });

  const getNftHistories = async () => {
    if (nftId === undefined && nftCode === undefined) return;
    setHistory({ ...history, isLoading: true, error: "" });
    try {
      const response = await getNftHistory({
        page: history.page,
        size: history.size,
        id: nftId,
        code: nftCode,
      });

      if (response.status === RESPONSE_SUCCESS) {
        setHistory({
          ...history,
          isLoading: false,
          error: "",
          histories: response.histories,
        });
      } else {
        setHistory({ ...history, isLoading: false, error: response.msg });
      }
    } catch (error) {
      setHistory({
        ...history,
        isLoading: false,
        error: ErrorManager.handleRequestError(error),
      });
    }
  };

  useEffect(() => {
    getNftHistories();
  }, []);

  const Histories = () => {
    return (
      <div className="w-full pt-5">
        <div className="flex flex-col">
          {(history.histories ?? []).map((history, ind) => {
            return (
              <div
                key={ind}
                className="grid items-center mb-3 grid-cols-34px gap-2 p-2 bg-creator border border-dashed border-creator-b rounded-lg cursor-pointer"
              >
                <div className="creator">
                  <Link to="">
                    <span className="text-white text-sm cursor-pointer font-medium">
                      {t("label.to")} {history.toNickname}
                    </span>
                  </Link>
                  <p className="text-creater-desc text-xs cursor-pointer">
                    {t("label.from")} {history.fromNickname}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const breakWordEl = (
    <>
      <span className="text-creater-desc">{t("tabItem.smartContract")}</span>
      <span className="truncate ... ml-1 text-white underline hover:cursor-pointer">
        {props.smartContract}
      </span>
    </>
  );

  const data = [
    {
      label: t("tabItem.usage"),
      content: breakWordEl,
    },
    {
      label: t("tabItem.history"),
      content: Histories(),
    },
  ];

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div>
      <div className="flex space-x-3 ">
        {/* Loop through tab data and render button for each. */}
        {data.map((tab, idx) => {
          return (
            <button
              key={idx}
              className={`py-2 border-b-2 transition-colors duration-300 gap-3 ${
                idx === activeTabIndex
                  ? "border-custom-blue text-white"
                  : "border-transparent text-status-detail"
              }`}
              // Change the active tab on click.
              onClick={() => setActiveTabIndex(idx)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {/* Show active tab content. */}
      <div className="py-4">
        <div>{data[activeTabIndex].content}</div>
      </div>
    </div>
  );
};

export default TabItems;
