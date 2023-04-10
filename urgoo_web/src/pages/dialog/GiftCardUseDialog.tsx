import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import QRCode from "react-qr-code";
import NomadBtn, { BtnType } from "../../components/nomad/NomadBtn";
import NomadInput from "../../components/nomad/NomadInput";
import { GiftCardUseResponseDto } from "../../models/gift/GiftCardUseResponseDto";

interface GiftCardUseDialogProp {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  giftcard?: GiftCardUseResponseDto;
}

const GiftCardUseDialog = (props:GiftCardUseDialogProp) => {
  
  const { t } = useTranslation();

  // ================================================================== //
  useEffect(() => {
    if(props.giftcard === undefined) {
      props.setIsOpen(false);
    }
  }, []);

  // ================================================================== //
  const GiftCardSection = () => {
    return (
      <>
        <div className="form-control mt-4">
          <label className="label">
            <span>{t("label.accountName")}</span>
          </label> 
          <NomadInput 
            autoFocus={false}
            id="barcode"
            name="barcode"
            placeholder={t("label.accountName")}
            value={props.giftcard?.barCode}
            readonly={true}
          /> 
        </div>
        {props.giftcard?.hasPin || props.giftcard?.pin !== undefined 
          ? <div className="form-control mb-4 mt-4">
              <label className="label">
                <span>{t("label.pin")}</span>
              </label> 
              <NomadInput 
                autoFocus={false}
                id="pin"
                name="pin"
                placeholder={t("label.pin")}
                value={props.giftcard?.pin}
                readonly={true}
              /> 
            </div> 
          : <></>
        }
        <div className="py-4" style={{ height: "auto", margin: "0 auto", maxWidth: 256, width: "100%" }}>
          <QRCode 
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={props.giftcard?.barCode ?? "empty"}
            viewBox={`0 0 256 256`}
          />
        </div>
        <div>
          <NomadBtn 
            className="mt-4 w-full flex justify-center text-black hover:text-white"
            type={BtnType.primary}
            onClick={() => {
              props.setIsOpen(false);
            }}
          >
            {t("action.close")}
          </NomadBtn>
        </div>
      </>
    );
  }

  // // ================================================================== //
  // const PinCodeSection = () => {
  //   return (
  //     <>
  //       <div className="form-control mb-4 mt-4">
  //         <label className="label">
  //           <span>{t("label.pin")}</span>
  //         </label> 
  //         <NomadInput 
  //           autoFocus={true}
  //           id="pin"
  //           name="pin"
  //           placeholder={t("label.pin")}
  //           onChange={handleChange}
  //           value={pin}
  //           readonly={false}
  //           error={error}
  //           obscureText={true}
  //         />
  //       </div>
  //       <div>
  //         <NomadBtn 
  //           className="mt-4 w-full flex justify-center text-black hover:text-white"
  //           type={BtnType.secondary}
  //           onClick={() => { 
  //             if(checkPin(pin ?? '')) {
  //               setPinValid(true);
  //             } else { 
  //               setError(t('validation.pinError'));
  //               setPin(''); 
  //             }
  //           }}
  //         >
  //           {t("action.continue")}
  //         </NomadBtn>
  //       </div>
  //     </>
  //   )
  // }

  // ================================================================== //
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.setIsOpen}
      as="div"
      className={clsx(
        "fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-opacity-50",
        {
          "bg-black": props.isOpen === true,
        }
      )}
    >
      <div className="flex flex-col bg-white w-[540px] py-4 px-4">
        <Dialog.Title className="text-black mb-4">
          <h3 className="font-bold text-lg">{t('title.useGiftCard')}</h3>
        </Dialog.Title>
        <hr/>
        <Dialog.Panel>
          {GiftCardSection()}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default GiftCardUseDialog;