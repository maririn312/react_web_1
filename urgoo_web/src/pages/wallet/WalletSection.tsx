import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { WalletMenu } from "./WalletPage";
import { TabTitle } from "../../utility/TabTitleUtility";
import MnTranslation from "../../i18n/mn/translation.json";

interface WalletSectionProps {
  activeWalletMenu?: WalletMenu;
}

const WalletSection = (props: WalletSectionProps) => {
  const { t } = useTranslation();

  TabTitle(MnTranslation.mainTitle.walletSection);

  const defaultBtn = "py-2 px-5 rounded-lg text-sec-black font-semibold";

  return (
    <div className="pt-3 flex flex-col sm:flex-row items-center justify-center">
      <Link to={`/wallet/balance`}>
        <div
          className={clsx(defaultBtn, {
            "bg-sec-green": props.activeWalletMenu === WalletMenu.BALANCE,
          })}
        >
          {t("label.balance")}
        </div>
      </Link>
      <Link to={`/wallet/card`}>
        <div
          className={clsx(defaultBtn, {
            "bg-sec-green": props.activeWalletMenu === WalletMenu.CARD,
          })}
        >
          {t("label.giftCard")}
        </div>
      </Link>
      <Link to={`/wallet/income`}>
        <div
          className={clsx(defaultBtn, {
            "bg-sec-green": props.activeWalletMenu === WalletMenu.INCOME,
          })}
        >
          {t("label.income")}
        </div>
      </Link>
      <Link to={`/wallet/withdraw`}>
        <div
          className={clsx(defaultBtn, {
            "bg-sec-green": props.activeWalletMenu === WalletMenu.WITHDRAW,
          })}
        >
          {t("label.withdraw")}
        </div>
      </Link>
      <Link to={`/wallet/history`}>
        <div
          className={clsx(defaultBtn, {
            "bg-sec-green": props.activeWalletMenu === WalletMenu.HISTORY,
          })}
        >
          {t("label.inOutHistory")}
        </div>
      </Link>
    </div>
  );
};

export default WalletSection;
