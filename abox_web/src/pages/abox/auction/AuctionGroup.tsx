import { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { AUCTION_BOOKED, AUCTION_CONFIRMED, AUCTION_FINISHED, AUCTION_LIVE, AUCTION_PAID, AUCTION_PENDING, AUCTION_REVIEWED, RESPONSE_ERROR, RESPONSE_SUCCESS } from "../../../app/appConst";
import { useAppSelector } from "../../../app/hooks";
import BxGroupAuction from "../../../components/bx/BxGroupAuction";
import { AuctionDto } from "../../../models/auction/AuctionDto";
import { userState } from "../../../redux/user/userSlice";
import { auMyParticipating, auMySubscribed, auMyWon, myCreated } from "../../../service/auListApiClient";
import ErrorManager from "../../../utility/ErrorManager";

interface AuctionList {
  error?: string,
  isLoading: boolean,
  auctions: AuctionDto[],
  page: number,
  size: number,
}

const AuctionGroup:FunctionComponent = () => {
  
  const { t } = useTranslation();
  const user = useAppSelector(userState);
  const { auctionType } = useParams();
  const [auctionList, setAuctionList] = useState<AuctionList>({
    isLoading: false,
    auctions: Array<AuctionDto>(),
    page: 0,
    size: 100,
  });
  const [title, setTitle] = useState<string>();
  const [hasRibbon, setHasRibbon] = useState<boolean>(false);

  useEffect(() => {
    console.log(user.isLoggedIn);
    if(user.isLoggedIn) {
      setPage(0);
      switch(auctionType) {
        case "editable":
          setHasRibbon(true);
          setTitle('editable');
          break;
        case "active":
          setHasRibbon(true);
          setTitle('active');
          break;
        case "confirmed":
          setHasRibbon(true);
          setTitle('confirmed');
          break;
        case "ended":
          setHasRibbon(true);
          setTitle('ended');
          break;
        case "subscribed":
          setHasRibbon(false);
          setTitle('subscribed');
          break;
        case "won":
          setHasRibbon(false);
          setTitle('won');
          break;
        case "participated":
          setHasRibbon(false);
          setTitle('participated');
          break;
      }
    } else {
      // TODO: navigate
    }
  }, [user.isLoggedIn]);

  /* ============================================================================ */
  /* ============================================================================ */
  function setPage(page:number) {
    switch(auctionType) {
      case "editable":
        myEditable(page);
        break;
      case "active":
        myActive(page);
        break;
      case "confirmed":
        myConfirmed(page);
        break;
      case "ended":
        myEnded(page);
        break;
      case "subscribed":
        mySubscribed(page);
        break;
      case "won":
        myWon(page);
        break;
      case "participated":
        myParticipated(page);
        break;
    }
  }
  
  /* ============================================================================ */
  /* ============================================================================ */
  async function myEditable(page:number) {
    setAuctionList({...auctionList, isLoading:true, error: ''});
    try {
      const response = await myCreated([AUCTION_PENDING, AUCTION_REVIEWED], page, auctionList.size);
      if(response.status === RESPONSE_SUCCESS) {
        setAuctionList({...auctionList, auctions: response.auctions});
      } else if(response.status === RESPONSE_ERROR) {
        setAuctionList({...auctionList, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setAuctionList({...auctionList, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  /* ============================================================================ */
  /* ============================================================================ */
  async function myActive(page:number) {
    setAuctionList({...auctionList, isLoading:true, error: ''});
    try {
      const response = await myCreated([AUCTION_PAID, AUCTION_LIVE], page, auctionList.size);
      if(response.status === RESPONSE_SUCCESS) {
        setAuctionList({...auctionList, auctions: response.auctions});
      } else if(response.status === RESPONSE_ERROR) {
        setAuctionList({...auctionList, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setAuctionList({...auctionList, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  /* ============================================================================ */
  /* ============================================================================ */
  async function myConfirmed(page:number) {
    setAuctionList({...auctionList, isLoading:true, error: ''});
    try {
      const response = await myCreated([AUCTION_CONFIRMED], page, auctionList.size);
      if(response.status === RESPONSE_SUCCESS) {
        setAuctionList({...auctionList, auctions: response.auctions});
      } else if(response.status === RESPONSE_ERROR) {
        setAuctionList({...auctionList, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setAuctionList({...auctionList, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  /* ============================================================================ */
  /* ============================================================================ */
  async function myEnded(page:number) {
    setAuctionList({...auctionList, isLoading:true, error: ''});
    try {
      const response = await myCreated([AUCTION_BOOKED, AUCTION_FINISHED], page, auctionList.size);
      if(response.status === RESPONSE_SUCCESS) {
        setAuctionList({...auctionList, auctions: response.auctions});
      } else if(response.status === RESPONSE_ERROR) {
        setAuctionList({...auctionList, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setAuctionList({...auctionList, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  /* ============================================================================ */
  /* ============================================================================ */
  async function mySubscribed(page:number) {
    setAuctionList({...auctionList, isLoading:true, error: ''});
    try {
      const response = await auMySubscribed(page, auctionList.size);
      if(response.status === RESPONSE_SUCCESS) {
        setAuctionList({...auctionList, auctions: response.auctions});
      } else if(response.status === RESPONSE_ERROR) {
        setAuctionList({...auctionList, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setAuctionList({...auctionList, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  /* ============================================================================ */
  /* ============================================================================ */
  async function myWon(page:number) {
    setAuctionList({...auctionList, isLoading:true, error: ''});
    try {
      const response = await auMyWon(page, auctionList.size);
      if(response.status === RESPONSE_SUCCESS) {
        setAuctionList({...auctionList, auctions: response.auctions});
      } else if(response.status === RESPONSE_ERROR) {
        setAuctionList({...auctionList, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setAuctionList({...auctionList, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  /* ============================================================================ */
  /* ============================================================================ */
  async function myParticipated(page:number) {
    setAuctionList({...auctionList, isLoading:true, error: ''});
    try {
      const response = await auMyParticipating(page, auctionList.size);
      if(response.status === RESPONSE_SUCCESS) {
        setAuctionList({...auctionList, auctions: response.auctions});
      } else if(response.status === RESPONSE_ERROR) {
        setAuctionList({...auctionList, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setAuctionList({...auctionList, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  return (
    <div>
      <BxGroupAuction
        title={title}
        isLoading={false}
        auctions={auctionList.auctions}
        hasRibbon={hasRibbon}
      />
    </div>
  );
}

export default AuctionGroup;