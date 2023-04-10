import clsx from "clsx";
import { t } from "i18next";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { TabTitle } from "../../utility/TabTitleUtility";
import { NftMenu } from "./MyNft";
import MnTranslation from "../../i18n/mn/translation.json";

interface MyNftSectionProps {
  activeNftMenu: NftMenu;
}

const MyNftSection: FunctionComponent<MyNftSectionProps> = (
  props: MyNftSectionProps
) => {
  const { t } = useTranslation();

  TabTitle(MnTranslation.mainTitle.myNFTSection);

  const btnDef =
    "py-2 px-2 border-b-2 transition-colors duration-300 gap-3 font-medium text-base ";

  return (
    <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
      <Link
        className={`${btnDef} ${
          props.activeNftMenu === NftMenu.COLLECTIBLES
            ? "border-custom-blue text-white"
            : "border-transparent text-status-detail"
        }`}
        to={`/mynft/collectibles`}
      >
        {t("label.collected")}
      </Link>
      <Link
        className={`${btnDef} ${
          props.activeNftMenu === NftMenu.CREATED
            ? "border-custom-blue text-white"
            : "border-transparent text-status-detail"
        }`}
        to={`/mynft/created`}
      >
        {t("label.created")}
      </Link>
    </div>
  );
};

export default MyNftSection;
