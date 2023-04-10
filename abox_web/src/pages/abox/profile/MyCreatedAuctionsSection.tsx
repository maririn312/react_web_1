import { FunctionComponent, useEffect, useState } from "react";
import { Divider } from "react-daisyui";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AUCTION_BOOKED, AUCTION_CONFIRMED, AUCTION_FINISHED, AUCTION_LIVE, AUCTION_PAID, AUCTION_PENDING, AUCTION_REVIEWED, RESPONSE_ERROR, RESPONSE_SUCCESS } from "../../../app/appConst";
import BxAuCard from "../../../components/bx/BxAuCard";
import { AuctionDto } from "../../../models/auction/AuctionDto";
import { auMySubscribed, auMyWon, auMyParticipating, myCreated } from "../../../service/auListApiClient";
import ErrorManager from "../../../utility/ErrorManager";
import CornerRibbon from "react-corner-ribbon";
import BxGroupAuction from "../../../components/bx/BxGroupAuction";
import StringUtility from "../../../utility/StringUtility";
import { useAppSelector } from "../../../app/hooks";
import { userState } from "../../../redux/user/userSlice";

interface MyCreatedAuctionsSectionProps {
  
}

interface AuctionList {
  error?: string,
  isLoading: boolean,
  auctions: AuctionDto[],
  page: number,
  size: number,
}

const MyCreatedAuctionSection:FunctionComponent<MyCreatedAuctionsSectionProps> = (props:MyCreatedAuctionsSectionProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useAppSelector(userState);
  const { nickname, menu } = useParams();

  const [auctionListEditable, setAuctionListEditable] = useState<AuctionList>({
    isLoading: false,
    auctions: Array<AuctionDto>(),
    page: 0,
    size: 10,
  });
  const [auctionListActive, setAuctionListActive] = useState<AuctionList>({
    isLoading: false,
    auctions: Array<AuctionDto>(),
    page: 0,
    size: 10,
  });
  const [auctionListConfirmed, setAuctionListConfirmed] = useState<AuctionList>({
    isLoading: false,
    auctions: Array<AuctionDto>(),
    page: 0,
    size: 10,
  });
  const [auctionListEnded, setAuctionListEnded] = useState<AuctionList>({
    isLoading: false,
    auctions: Array<AuctionDto>(),
    page: 0,
    size: 10,
  });
  
  useEffect(() => {
    myEditable();
    myActive();
    myConfirmed();
    myEnded();
  }, []);

  /* ============================================================================ */
  /* ============================================================================ */
  async function myEditable() {
    setAuctionListEditable({...auctionListEditable, isLoading:true, error: ''});
    try {
      const response = await myCreated([AUCTION_PENDING, AUCTION_REVIEWED], auctionListEditable.page, auctionListEditable.size);
      if(response.status === RESPONSE_SUCCESS) {
        setAuctionListEditable({...auctionListEditable, auctions: response.auctions});
      } else if(response.status === RESPONSE_ERROR) {
        setAuctionListEditable({...auctionListEditable, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setAuctionListEditable({...auctionListEditable, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  /* ============================================================================ */
  /* ============================================================================ */
  async function myActive() {
    setAuctionListActive({...auctionListActive, isLoading:true, error: ''});
    try {
      const response = await myCreated([AUCTION_PAID, AUCTION_LIVE], auctionListActive.page, auctionListActive.size);
      if(response.status === RESPONSE_SUCCESS) {
        setAuctionListActive({...auctionListActive, auctions: response.auctions});
      } else if(response.status === RESPONSE_ERROR) {
        setAuctionListActive({...auctionListActive, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setAuctionListActive({...auctionListActive, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  /* ============================================================================ */
  /* ============================================================================ */
  async function myConfirmed() {
    setAuctionListConfirmed({...auctionListConfirmed, isLoading:true, error: ''});
    try {
      const response = await myCreated([AUCTION_CONFIRMED], auctionListConfirmed.page, auctionListConfirmed.size);
      if(response.status === RESPONSE_SUCCESS) {
        setAuctionListConfirmed({...auctionListConfirmed, auctions: response.auctions});
      } else if(response.status === RESPONSE_ERROR) {
        setAuctionListConfirmed({...auctionListConfirmed, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setAuctionListConfirmed({...auctionListConfirmed, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  /* ============================================================================ */
  /* ============================================================================ */
  async function myEnded() {
    setAuctionListEnded({...auctionListEnded, isLoading:true, error: ''});
    try {
      const response = await myCreated([AUCTION_BOOKED, AUCTION_FINISHED], auctionListEnded.page, auctionListEnded.size);
      if(response.status === RESPONSE_SUCCESS) {
        setAuctionListEnded({...auctionListEnded, auctions: response.auctions});
      } else if(response.status === RESPONSE_ERROR) {
        setAuctionListEnded({...auctionListEnded, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setAuctionListEnded({...auctionListEnded, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  return (
    <div>
      <div>
        <BxGroupAuction
          title={t('label.auctionEditable')}
          isLoading={false}
          auctions={auctionListEditable.auctions}
          moreLink={StringUtility.isListEmpty(auctionListEditable.auctions) ? undefined : '/list/editable'}
          hasRibbon={true}
          auctionLink={(id:number) => {
            return `/user/${user.info?.kyc.nickname}/au/${id}`;
          }}
        />
      </div>
      <div className="mt-8"></div>
      <div>
        <BxGroupAuction
          title={t('label.auctionActive')}
          isLoading={false}
          auctions={auctionListActive.auctions}
          moreLink={StringUtility.isListEmpty(auctionListActive.auctions) ? undefined : '/list/active'}
          hasRibbon={true}
        />
      </div>
      <div className="mt-8"></div>
      <div>
        <BxGroupAuction
          title={t('label.auctionConfirmed')}
          isLoading={false}
          auctions={auctionListConfirmed.auctions}
          moreLink={StringUtility.isListEmpty(auctionListConfirmed.auctions) ? undefined : '/list/confirmed'}
          hasRibbon={true}
        />
      </div>
      <div className="mt-8"></div>
      <div>
        <BxGroupAuction
          title={t('label.auctionEnded')}
          isLoading={false}
          auctions={auctionListEnded.auctions}
          moreLink={StringUtility.isListEmpty(auctionListEnded.auctions) ? undefined : '/list/ended'}
          hasRibbon={true}
        />
      </div>
  </div>
  );
}

export default MyCreatedAuctionSection;