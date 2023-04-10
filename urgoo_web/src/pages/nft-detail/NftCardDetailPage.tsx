import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NftCardDetail from "../../components/nft-card-detail/NftCardDetail";
import { NftCardDetailListDto } from "../../models/nft/NftCardDetailList";
import { getNftCardDetailById } from "../../service/cardApiClient";
import ErrorManager from "../../utility/ErrorManager";
import { TabTitle } from "../../utility/TabTitleUtility";
import MnTranslation from "../../i18n/mn/translation.json";

const NftCardDetailPage = () => {
  let { nftId, nftCode } = useParams();
  
  TabTitle(MnTranslation.mainTitle.nftCardDetail);

  const [item, setItem] = useState({
    nftId,
    nftCode,
    error: "",
    items: {} as NftCardDetailListDto,
  });

  useEffect(() => {
    getNftCardDetail();
  }, []);
  
  async function getNftCardDetail() {
    if (nftId === undefined && nftCode === undefined) return;

    try {
      const response = await getNftCardDetailById({
        id: nftId,
        code: nftCode,
      });
      setItem({ ...item, error: "", items: response });
    } catch (error) {
      setItem({ ...item, error: ErrorManager.handleRequestError(error) });
    }
  }

  const data = item.items;

  return (
    <div className="w-[86vw] py-12 sm:px-20 relative grid grid-cols-1 mx-auto max-w-7xl">
      <NftCardDetail
        smartContract={data.smartContract}
        name={data.name}
        photo={data.photo}
        type={data.type}
        type_name={data.type_name}
        seen={data.seen}
        bsId={data.bsId}
        key={data.bsId}
        code={data.code}
        likes={data.likes}
        shares={data.shares}
        creator={data.creator}
        prices={data.prices}
        unavailable={data.unavailable}
        available={data.available}
        total={data.total}
        description={data.description}
        collection_name={data.collection_name}
        collection_id={data.collection_id}
        start_date={new Date(data.start_date)}
        end_date={new Date(data.end_date)}
      />
    </div>
  );
};

export default NftCardDetailPage;
