import React, { useEffect, useRef, useState } from "react";
import { RESPONSE_SUCCESS } from "../../app/appConst";
import NomadBtn, { BtnType } from "../../components/nomad/NomadBtn";
import { FiatDto } from "../../models/account/FiatListResponseDto";
import { BankDto } from "../../models/account/BankListResponseDto";
import {
  MyAccountDto,
  MyBankAccountResponseDto,
} from "../../models/account/MyBankAccountResponseDto";
import {
  walletAddAccount,
  walletBalanceHistory,
  walletBankList,
  walletListActiveFiat,
  walletMyBankAccounts,
  walletRemoveAccount,
} from "../../service/walletApiClient";
import ErrorManager from "../../utility/ErrorManager";
import StringUtility from "../../utility/StringUtility";
import { NomadLoadingIndicator } from "../../components/nomad/NomadLoadingIndicator";
import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import NomadSelect from "../../components/nomad/NomadSelect";
import NomadInput from "../../components/nomad/NomadInput";
import { useTranslation } from "react-i18next";
import AddAccountDialog from "../dialog/AddAccountDialog";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addWalletState } from "../../redux/Account/addAccountSlice";
import { TabTitle } from "../../utility/TabTitleUtility";
import MnTranslation from "../../i18n/mn/translation.json";
import removeIcon from "./../../assets/img/remove_icon.82820af8d8192ab8bba1.svg";

// import { t } from "i18next";

const ProfileAccount = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const addWallet = useAppSelector(addWalletState);

  TabTitle(MnTranslation.mainTitle.profileAccount);

  const [isAddAccountShowing, setAddAccountShowing] = React.useState(false);
  const [bankAccounts, setBankAccounts] = useState({
    isLoading: false,
    error: "",
    accounts: Array<MyAccountDto>(),
  });

  const [removeAccount, setRemoveAccount] = useState({
    isLoading: false,
    error: "",
  });

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

  useEffect(() => {
    if (addWallet.status === "loading") {
      // TODO: loading indicator
    } else if (addWallet.status === "error") {
      alert(addWallet.error);
    } else if (addWallet.status === "loaded") {
      getBankAccounts();
    }
  }, [addWallet.status]);

  useEffect(() => {
    getBankAccounts();
  }, []);

  async function getBankAccounts() {
    setBankAccounts({ ...bankAccounts, isLoading: true });
    try {
      const response = await walletMyBankAccounts();
      if (response.status === RESPONSE_SUCCESS) {
        setBankAccounts({
          ...bankAccounts,
          isLoading: false,
          accounts: response.accounts,
        });
      } else {
        setBankAccounts({
          ...bankAccounts,
          isLoading: false,
          error: response.msg,
        });
      }
    } catch (error) {
      setBankAccounts({
        ...bankAccounts,
        isLoading: false,
        error: ErrorManager.handleRequestError(error),
      });
    }
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

  const AccountStatus = (status: boolean) => {
    return status === false ? (
      <div className="flex items-center justify-center">
        <span className="bg-red-600 rounded-full h-4 w-4 inline-flex mr-1.5"></span>
        {t("label.confirmationRequired")}
      </div>
    ) : (
      <div className="flex items-center justify-center">
        <span className="bg-green-600 rounded-full h-4 w-4 inline-flex mr-1.5"></span>
        {t("label.confirmed")}
      </div>
    );
  };

  const removeBtnHandler = async (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    event.preventDefault();
    setRemoveAccount({ ...removeAccount, isLoading: true, error: "" });
    try {
      const response = await walletRemoveAccount(id);
      if (response.status === RESPONSE_SUCCESS) {
        setRemoveAccount({ ...removeAccount, isLoading: false, error: "" });
        getBankAccounts();
      } else {
        setRemoveAccount({
          ...removeAccount,
          isLoading: false,
          error: response.msg,
        });
      }
    } catch (error) {
      setRemoveAccount({
        ...removeAccount,
        isLoading: false,
        error: ErrorManager.handleRequestError(error),
      });
    }
  };

  const AccountRemove = (id: number) => {
    return (
      <button
        onClick={(e) => removeBtnHandler(e, id)}
        className="remove flex w-6 h-5 cursor-pointer bg-red-500 rounded"
      >
        <img
          className="object-cover w-6 h-5"
          src={removeIcon}
          alt=""
        />
      </button>
    );
  };

  return (
    <>
      <div className="relative flex text-sec-black mb-4 justify-between items-center">
        <h3 className="flex text-xl font-semibold">{t("label.bankAccount")}</h3>
        <NomadBtn
          onClick={() => {
            if (banks.banks.length === 0) {
              getBank();
            }
            if (fiats.fiats.length === 0) {
              getFiats();
            }

            setAddAccountShowing(!isAddAccountShowing);
          }}
          type={BtnType.secondary}
        >
          {t("label.addNewAccount")}
        </NomadBtn>
        <AddAccountDialog
          isOpen={isAddAccountShowing}
          setIsOpen={setAddAccountShowing}
        />
        {/* <Modal */}
      </div>
      <div className="bg-white border border-tab-border rounded-lg">
        <div className="table-wrap relative overflow-x-auto">
          <table className="w-full table-auto border-spacing-1">
            <thead>
              <tr>
                <th className="p-3 text-pro-label text-xs font-bold text-left">
                  {t("label.fiat")}
                </th>
                <th className="p-3 text-pro-label text-xs font-bold text-left">
                  {t("label.bankName")}
                </th>
                <th className="p-3 text-pro-label text-xs font-bold text-left">
                  {t("label.bankAccount")}
                </th>
                <th className="p-3 text-pro-label text-xs font-bold text-left">
                  {t("label.accountName")}
                </th>
                <th className="p-3 text-pro-label text-xs font-bold text-left">
                  {t("label.status")}
                </th>
                <th className="p-3 text-pro-label text-xs font-bold text-left">
                  {t("label.action")}
                </th>
              </tr>
            </thead>
            <tbody>
              <>
                {bankAccounts.accounts.length < 0 ? (
                  <td colSpan={6} className="p-3 text-td font-semibold text-sm">
                    {t("label.accountNotFound")}
                  </td>
                ) : (
                  bankAccounts.accounts.map((account, index) => {
                    return (
                      <tr
                        key={index}
                        className="bg-white odd:bg-tab even:bg-white"
                      >
                        {
                          <>
                            <td
                              colSpan={1}
                              className="p-3 text-td font-semibold text-sm"
                            >
                              {account.fiatCode}
                            </td>
                            <td
                              colSpan={1}
                              className="p-3 text-td font-semibold text-sm"
                            >
                              {account.bankName}
                            </td>
                            <td
                              colSpan={1}
                              className="p-3 text-td font-semibold text-sm"
                            >
                              {account.accountNo}
                            </td>
                            <td
                              colSpan={1}
                              className="p-3 text-td font-semibold text-sm"
                            >
                              {account.accountName}
                            </td>
                            <td
                              colSpan={1}
                              className="p-3 text-td font-semibold text-sm"
                            >
                              {AccountStatus(account.confirmedFlag)}
                            </td>
                            <td
                              colSpan={1}
                              className="p-3 text-td font-semibold text-sm"
                            >
                              {AccountRemove(account.id)}
                            </td>
                          </>
                        }
                      </tr>
                    );
                  })
                )}
              </>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProfileAccount;
