import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { RESPONSE_SUCCESS } from "../../app/appConst";
import { CollectedByNicknameResponseDto } from "../../models/creator/CollectedByNicknameResponseDto";
import {
  getCreatedByNicknameResponseDto,
  NftDto,
} from "../../models/creator/CreatedByNicknameResponseDto";
import MyNftEmpty from "../../pages/my-nft/MyNftEmpty";
import {
  getCollectedByNickname,
  getCreatedByNickname,
} from "../../service/creatorApiClient";
import ErrorManager from "../../utility/ErrorManager";
import NftMine from "../nft-mine/NftMine";
import NomadPagination from "../nomad/NomadPagination";

// export enum Type {
//   COLLECTED = "collected",
//   CREATED = "created",
// }

interface CreatorProps {
  nickname: string;
}

const CreatorTabs = (props: CreatorProps) => {
  const { t } = useTranslation();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [collected, setCollected] = useState({
    error: "",
    isLoading: false,
    size: 10,
    page: 0,
    total: 0,
    mine: Array<CollectedByNicknameResponseDto>(),
  });

  const [created, setCreated] = useState({
    error: "",
    isLoading: false,
    page: 0,
    size: 0,
    total: 0,
    nfts: Array<NftDto>(),
  });

  useEffect(() => {
    if (activeTabIndex === 0) {
      collectedByNickname();
    } else if (activeTabIndex === 1) {
      createdByNickname();
    }
  }, [activeTabIndex]);

  async function collectedByNickname() {
    setCollected({ ...collected, isLoading: true });
    try {
      const response = await getCollectedByNickname({
        nickname: props.nickname,
        page: collected.page,
        size: collected.size,
      });
      if (response.status === RESPONSE_SUCCESS) {
        setCollected({
          ...collected,
          isLoading: false,
          mine: response.mine,
        });
      } else {
        setCollected({
          ...collected,
          isLoading: false,
          error: response.msg,
        });
      }
    } catch (error) {
      setCollected({
        ...collected,
        isLoading: false,
        error: ErrorManager.handleRequestError(error),
      });
    }
  }

  async function createdByNickname() {
    setCreated({ ...created, isLoading: true });
    try {
      const response = await getCreatedByNickname({
        nickname: props.nickname,
      });
      if (response.status === RESPONSE_SUCCESS) {
        setCreated({
          ...created,
          isLoading: false,
          page: response.page,
          size: response.size,
          total: response.total,
          nfts: response.nfts,
        });
      } else {
        setCreated({
          ...created,
          isLoading: false,
          error: response.msg,
        });
      }
    } catch (error) {
      setCreated({
        ...created,
        isLoading: false,
        error: ErrorManager.handleRequestError(error),
      });
    }
  }

  const Collected = () => {
    return (
      <>
        {collected.mine.length === 0 ? (
          <MyNftEmpty />
        ) : (
          <div className="w-full">
            <div className="grid gap-6 sm:grid-cols-2 grid-cols-1">
              {collected.mine.map((item, i) => {
                return (
                  //   <Link to={`/nft/list/${item.}/${item.code}`}>
                  //     <NftMine
                  //       name={item.name}
                  //       key={i}
                  //       photo={item.photo}
                  //       likes={item.likes}
                  //       shares={item.shares}
                  //       creator={item.creator}
                  //     />
                  //   </Link>
                  <div>Collected</div>
                );
              })}
            </div>
          </div>
        )}
      </>
    );
  };

  const Created = () => {
    return (
      <>
        {created.nfts.length === 0 ? (
          <MyNftEmpty />
        ) : (
          <div className="w-full">
            <div className="grid gap-6 sm:grid-cols-2 grid-cols-1">
              {created.nfts.map((el, i) => {
                return (
                  <>
                    <Link to={`/nft/list/${el.bsId}/${el.code}`}>
                      <NftMine
                        name={el.name}
                        key={i}
                        photo={el.photo}
                        likes={el.likes}
                        shares={el.shares}
                        creator={el.creator}
                      />
                    </Link>
                  </>
                );
              })}
            </div>
          </div>
        )}
      </>
    );
  };

  const data = [
    {
      label: t("label.collected"),
      content: Collected(),
    },
    {
      label: t("label.created"),
      content: Created(),
    },
  ];

  return (
    <div>
      <div className="flex gap-7">
        {data.map((tab, idx) => {
          return (
            <button
              key={idx}
              className={`py-2 border-b-2 text-base transition-colors duration-300 gap-3 ${
                idx === activeTabIndex
                  ? "border-custom-blue text-white"
                  : "border-transparent text-status-detail"
              }`}
              onClick={() => setActiveTabIndex(idx)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="w-full py-10 pt-5">{data[activeTabIndex].content}</div>
    </div>
  );
};

export default CreatorTabs;
