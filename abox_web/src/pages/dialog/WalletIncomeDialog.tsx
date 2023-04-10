import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../app/hooks";
import clsx from 'clsx';
import { Dialog } from "@headlessui/react";
import { BxButton, BxButtonType, BxInput } from "../../components";
import { DepositBank } from "../../models/wallet/WalletDepositResponseDto";
import { RESPONSE_SUCCESS } from "../../app/appConst";
import { walletDeposit } from "../../service/walletApiClient";
import ErrorManager from "../../utility/ErrorManager";
import StringUtility from "../../utility/StringUtility";
import { BxMessage, BxMessageType } from "../../components/bx/BxMessage";
import { MdOutlineContentCopy } from "react-icons/md";

interface WalletIncomeDialogProps {
  isOpen: boolean,
  fiat: string,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const WalletIncomeDialog = ({isOpen, fiat, setIsOpen}:WalletIncomeDialogProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  // ================================================================== //
  const [bank, setBank] = useState({
    isLoading: false,
    error: '',
    message: '',
    banks: Array<DepositBank>(),
  });

  const [account, setAccount] = useState({
    accountNo: '',
    accountName: '',
    statement: '',
  });

  const [selectedBank, setSelectedBank] = useState<string>();

  // ================================================================== //
  useEffect(() => {
    getDepositBanks();
  }, []);

  useEffect(() => {
    if(bank.banks.length > 0) {
      selectBank(bank.banks[0].bank_code);
    }
  }, [isOpen]);

  // ================================================================== //
  function selectBank(bankCode:string) {
    setSelectedBank(bankCode);
    const bnk = bank.banks.find(element => element.bank_code === bankCode);
    if(bnk !== undefined) {
      setAccount({
        accountName: bnk?.bank_name,
        accountNo: bnk?.account_no,
        statement: bnk?.bank_code,
      });
    }
  }

  // ================================================================== //
  async function getDepositBanks() { 
    setBank({...bank, isLoading: true, error: ''});
    try {
      const response = await walletDeposit({fiatcode: fiat});
      if(response.status === RESPONSE_SUCCESS) {
        setBank({...bank, isLoading: false, banks: response.banks, message: response.warn_message});
        if(response.banks.length > 0) {
          selectBank(response.banks[0].bank_code);
        } 
      } else {
        setBank({...bank, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setBank({...bank, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  // ================================================================== //
  const BankButton = (bank:DepositBank) => {
    const isSelected = bank.bank_code === selectedBank;

    return (
      <div className={clsx('rounded-md border-4 w-14', isSelected ? 'border-primary' : 'border-base-100')} 
        onClick={() => {
          selectBank(bank.bank_code);
        }}
      >
        <img className="rounded-md" alt={bank.bank_name} src={StringUtility.bankCodeToImagePath(bank.bank_code)}/>
      </div>
    );
  }

  // ================================================================== //
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
      <div className="flex flex-col bg-white text-black w-96 py-6 px-4 text-center rounded-lg">
        <div className="p-2">
          <BxMessage
            type={BxMessageType.info}
            message={bank.message}
          />
          <div className="mb-5"></div>
          <div>
            {bank.banks.map((item, value) => {
              return (
                <div>
                  {BankButton(item)}
                </div>
              );
            })}
          </div>
          <div className="mb-3"></div>
          <form>
            <div className="form-control">
              <label className="label text-sm">
                <span>{t("label.accountNo")}</span>
              </label>
              <div className="input-group">
                <BxInput
                  id='accountNo'
                  name='accountNo'
                  placeholder={t("label.accountNo")}
                  readonly={true}
                  value={account.accountNo}
                />
                <button 
                  type="button"
                  className="btn btn-square btn-primary"
                  onClick={() => {
                    navigator.clipboard.writeText(account.accountNo);
                  }}
                >
                  <MdOutlineContentCopy size={17}/>
                </button>
              </div>
            </div>
            <div className="mb-3"></div>
            <div className="form-control">
              <label className="label text-sm">
                <span>{t("label.accountName")}</span>
              </label>
              <div className="input-group">
                <BxInput
                  id='accountName'
                  name='accountName'
                  placeholder={t("label.accountName")}
                  readonly={true}
                  value={account.accountName}
                />
                <button 
                  type="button"
                  className="btn btn-square btn-primary"
                  onClick={() => {
                    navigator.clipboard.writeText(account.accountName);
                  }}
                >
                  <MdOutlineContentCopy size={17}/>
                </button>
              </div>
            </div>
            <div className="mb-3"></div>
            <div className="form-control">
              <label className="label text-sm">
                <span>{t("label.statementValue")}</span>
              </label>
              <div className="input-group">
                <BxInput
                  id='statementValue'
                  name='statementValue'
                  placeholder={t("label.statementValue")}
                  readonly={true}
                  value={account.statement}
                />
                <button 
                  type="button"
                  className="btn btn-square btn-primary"
                  onClick={() => {
                    navigator.clipboard.writeText(account.statement);
                  }}
                >
                  <MdOutlineContentCopy size={17}/>
                </button>
              </div>
            </div>
          </form>
          <div className="mt-5">
            <BxButton className="w-full" type={BxButtonType.gradient} 
              onClick={() => {
                setIsOpen(false);
              }}
            >
              {t('action.back')}
            </BxButton>
          </div>
        </div>
      </div>
    </Dialog>
  );

}