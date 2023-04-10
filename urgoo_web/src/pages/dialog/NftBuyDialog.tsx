import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import NomadBtn, { BtnType } from "../../components/nomad/NomadBtn";
import NomadInput from "../../components/nomad/NomadInput";
import StringUtility from "../../utility/StringUtility";

interface NftBuyDialogProp {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  action: (password:string) => void
}

const NftBuyDialog = (props:NftBuyDialogProp) => {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    password: '',
    passwordError: '',
  });

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
          <h3 className="font-medium text-lg">{t('label.validation')}</h3>
        </Dialog.Title>
        <Dialog.Panel>
          <form>
            <div className="form-control mb-4">
              <label className="label">
                <span>{t("label.accountName")}</span>
              </label>
              <NomadInput
                autoFocus={true}
                id="password"
                name="password"
                placeholder={t("label.password")}
                obscureText={true}
                error={form.passwordError}
                onChange={inputChange}
                value={form.password}
              />
            </div>
          </form>
          <NomadBtn
            className="mt-4 w-full flex justify-center"
            type={BtnType.secondary}
            onClick={() => {
              if(validateForm()) {}
            }}
          >
            {t("action.send")}
          </NomadBtn>
        </Dialog.Panel>
      </div>
    </Dialog>
  );

}

export default NftBuyDialog;