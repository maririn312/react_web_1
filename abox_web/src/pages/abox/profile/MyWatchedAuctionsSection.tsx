import { FunctionComponent, useEffect, useState } from "react";
import { Divider } from "react-daisyui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AUCTION_BOOKED, AUCTION_CONFIRMED, AUCTION_FINISHED, AUCTION_LIVE, AUCTION_PAID, AUCTION_PENDING, AUCTION_REVIEWED, RESPONSE_ERROR, RESPONSE_SUCCESS } from "../../../app/appConst";
import BxAuCard from "../../../components/bx/BxAuCard";
import { AuctionDto } from "../../../models/auction/AuctionDto";
import { auMySubscribed, auMyWon, auMyParticipating } from "../../../service/auListApiClient";
import ErrorManager from "../../../utility/ErrorManager";
import CornerRibbon from "react-corner-ribbon";
import BxGroupAuction from "../../../components/bx/BxGroupAuction";
import StringUtility from "../../../utility/StringUtility";

interface MyWatchedAuctionsSectionProps {
  
}

interface AuctionList {
  error?: string,
  isLoading: boolean,
  auctions: AuctionDto[],
  page: number,
  size: number,
}

const MyWatchedAuctionSection:FunctionComponent<MyWatchedAuctionsSectionProps> = (props:MyWatchedAuctionsSectionProps) => {
  const { t } = useTranslation();

  const [auctionListSub, setAuctionListSub] = useState<AuctionList>({
    isLoading: false,
    auctions: Array<AuctionDto>(),
    page: 0,
    size: 10,
  });
  const [auctionListWon, setAuctionListWon] = useState<AuctionList>({
    isLoading: false,
    auctions: Array<AuctionDto>(),
    page: 0,
    size: 10,
  });
  const [auctionListPart, setAuctionListPart] = useState<AuctionList>({
    isLoading: false,
    auctions: Array<AuctionDto>(),
    page: 0,
    size: 10,
  });


  useEffect(() => {
    mySubscribed();
    myWon();
    myParticipated();
  }, []);

  /* ============================================================================ */
  /* ============================================================================ */
  async function mySubscribed() {
    setAuctionListSub({...auctionListSub, isLoading:true, error: ''});
    try {
      const response = await auMySubscribed(auctionListSub.page, auctionListSub.size);
      if(response.status === RESPONSE_SUCCESS) {
        setAuctionListSub({...auctionListSub, auctions: response.auctions});
      } else if(response.status === RESPONSE_ERROR) {
        setAuctionListSub({...auctionListSub, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setAuctionListSub({...auctionListSub, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  /* ============================================================================ */
  /* ============================================================================ */
  async function myWon() {
    setAuctionListWon({...auctionListWon, isLoading:true, error: ''});
    try {
      const response = await auMyWon(auctionListWon.page, auctionListWon.size);
      if(response.status === RESPONSE_SUCCESS) {
        setAuctionListWon({...auctionListWon, auctions: response.auctions});
      } else if(response.status === RESPONSE_ERROR) {
        setAuctionListWon({...auctionListWon, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setAuctionListWon({...auctionListWon, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  /* ============================================================================ */
  /* ============================================================================ */
  async function myParticipated() {
    setAuctionListPart({...auctionListPart, isLoading:true, error: ''});
    try {
      const response = await auMyParticipating(auctionListPart.page, auctionListPart.size);
      if(response.status === RESPONSE_SUCCESS) {
        setAuctionListPart({...auctionListPart, auctions: response.auctions});
      } else if(response.status === RESPONSE_ERROR) {
        setAuctionListPart({...auctionListPart, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setAuctionListPart({...auctionListPart, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  return (
    <div>
      <div>
        <BxGroupAuction
          title={t('title.subscribed')}
          isLoading={false}
          auctions={auctionListSub.auctions}
          moreLink={StringUtility.isListEmpty(auctionListSub.auctions) ? undefined : '/list/subscribed'}
          hasRibbon={false}
        />
      </div>
      <div className="mt-8"></div>
      <div>
        <BxGroupAuction
          title={t('title.participating')}
          isLoading={false}
          auctions={auctionListPart.auctions}
          moreLink={StringUtility.isListEmpty(auctionListPart.auctions) ? undefined : '/list/participated'}
          hasRibbon={false}
        />
      </div>
      <div className="mt-8"></div>
      <div>
        <BxGroupAuction
          title={t('title.won')}
          isLoading={false}
          auctions={auctionListWon.auctions}
          moreLink={StringUtility.isListEmpty(auctionListWon.auctions) ? undefined : '/list/won'}
          hasRibbon={false}
        />
      </div>
  </div>
  );
}

export default MyWatchedAuctionSection;