import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import empty from "../../assets/img/empty.svg";
import NomadBtn, { BtnType } from "../../components/nomad/NomadBtn";
import { TabTitle } from "../../utility/TabTitleUtility";
import MnTranslation from "../../i18n/mn/translation.json";

const MyNftEmpty = () => {
  const { t } = useTranslation();
  TabTitle(MnTranslation.mainTitle.myNFTEmpty);

  return (
    <div className="w-full pt-5">
      <div className="nft__empty">
        <div className="flex items-center justify-center flex-col p-10 grid-cols-34px gap-2 mt-5 bg-creator border border-dashed border-creator-b rounded-lg cursor-pointer hover:bg-empty-h-bg">
          <img src={empty} alt="edit" />
          <h4 className="text-white text-sm my-2 mx-0">{t("label.empty")}</h4>
          <Link to={`/nft/list`}>
            <NomadBtn height={"44px"} type={BtnType.blue}>
              {t("label.nftList")}
            </NomadBtn>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyNftEmpty;
