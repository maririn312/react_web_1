import React from "react";
import { TabTitle } from "../../utility/TabTitleUtility";
import MyNftEmpty from "./MyNftEmpty";
import MnTranslation from "../../i18n/mn/translation.json";

const MyNftCreated = () => {
  TabTitle(MnTranslation.mainTitle.myNFTCreated);

  return <MyNftEmpty />;
};

export default MyNftCreated;
