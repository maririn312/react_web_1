import React, { FunctionComponent, useEffect, useState } from "react";
import { Divider } from "react-daisyui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { RESPONSE_ERROR, RESPONSE_SUCCESS, URL_BACKEND_DOWNLOAD } from "../../../app/appConst";
import BxAuCard from "../../../components/bx/BxAuCard";
import { BxCard } from "../../../components/bx/BxCard";
import { AuctionDto } from "../../../models/auction/AuctionDto";
import { auMyParticipating, auMySubscribed, auMyWon } from "../../../service/auListApiClient";
import { getAuctionsByNickname } from "../../../service/userApiClient";
import ErrorManager from "../../../utility/ErrorManager";
import StringUtility from "../../../utility/StringUtility";

interface AuctionSectionProps {
  nickname?: string,
}

interface AuctionList {
  error?: string,
  isLoading: boolean,
  auctions: AuctionDto[],
  page: number,
  size: number,
}

const AuctionsSection:FunctionComponent<AuctionSectionProps> = (props:AuctionSectionProps) => {
  const { t } = useTranslation();

  const [auctionListNickname, setAuctionListNickname] = useState<AuctionList>({
    isLoading: false,
    auctions: Array<AuctionDto>(),
    page: 0,
    size: 10,
  });

  /* ============================================================================ */
  /* ============================================================================ */
  useEffect(() => {
    auctionsByNickname();
  }, []);
  
  /* ============================================================================ */
  /* ============================================================================ */
  async function auctionsByNickname() {
    if(props.nickname === undefined) return;
    setAuctionListNickname({...auctionListNickname, isLoading:true, error: ''});
    try {
      const response = await getAuctionsByNickname({nickname: props.nickname, page: auctionListNickname.page, size: auctionListNickname.size});
      if(response.status === RESPONSE_SUCCESS) {
        setAuctionListNickname({...auctionListNickname, auctions: response.auctions});
      } else if(response.status === RESPONSE_ERROR) {
        setAuctionListNickname({...auctionListNickname, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setAuctionListNickname({...auctionListNickname, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  /* ============================================================================ */
  /* ============================================================================ */
  return <div>
      <h2 className="text-xl font-medium">{t('label.userAuction')}</h2>
      <Divider/>
      <div className="grid grid-cols-2 gap-5">
        {auctionListNickname.auctions.map((au) => {
          return <BxAuCard auction={au}/>
        })}
      </div>
  </div>
}

export default AuctionsSection;