import React from 'react'
import { TabTitle } from '../../utility/TabTitleUtility';
import MnTranslation from "../../i18n/mn/translation.json";
import Translation from "../../i18n/mn/translation.json";
import { useTranslation } from 'react-i18next';

const MntBalanceSection = () => {


  TabTitle(MnTranslation.mainTitle.mntBalanceSection);

  return (
    <div>{Translation.label.mnFtBalance} </div>
  )
}

export default MntBalanceSection