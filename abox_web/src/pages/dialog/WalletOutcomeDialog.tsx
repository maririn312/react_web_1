import { Dialog } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../app/hooks";
import clsx from 'clsx';
import { BxButton, BxButtonType, BxInput } from "../../components";
import { useState } from "react";
import { BxSelect } from "../../components/bx/BxSelect";
import { MyAccountDto } from "../../models/wallet/MyBankAccountResponseDto";
import StringUtility from "../../utility/StringUtility";
import { BxKeyboardType } from "../../components/bx/BxInput";
import { walletWithdraw } from "../../service/walletApiClient";
import { WalletWithdrawRequestDto } from "../../models/wallet/WalletWithdrawRequestDto";
import { RESPONSE_ERROR, RESPONSE_SUCCESS } from "../../app/appConst";
import ErrorManager from "../../utility/ErrorManager";

interface WalletOutcomeDialogProps {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  accounts: MyAccountDto[],
}

export const WalletOutcomeDialog = ({isOpen, setIsOpen, accounts}:WalletOutcomeDialogProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    isLoading: false,
    error: '',
    account: '',
    accountError: '',
    amount: '',
    amountError: '',
    password: '',
    passwordError: '',
  });

  // ======================================================= //
  // ======================================================= //
  function validateForm() {
    let hasError = false;
    if(accounts === undefined) {
      setForm({...form, accountError: t('error.select')});
      hasError = true;
    }
    if(!StringUtility.isValidText(form.amount)) {
      setForm({...form, amountError: t('error.errorField')});
      hasError = true;
    }
    if(!StringUtility.isValidText(form.password)) {
      setForm({...form, passwordError: t('error.errorField')});
      hasError = true;
    }
    return !hasError;
  }

  // ======================================================= //
  // ======================================================= //
  async function withdraw(request:WalletWithdrawRequestDto) {
    try {
      const response = await walletWithdraw(request);
      if(response.status === RESPONSE_SUCCESS) {
        setForm({...form, isLoading: false});
      } else if(response.status === RESPONSE_ERROR) {
        setForm({...form, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setForm({...form, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  // ======================================================= //
  // ======================================================= //
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  // ======================================================= //
  // ======================================================= //
  return (
    <Dialog
      open={isOpen}
        onClose={setIsOpen}
        as="div"
        className={clsx(
          "fixed inset-0 z-10 flex items-center justify-center overflow-y-auto",
          {
            "bg-gray-900 bg-opacity-50": isOpen === true,
          },
        )}
    >
      <div className="flex flex-col bg-white text-black w-100 py-6 px-4 text-center rounded-lg">
        <form>
          <div className="form-control">
            <label className="label text-sm">
              <span>{t("label.account")}</span>
            </label>
            <BxSelect
              id='account'
              name='account'
              onChange={(event) => {
                setForm({...form, account: event.target.value});
              }}
              data={new Map<string, string>(
                accounts.map((item, index) => {
                  return [item.id.toString(), item.account_name];
                })
              )}
            />
          </div>
          <div className="mb-3"></div>
          <div className="form-control">
            <label className="label text-sm">
              <span>{t("label.amount")}</span>
            </label>
            <BxInput
              id='amount'
              name='amount'
              placeholder={t("label.amount")}
              value={form.amount}
              onChange={handleChange}
              inputType={BxKeyboardType.currency}
            />
          </div>
          <div className="mb-3"></div>
          <div className="form-control">
            <label className="label text-sm">
              <span>{t("label.password")}</span>
            </label>
            <BxInput
              id='password'
              name='password'
              placeholder={t("label.password")}
              obscureText={true}
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <div className="mt-5">
            <BxButton className="w-full" type={BxButtonType.gradient} 
              isLoading={form.isLoading}
              onClick={() => {
                if(validateForm()) {
                  withdraw({
                    pin_code: form.password,
                    amount: Number(form.amount),
                    account_id: Number(form.account),
                  });
                }
              }}
            >
              {t('action.withdraw')}
            </BxButton>
          </div>
          <div className="mt-3">
            <BxButton className="w-full" type={BxButtonType.bordered} 
              onClick={() => {
                setIsOpen(false);
              }}
            >
              {t('action.back')}
            </BxButton>
          </div>
        </form>
      </div>
    </Dialog>
  );
}