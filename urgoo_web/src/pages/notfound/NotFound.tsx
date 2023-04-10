import React from 'react';
import { TabTitle } from '../../utility/TabTitleUtility';
import MnTranslation from "../../i18n/mn/translation.json";
import { useTranslation } from 'react-i18next';

function NotFound() {

    const { t } = useTranslation();

    TabTitle(MnTranslation.mainTitle.notFound);

    return (
        <div>
            <h1>{t("label.notFound")}</h1>
        </div>
    );
}

export default NotFound;