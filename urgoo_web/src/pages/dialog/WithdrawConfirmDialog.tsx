import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import NomadInput from "../../components/nomad/NomadInput";
import NomadBtn, { BtnType } from "../../components/nomad/NomadBtn";
import { TabTitle } from "../../utility/TabTitleUtility";
import MnTranslation from "../../i18n/mn/translation.json";
import StringUtility from "../../utility/StringUtility";
import NomadMessage, { NomadMessageType } from "../../components/nomad/NomadMessage";

interface WithdrawConfirmDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  action: (password:string) => void;
}

const WithdrawConfirmDialog = (props:WithdrawConfirmDialogProps) => {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    password: "",
    passwordError: "",
    isLoading: false,
  });

  TabTitle(MnTranslation.mainTitle.withdrawConfirmDialog);

  // ================================================================== //
  function inputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event?.target.name]: event?.target.value,
    });
  }

  // ================================================================== //
  function validateForm() {
    if (!StringUtility.isValidText(form.password)) {
      setForm({
        ...form,
        passwordError: t("validation.passwordError"),
      });
      return false;
    }
    setForm({...form, passwordError: ''});
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
      <div className="flex flex-col bg-white py-4 px-4 w-96">
        <Dialog.Title className="text-black mb-4">
          <h3 className="font-bold text-lg">{t('title.confirmation')}</h3>
        </Dialog.Title>
        <hr/>
        <Dialog.Panel>
          <form>
            <div className="form-control mt-4">
              <NomadInput 
                autoFocus={true}
                id="password"
                name="password"
                placeholder={t("description.pleaseEnterPassword")}
                onChange={inputChange} 
                value={form.password} 
                obscureText={true} 
              />
            </div>
          </form>
          <div>
            <NomadMessage 
              type={NomadMessageType.error}
              message={t('description.withdrawNotice')}
            />
          </div>
          <NomadBtn
            className="mt-4 flex justify-center"
            type={BtnType.secondary}
            isLoading={form.isLoading}
            onClick={() => {
              setForm({...form, isLoading: true, password: ''});
              if(validateForm()) {
                props.action(form.password);
              }
            }}
          >
            {t("action.send")}
          </NomadBtn>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default WithdrawConfirmDialog;
