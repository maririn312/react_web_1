import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RESPONSE_SUCCESS } from "../../app/appConst";
import { useAppDispatch } from "../../app/hooks";
import NomadBtn, { BtnType } from "../../components/nomad/NomadBtn";
import NomadInput from "../../components/nomad/NomadInput";
import NomadSelect from "../../components/nomad/NomadSelect";
import { BankDto } from "../../models/account/BankListResponseDto";
import { FiatDto } from "../../models/account/FiatListResponseDto";
import { addAccountEvent } from "../../redux/Account/addAccountSlice";
import MnTranslation from "../../i18n/mn/translation.json";

import {
  walletBankList,
  walletListActiveFiat,
} from "../../service/walletApiClient";
import ErrorManager from "../../utility/ErrorManager";
import StringUtility from "../../utility/StringUtility";
import { TabTitle } from "../../utility/TabTitleUtility";

interface AddAccountDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddAccountDialog = ({
  isOpen,
  setIsOpen,
}: AddAccountDialogProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  // const addAccount = useAppSelector(accountState);
  //  const bankList = useAppSelector(bankList)
  const [banks, setBanks] = useState({
    isLoading: false,
    error: "",
    banks: Array<BankDto>(),
  });

  const [fiats, setFiats] = useState({
    isLoading: false,
    error: "",
    fiats: Array<FiatDto>(),
  });

  const [accountForm, setAccountForm] = useState({
    accountNo: "",
    accountNoError: "",
    accountName: "",
    accountNameError: "",
    fiat: "",
    fiatError: "",
    bank: "",
    bankError: "",
    isLoading: false,
    error: "",
  });

  TabTitle(MnTranslation.mainTitle.addAccountDialog);

  useEffect(() => {
    getBank();
    getFiats();
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAccountForm({
      ...accountForm,
      [event.target.name]: event.target.value,
    });
  }

  function bankChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setAccountForm({
      ...accountForm,
      bank: event.target.value,
    });
  }

  function fiatChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setAccountForm({
      ...accountForm,
      fiat: event.target.value,
    });
  }

  async function getFiats() {
    setFiats({ ...fiats, isLoading: true });
    try {
      const response = await walletListActiveFiat();

      if (response.status === RESPONSE_SUCCESS) {
        setFiats({ ...fiats, isLoading: false, fiats: response.fiats });
      } else {
        setFiats({ ...fiats, isLoading: false, error: response.msg });
      }
    } catch (error) {
      setFiats({
        ...fiats,
        isLoading: false,
        error: ErrorManager.handleRequestError(error),
      });
    }
  }

  async function getBank() {
    setBanks({ ...banks, isLoading: true });
    try {
      const response = await walletBankList();
      if (response.status === RESPONSE_SUCCESS) {
        setBanks({ ...banks, isLoading: false, banks: response.banks });
      } else {
        setBanks({ ...banks, isLoading: false, error: response.msg });
      }
    } catch (error) {
      setBanks({
        ...banks,
        isLoading: false,
        error: ErrorManager.handleRequestError(error),
      });
    }
  }

  function validateAccountForm() {
    setAccountForm({
      ...accountForm,
      accountNameError: "",
      accountNoError: "",
      fiatError: "",
      bankError: "",
    });

    if (!StringUtility.isValidText(accountForm.accountName)) {
      setAccountForm({ 
        ...accountForm, 
        accountNameError: t("validation.accountNameError"),
        accountNoError: "" 
      });
      return false;
    }
    if (!StringUtility.isValidText(accountForm.accountNo)) {
      setAccountForm({ 
        ...accountForm, 
        accountNameError: "",
        accountNoError: t("validation.accountNumberError")
      });
      return false;
    }
    return true;
  }

  return (
    <Dialog
      open={isOpen}
      onClose={setIsOpen}
      as="div"
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-opacity-50",
        {
          "bg-black": isOpen === true,
        }
      )}
    >
      <div className="flex flex-col bg-white w-[540px] py-8 px-4">
        <Dialog.Overlay />
        <Dialog.Title className="text-black mb-4">
          <h3 className="font-medium text-lg">{t("label.addAccount")}</h3>
        </Dialog.Title>
        <hr className="mb-4" />
        <Dialog.Panel>
          <form>
            <div className="form-control mb-4">
              <label className="label">
                <span>{t("label.fiat")}</span>
              </label>
              <NomadSelect
                chooseDef={t("label.choiceFiat")}
                name="fiat"
                key="fiat"
                error={accountForm.error}
                selectChange={fiatChange}
                data={
                  new Map<string, string>(
                    fiats.fiats.map((item, index) => {
                      return [item.code, item.name];
                    })
                  )
                }
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span>{t("label.bank")}</span>
              </label>
              <NomadSelect
                key="bank"
                chooseDef={t("label.choiceBank")}
                name="bank"
                error={accountForm.error}
                selectChange={bankChange}
                data={
                  new Map<string, string>(
                    banks.banks.map((item, index) => {
                      return [item.code, item.name];
                    })
                  )
                }
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span>{t("label.accountName")}</span>
              </label>
              <NomadInput
                autoFocus={true}
                id="accountName"
                name="accountName"
                placeholder={t("label.accountName")}
                error={accountForm.accountNameError}
                onChange={handleChange}
                value={accountForm.accountName}
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span>{t("label.accountNo")}</span>
              </label>
              <NomadInput
                autoFocus={true}
                id="accountNo"
                name="accountNo"
                placeholder={t("label.accountNo")}
                error={accountForm.accountNoError}
                onChange={handleChange}
                value={accountForm.accountNo}
              />
            </div>
          </form>
          <NomadBtn
            className="mt-4 w-full flex justify-center"
            type={BtnType.secondary}
            onClick={() => {
              if (validateAccountForm()) {
                dispatch(
                  addAccountEvent({
                    fiat_code: accountForm.fiat,
                    bank_code: accountForm.bank,
                    account_no: accountForm.accountNo,
                    account_name: accountForm.accountName,
                  })
                );
                setAccountForm({
                  ...accountForm,
                  fiat: "",
                  bank: "",
                  accountName: "",
                  accountNo: "",
                });
                setIsOpen(false);
              }
              // setAddAccountShowing(true);
            }}
            isLoading={accountForm.isLoading}
          >
            {t("action.send")}
          </NomadBtn>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddAccountDialog;
