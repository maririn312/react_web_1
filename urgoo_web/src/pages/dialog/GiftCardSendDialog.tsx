import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import NomadBtn, { BtnType } from "../../components/nomad/NomadBtn";
import NomadInput from "../../components/nomad/NomadInput";

interface GiftCardSendDialogProp {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  action: (phone:string) => void;
}

const GiftCardSendDialog = (props:GiftCardSendDialogProp) => {

  const { t } = useTranslation();
  const [phone, setPhone] = useState<string>();
  const [error, setError] = useState<string>();

  // ================================================================== //
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPhone(event.target.value);
  }

  // ================================================================== //
  function checkPhone(pin:string) {
    if(pin === undefined || pin === '') {
      return false;
    }
    return true;
  }

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
      <div className="flex flex-col bg-white w-[540px] py-8 px-4">
        <Dialog.Title className="text-black mb-4">
          <h3 className="font-bold text-lg">{t('title.sendGiftCard')}</h3>
        </Dialog.Title>
        <hr/>
        <Dialog.Panel>
          <div className="form-control mb-4 mt-4">
            <label className="label">
              <span>{t("label.phone")}</span>
            </label> 
            <NomadInput 
              autoFocus={true}
              id="phone"
              name="phone"
              placeholder={t("label.phone")}
              onChange={handleChange}
              value={phone}
              readonly={false}
              error={error}
              obscureText={false}
            />
          </div>
          <div>
            <NomadBtn 
              className="mt-4 w-full flex justify-center text-black hover:text-white"
              type={BtnType.secondary}
              onClick={() => {
                if(checkPhone(phone ?? '')) {
                  props.action(phone ?? '');
                } else {
                  setError(t('validation.phoneError'))
                }
              }}
            >
              {t("action.send")}
            </NomadBtn>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default GiftCardSendDialog;