import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Main from "../../components/layout/main/main";
import NomadInput from "../../components/nomad/NomadInput";
import NomadPopup from "../../components/nomad/NomadPopup";
import { userState } from "../../redux/user/userSlice";
import { TabTitle } from "../../utility/TabTitleUtility";
import UserUtility from "../../utility/UserUtility";
import WalletBalance from "./WalletBalance";
import WalletGiftCard from "./WalletGiftCard";
import WalletHistory from "./WalletHistory";
import WalletIncome from "./WalletIncome";
import WalletSection from "./WalletSection";
import WalletWithdraw from "./WalletWithdraw";
import MnTranslation from "../../i18n/mn/translation.json";

export enum WalletMenu {
  BALANCE,
  CARD,
  INCOME,
  WITHDRAW,
  HISTORY,
}

const WalletPage = () => {
  const { menu } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  TabTitle(MnTranslation.mainTitle.wallet);

  // const [isShowing, setIsShowing] = useState(true);
  const [walletMenu, setWalletMenu] = useState<WalletMenu>();

  useEffect(() => {
    if (!UserUtility.isUserLoggedIn()) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (menu === "balance") {
      setWalletMenu(WalletMenu.BALANCE);
    } else if (menu === "card") {
      setWalletMenu(WalletMenu.CARD);
    } else if (menu === "income") {
      setWalletMenu(WalletMenu.INCOME);
    } else if (menu === "withdraw") {
      setWalletMenu(WalletMenu.WITHDRAW);
    } else if (menu === "history") {
      setWalletMenu(WalletMenu.HISTORY);
    }
  }, [menu]);

  const WalletContent = () => {
    if (walletMenu === WalletMenu.BALANCE) {
      return <WalletBalance />;
    } else if (walletMenu === WalletMenu.CARD) {
      return <WalletGiftCard />;
    } else if (walletMenu === WalletMenu.INCOME) {
      return <WalletIncome />;
    } else if (walletMenu === WalletMenu.WITHDRAW) {
      return <WalletWithdraw />;
    } else if (walletMenu === WalletMenu.HISTORY) {
      return <WalletHistory />;
    }
    return <></>;
  };

  return (
    <div>
      <div className="page__header min-h-[220px] relative overflow-hidden">
        <h2 className="text-lg text-custom-green absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-center">
          {t("label.wallet")}
        </h2>
        <img
          className="h-24 object-contain w-full absolute -bottom-[6px] -scale-y-100 left-0 right-0"
          src={require("../../assets/img/item_bottom_img.png")}
          alt={t("label.wallet")}
        />
      </div>
      <div className="page__main bg-white min-h-[100vh-265px]">
        <div className="container mx-auto">
          <div>
            <WalletSection activeWalletMenu={walletMenu} />
            <div className="py-10">
              <div className="w-full mx-auto max-w-[800px] md:p-0 p-4">
                {WalletContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
