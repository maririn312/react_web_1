import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RESPONSE_SUCCESS } from "../../app/appConst";
import NftMine from "../../components/nft-mine/NftMine";
import { MineDto, NftMineResponseDto } from "../../models/nft/NftMine";
import { getNftMine } from "../../service/nftMineApiClient";
import ErrorManager from "../../utility/ErrorManager";
import { TabTitle } from "../../utility/TabTitleUtility";
import MyNftEmpty from "./MyNftEmpty";
import MnTranslation from "../../i18n/mn/translation.json";

const MyNftCollected = () => {
  const [nftMine, setNftMine] = useState({
    size: 10,
    page: 0,
    error: "",
    isLoading: false,
    mine: Array<MineDto>(),
  });

  TabTitle(MnTranslation.mainTitle.myNFTCollected);

  async function getMine() {
    setNftMine({ ...nftMine, isLoading: true });
    try {
      const response = await getNftMine({
        page: nftMine.page,
        size: nftMine.size,
      });
      if (response.status === RESPONSE_SUCCESS) {
        setNftMine({
          ...nftMine,
          isLoading: false,
          mine: response.mine,
        });
      } else {
        setNftMine({
          ...nftMine,
          isLoading: false,
          error: response.msg,
        });
      }
    } catch (error) {
      setNftMine({
        ...nftMine,
        isLoading: false,
        error: ErrorManager.handleRequestError(error),
      });
    }
  }

  useEffect(() => {
    getMine();
  }, []);

  return (
    <>
      {nftMine.mine.length === 0 ? (
        <MyNftEmpty />
      ) : (
        <div className="w-full">
          <div className="grid gap-6 sm:grid-cols-2 grid-cols-1">
            {nftMine.mine.map((el, i) => {
              return (
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
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default MyNftCollected;
