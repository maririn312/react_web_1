import { useTranslation } from "react-i18next";
import StringUtility from "../../utility/StringUtility";
import { BxButton, BxButtonType } from "./BxButton";

interface BxBidActionProp {
  onBid?: React.MouseEventHandler<HTMLButtonElement> | undefined
  onStake?: React.MouseEventHandler<HTMLButtonElement> | undefined
  bidAmount: number
  stakeAmount: number
}

export function BxBidAction(props: BxBidActionProp) {
  const { t } = useTranslation();

  return <div className="">
    <div className="stats w-full bg-gradient-to-br from-secondary to-primary">
      <div className="stat">
        <div className="stat-title text-white">{t('label.yourBidAmount')}</div>
        <div className="stat-value text-white">{StringUtility.numberToCurrency(props.bidAmount)}</div>
        <div className="stat-actions">
          <BxButton onClick={props.onBid} className="btn-sm text-white" type={BxButtonType.bordered}>{t('action.bid')}</BxButton>
        </div>
      </div>
      <div className="stat">
        <div className="stat-title text-white">{t('label.yourDenchinAmount')}</div>
        <div className="stat-value text-white">{StringUtility.numberToCurrency(props.stakeAmount)}</div>
        <div className="stat-actions">
          <BxButton onClick={props.onStake} className="btn-sm text-white" type={BxButtonType.bordered}>{t('action.denchin')}</BxButton>
        </div>
      </div>
    </div>
  </div>
}