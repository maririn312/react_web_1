import React, { useState, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import Translation from "./../../i18n/mn/translation.json";

const NomadPopup = () => {
  let [isOpen, setIsOpen] = useState(true);
  let exitBtnRef = useRef(null);

  const {t} = useTranslation();

  const exitBtnClicked = () => {
    return <div>Exit</div>;
  };
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(true)}
      className="fixed z-40 pointer-events-auto font-bold items-center justify-center flex h-full left-0 top-0 transition-colors w-full"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen scrollable container */}
      <div className="relative flex-col max-h-[90%] inset-0 flex items-center justify-center transform scale-100">
        {/* Container to center the panel */}
        <div className="flex min-h-full items-center justify-center">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="mx-auto max-w-sm rounded-lg p-6 bg-white">
            <Dialog.Title className="pb-6 flex items-center justify-between shrink-0">
              {" "}
              {Translation.action.exit}
              <button
                className="w-6 h-6 mr-0 bg-none items-center flex justify-center rounded-full overflow-hidden relative outline-none hover:border-black hover:bg-sec-gray"
                onClick={() => setIsOpen(false)}
              >
                {t("holder.exitIcon")}
              </button>
            </Dialog.Title>
            <p className="pb-6">{t("paragraph.exit")}</p>
            <div className="flex items-center justify-between text-xs">
              <button
                className="pointer-events-auto outline-none leading-7 indent-0 h-7 "
                onClick={() => setIsOpen(false)}
              >
                {t("action.no")}
              </button>
              <button
                className="pointer-events-auto outline-none text-white bg-red-btn leading-7 indent-0 h-7 rounded-lg px-4"
                onClick={() => setIsOpen(false)}
              >
                {t("action.ok")}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default NomadPopup;
