import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { URL_BACKEND_DOWNLOAD } from "../../app/appConst";
import { AuctionDto } from "../../models/auction/AuctionDto";
import StringUtility from "../../utility/StringUtility";
import { BxCard } from "./BxCard";
import { BxCountdown } from "./BxCountdown";
import { BxLoadingIndicator } from "./BxLoadingIndicator";
import { IoMdPeople } from 'react-icons/io';
import { useTranslation } from "react-i18next";

interface BxAuCardProps {
  auction:AuctionDto,
  isLoading?:boolean,
  isPaid?:boolean,
  onLink?:string | undefined 
}

const BxAuCard:FunctionComponent<BxAuCardProps> = (props:BxAuCardProps) => {

  const { t } = useTranslation();
  
  if(props.isLoading) {
    return <BxCard>
      <figure>
      </figure>
      <div className="card-body pr-4 pl-4 pb-6 pt-4">
        <div className="p-8">
          <BxLoadingIndicator size={40}/>
        </div>
      </div>
    </BxCard>
  }

  // ================================================================== //
  const au = props.auction;
  const Figure = () => {
    if(props.isPaid) {
      return (
        <figure>
          <img className="auction-img" src={`${URL_BACKEND_DOWNLOAD}/${au.image?.image_medium}`} alt={au.name} />
          <div className="auction-top-badge">
            <span className="badge badge-secondary font-semibold text-white">
              {t('label.sponsored')}
            </span>
          </div>
        </figure>
      );
    } 
    return (
      <figure>
        <img className="auction-img" src={`${URL_BACKEND_DOWNLOAD}/${au.image?.image_medium}`} alt={au.name} />
      </figure>
    );
  }

  // ================================================================== //
  return (
    <Link to={props.onLink ?? `/au/${au.auction_id}`} className="auction">
      <BxCard>
        <Figure/>
        <div className="card-body pr-4 pl-4 pb-6 pt-4">
          <div className="flex flex-wrap flex-row gap-1">
            <span className="badge badge-secondary font-semibold text-white">
              {StringUtility.numberToCurrency(au.current_winning_price)}
            </span>
            <span className="badge badge-warning font-semibold text-white">
              <IoMdPeople size={22} className="pr-1"/> {au.subscribers}
            </span>
            <div className="badge badge-outline">
              <BxCountdown type="badge" startDate={au.start_date} endDate={au.end_date}/>
            </div>
          </div>
          <h2 className="card-title">
            {au.name}
          </h2>
          {/* <div className="card-actions justify-end">
            <div className="badge badge-outline">{au.end_date}</div>
          </div> */}
        </div>
      </BxCard>
    </Link>
  )
}

export default BxAuCard;