import React, { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Footer: FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <div className="text-sm text-footer text-center p-4 bottom-0">
      {t("holder.footer")}
    </div>
  );
};

export default Footer;
