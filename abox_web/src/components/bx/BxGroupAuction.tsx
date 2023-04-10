import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { AuctionDto } from "../../models/auction/AuctionDto";
import CornerRibbon from "react-corner-ribbon";
import BxAuCard from "./BxAuCard";
import { AUCTION_BOOKED, AUCTION_CONFIRMED, AUCTION_FINISHED, AUCTION_LIVE, AUCTION_PAID, AUCTION_PENDING, AUCTION_REVIEWED } from "../../app/appConst";
import { Link, Path } from "react-router-dom";
import { Button } from "react-daisyui";
import { BxButton, BxButtonType } from "./BxButton";
import StringUtility from "../../utility/StringUtility";
import { BxMessage, BxMessageType } from "./BxMessage";

interface BxGroupAuctionProp {
  auctions: AuctionDto[]
  auctionLink?: (auctionId:number) => string,
  moreLink?: string | Partial<Path>,
  isLoading: boolean,
  hasRibbon?: boolean | undefined,
  error?: string | undefined,
  title?: string | undefined,
}

const BxGroupAuction:FunctionComponent<BxGroupAuctionProp> = (props:BxGroupAuctionProp) => {
  const { t } = useTranslation();
  
  /* ============================================================================ */
  /* ============================================================================ */
  function mapStatusToColor(status:number) {
    switch(status) {
      case AUCTION_PENDING:
        return '#e6a700';
      case AUCTION_REVIEWED:
        return '#e64900';
      case AUCTION_CONFIRMED:
        return '#4cb3d4';
      case AUCTION_PAID:
        return '#4cd964';
      case AUCTION_LIVE:
        return '#6669f1';
      case AUCTION_FINISHED:
        return '#666666';
      case AUCTION_BOOKED:
        return '#666666';
    }
    return '#666666';
  }

  /* ============================================================================ */
  /* ============================================================================ */
  function mapStatusToText(status:number) {
    switch(status) {
      case AUCTION_PENDING:
        return t('label.auctionPending');
      case AUCTION_REVIEWED:
        return t('label.auctionReviewed');
      case AUCTION_CONFIRMED:
        return t('label.auctionConfirmed');
      case AUCTION_PAID:
        return t('label.auctionPaid');
      case AUCTION_LIVE:
        return t('label.auctionLive');
      case AUCTION_FINISHED:
        return t('label.auctionFinished');
      case AUCTION_BOOKED:
        return t('label.auctionBooked');
    }
    
    return ' ';
  }

  /* ============================================================================ */
  /* ============================================================================ */
  const Ribbon = ({text, color}:{text:string, color:string}) => {
    if(props.hasRibbon === undefined || !props.hasRibbon) {
      return <></>
    }
    return <CornerRibbon
      position="top-right" // OPTIONAL, default as "top-right"
      fontColor="#f0f0f0" // OPTIONAL, default as "#f0f0f0"
      backgroundColor={color} // OPTIONAL, default as "#2c7"
      containerStyle={{}} // OPTIONAL, style of the ribbon
      style={{}} // OPTIONAL, style of ribbon content
      className="" // OPTIONAL, css class of ribbon
    >
      {text}
    </CornerRibbon>
  }

  /* ============================================================================ */
  /* ============================================================================ */
  return (
    <div className="bg-white rounded-md px-4 pb-5 pt-1">
      <div className="flex my-3 gap-3">
        
        <h2 className="text-xl font-bold uppercase">{props.title}</h2>
        {props.moreLink !== undefined ? <Link to={props.moreLink}>
          <BxButton
            className="text-[11px] rounded-md p-1 min-h-[18px] h-7"
            type={BxButtonType.gradient}
          >
            {t('label.showAll')} ... 
          </BxButton>
        </Link> : <></>}
        
      </div>
      <hr className=""/>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-3">
        {StringUtility.isListEmpty(props.auctions)
          ? <BxMessage
              type={BxMessageType.warning}
              message={t('label.empty')}
            /> 
          : <></>
        }
        {props.auctions.map((au) => {
          let link;
          if(props.auctionLink !== undefined) {
            link = props.auctionLink(au.auction_id);
          }

          return <div className="relative">
            {Ribbon({text: mapStatusToText(au.status), color: mapStatusToColor(au.status)})}
            <BxAuCard auction={au} onLink={link}/>
          </div>  
        })}
      </div>
    </div>
  );
}

export default BxGroupAuction;