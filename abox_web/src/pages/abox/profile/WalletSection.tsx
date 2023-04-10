import { FunctionComponent, useEffect, useState } from "react";
import { Divider } from "react-daisyui";
import { useTranslation } from "react-i18next";
import { RESPONSE_SUCCESS, TRANSACTION_IN, TRANSACTION_OUT } from "../../../app/appConst";
import { BxButton, BxButtonType, BxInput, BxLoadingIndicator } from "../../../components";
import { BxCard } from "../../../components/bx/BxCard";
import { BalanceFiatDto } from "../../../models/wallet/BalanceResponseDto";
import { MyAccountDto } from "../../../models/wallet/MyBankAccountResponseDto";
import { walletAddAccount, walletBankList, walletFiatHistory, walletListActiveFiat, walletMyBalance, walletMyBankAccounts } from "../../../service/walletApiClient";
import ErrorManager from "../../../utility/ErrorManager";
import StringUtility from "../../../utility/StringUtility";
import clsx from "clsx";
import { BxMessage, BxMessageType } from "../../../components/bx/BxMessage";
import { BxSelect } from "../../../components/bx/BxSelect";
import { BankDto } from "../../../models/wallet/BankListResponseDto";
import { FiatDto } from "../../../models/wallet/FiatListResponseDto";
import { userState } from "../../../redux/user/userSlice";
import { FiatHistoryDto } from "../../../models/wallet/FiatHistoryResponseDto";
import { IoMdAddCircle } from 'react-icons/io';
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from 'react-icons/fa';
import { useTimeoutFn } from 'react-use'
import { Transition } from "@headlessui/react";
import { WalletIncomeDialog } from "../../dialog/WalletIncomeDialog";
import { WalletOutcomeDialog } from "../../dialog/WalletOutcomeDialog";
import { BxPagination } from "../../../components/bx/BxPagination";

interface WalletSectionProps {
  
}

const WalletSection:FunctionComponent<WalletSectionProps> = (props:WalletSectionProps) => {
  const { t } = useTranslation();

  const [isAddAccountShowing, setAddAccountShowing] = useState(false);
  const [isWithdrawDialogOpen, setWithdrawDialogOpen] = useState<boolean>(false);
  const [isDepositDialogOpen, setDepositDialogOpen] = useState<boolean>(false);

  const [bankAccounts, setBankAccounts] = useState({
    isLoading: false,
    error: '',
    accounts: Array<MyAccountDto>()
  });

  const [balance, setBalance] = useState({
    isLoading: false,
    error: '',
    balances: Array<BalanceFiatDto>()
  });

  const [banks, setBanks] = useState({
    isLoading: false,
    error: '',
    banks: Array<BankDto>()
  });

  const [fiats, setFiats] = useState({
    isLoading: false,
    error: '',
    fiats: Array<FiatDto>()
  });

  const [fiatHistory, setFiatHistory] = useState({
    isLoading: false,
    error: '',
    page: 0,
    size: 20,
    currentPage: 0,
    totalPage: 0,
    histories: Array<FiatHistoryDto>()
  });

  const [accountForm, setAccountForm] = useState({
    accountNo: '',
    accountNoError: '',
    accountName: '',
    accountNameError: '',
    fiat: '',
    fiatError: '',
    bank: '',
    bankError: '',
    isLoading: false,
    error: '',
  });

  // ======================================================= //
  // ======================================================= //
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccountForm({ ...accountForm, [event.target.name]: event.target.value });
  }

  // ======================================================= //
  // ======================================================= //
  function validateAccountForm() {
    setAccountForm({
      ...accountForm,
      accountNameError: '',
      accountNoError: '',
      fiatError: '',
      bankError: ''
    });

    if(!StringUtility.isValidText(accountForm.accountName)) {
      setAccountForm({...accountForm, accountNameError: t('error.errorField')});
      return false;
    }
    if(!StringUtility.isValidText(accountForm.accountNo)) {
      setAccountForm({...accountForm, accountNoError: t('error.errorField')});
      return false;
    }
    if(!StringUtility.isValidText(accountForm.bank)) {
      setAccountForm({...accountForm, bankError: t('error.errorSelect')});
      return false;
    }
    if(!StringUtility.isValidText(accountForm.fiat)) {
      setAccountForm({...accountForm, fiatError: t('error.errorSelect')});
      return false;
    }
    return true;
  }

  // ================================================================== //
  useEffect(() => {
    getBalance();
    getBankAccounts();
  }, []);
  
  // ================================================================== //
  useEffect(() => {
    if(bankAccounts.accounts.length > 0) {
      const fiatcode = bankAccounts.accounts[0].fiat_code;
      getTransactionHistory(fiatcode, fiatHistory.page, fiatHistory.size);
    }
  }, [bankAccounts.accounts])

  // ================================================================== //
  async function getBalance() { 
    setBalance({...balance, isLoading: true, error: ''});
    try {
      const response = await walletMyBalance();
      if(response.status === RESPONSE_SUCCESS) {
        setBalance({...balance, isLoading: false, balances: response.fiats});
      } else {
        setBalance({...balance, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setBalance({...balance, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  // ================================================================== //
  async function getBankAccounts() { 
    setBankAccounts({...bankAccounts, isLoading: true, error: ''});
    try {
      const response = await walletMyBankAccounts();
      if(response.status === RESPONSE_SUCCESS) {
        setBankAccounts({...bankAccounts, isLoading: false, accounts: response.my_accounts});
      } else {
        setBankAccounts({...bankAccounts, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setBankAccounts({...bankAccounts, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  // ================================================================== //
  async function addBankAccount() { 
    setBankAccounts({...bankAccounts, isLoading: true, error: ''});
    try {
      const response = await walletAddAccount({
        account_no: accountForm.accountNo,
        account_name: accountForm.accountName,
        bank_code: accountForm.bank,
        fiat_code: accountForm.fiat,
      });
      if(response.status === RESPONSE_SUCCESS) {
        setBankAccounts({...bankAccounts, isLoading: false});
        getBankAccounts();
        getBalance();
      } else {
        setBankAccounts({...bankAccounts, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setBankAccounts({...bankAccounts, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  // ================================================================== //
  async function getFiats() {
    setFiats({...fiats, isLoading: true, error: ''});
    try {
      const response = await walletListActiveFiat();
      if(response.status === RESPONSE_SUCCESS) {
        setFiats({...fiats, isLoading: false, fiats: response.fiats});
      } else {
        setFiats({...fiats, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setFiats({...fiats, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  // ================================================================== //
  async function getBank() {
    setBanks({...banks, isLoading: true, error: ''});
    try {
      const response = await walletBankList();
      if(response.status === RESPONSE_SUCCESS) {
        setBanks({...banks, isLoading: false, banks: response.banks});
      } else {
        setBanks({...banks, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setBanks({...banks, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  // ================================================================== //
  async function getTransactionHistory(fiatcode:string, page:number, size:number) { 
    setFiatHistory({...fiatHistory, isLoading: true, error: ''});
    try {
      const response = await walletFiatHistory({fiatcode, page, size});
      if(response.status === RESPONSE_SUCCESS) {
        setFiatHistory({...fiatHistory, 
          isLoading: false, 
          histories: response.histories, 
          totalPage: response.total,
          currentPage: response.page,
        });
      } else {
        setFiatHistory({...fiatHistory, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setFiatHistory({...fiatHistory, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  // ================================================================== //
  const WalletFiat = () => {
    if(balance.isLoading) {
      return (
        <div className="w-full">
          <BxCard className="glass bg-primary hover:bg-primary w-full">
            <div className="h-52 pl-10 grid content-center justify-self-center">
              <BxLoadingIndicator color="white"/>
            </div>
          </BxCard>
        </div>
      );
    }
    
    return (
      <div className="gap-4">
        {balance.balances.map((item, index) => {
          return (
            <BxCard className="glass bg-primary hover:bg-primary w-full">
              <div className="card-body text-white">
                
                <div className="grid grid-cols-2 gap-8">

                  <div className="">
                    <div>{t('label.totalBalance')}</div>
                    <div className="text-3xl font-bold">{StringUtility.numberToCurrency(item.balance, item.fiat_symbol)}</div>
                  </div>

                  <div className="flex flex-col gap-2 items-end">
                    <button className="btn btn-sm text-primary w-44 btn-accent no-animation"
                      onClick={() => {
                        setWithdrawDialogOpen(true);
                      }}
                    >
                      <span><FaArrowAltCircleUp size={15} className="mr-1"/></span>
                      {t('action.outcome')}
                    </button>
                    <button className="btn btn-sm text-primary w-44 btn-accent no-animation"
                      onClick={() => {
                        setDepositDialogOpen(true);
                      }}
                    >
                      <span><FaArrowAltCircleDown size={15} className="mr-1"/></span>
                      {t('action.income')}
                    </button>
                  </div>

                </div>
                <div className="card-actions justify-end">
                  
                </div>
              </div>
              <WalletIncomeDialog isOpen={isDepositDialogOpen} setIsOpen={setDepositDialogOpen} fiat={item.fiat_code}/>
              <WalletOutcomeDialog isOpen={isWithdrawDialogOpen} setIsOpen={setWithdrawDialogOpen} accounts={bankAccounts.accounts}/>
            </BxCard>
          )
        })}
      </div>
    );
  }

  // ================================================================== //
  const TransactionHistory = () => {
    return (
      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th></th> 
              <th>{t('label.type')}</th>
              <th>{t('label.amount')}</th> 
              <th>{t('label.date')}</th>
            </tr>
          </thead> 
          <tbody>
            {StringUtility.isListEmpty(fiatHistory.histories) ? t('label.empty') : <></>}
            {fiatHistory.histories.map((item, index) => {
              let type;
              if(item.type === TRANSACTION_IN) {
                type = <span className="badge badge-success text-xs">{t('label.income')}</span>;
              } else if(item.type === TRANSACTION_OUT) {
                type = <span className="badge badge-error text-xs">{t('label.outcome')}</span>;
              }
              
              return (
                <tr>
                  <th>{(fiatHistory.page + 1) * index + 1}</th> 
                  <td>{type ?? ""}</td> 
                  <td><span className="font-semibold">{item.amount}</span></td> 
                  <td>{item.date}</td>
                </tr>
              );
            })}
          </tbody> 
          <tfoot>
            <tr>
              <th></th> 
              <th>{t('label.type')}</th>
              <th>{t('label.amount')}</th> 
              <th>{t('label.date')}</th>
            </tr>
          </tfoot>
        </table>
        <div className="py-6 w-full grid justify-items-stretch">
          <div className="justify-self-center">
            <BxPagination totalPage={10} currentPage={1}/>
          </div>
        </div>
      </div>
    );
  }

  // ================================================================== //
  const WalletAccounts = () => {
    // if(bankAccounts.isLoading) {
    //   return <BxCard className="w-full" hasHover={false}>
    //     <div className="card-body">
    //       <BxLoadingIndicator/>
    //     </div>
    //   </BxCard>
    // }

    return (
      <div className="2xl:w-96">
        <Transition 
          show={isAddAccountShowing}
          as="div"
          enter="transform transition duration-[200ms]"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transform duration-200 transition ease-in-out"
          leaveFrom="opacity-100 scale-100 "
          leaveTo="opacity-0 scale-95 "
        >
          <BxCard className="mb-5">
            <div className="card-body">
              <h1>{accountForm.error}</h1>
              <BxMessage type={BxMessageType.info} message={t('description.addAccount')} />
              <BxMessage type={BxMessageType.error} message={accountForm.error} />
              <form>
                <div className="form-control">
                  <label className="label">
                    <span>{t("label.accountName")}</span>
                  </label>
                  <BxInput
                    id='accountName'
                    name='accountName'
                    placeholder={t("label.accountName")}
                    error={accountForm.accountNameError}
                    onChange={handleChange}
                    value={accountForm.accountName}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span>{t("label.accountNo")}</span>
                  </label>
                  <BxInput
                    id='accountNo'
                    name='accountNo'
                    placeholder={t("label.accountNo")}
                    error={accountForm.accountNoError}
                    onChange={handleChange}
                    value={accountForm.accountNo}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span>{t("label.bank")}</span>
                  </label>
                  <BxSelect
                    name='bank'
                    error={accountForm.bankError}
                    isLoading={banks.isLoading}
                    onChange={(event) => {
                      setAccountForm({...accountForm, bank: event.target.value});
                    }}
                    data={new Map<string, string>(
                      banks.banks.map((item, index) => {
                        return [item.code, item.name];
                      })
                    )}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span>{t("label.fiat")}</span>
                  </label>
                  <BxSelect 
                    name='fiat'
                    error={accountForm.fiatError}
                    isLoading={fiats.isLoading}
                    onChange={(event) => {
                      setAccountForm({...accountForm, fiat: event.target.value});
                    }}
                    data={new Map<string, string>(
                      fiats.fiats.map((item, index) => {
                        return [item.code, item.name];
                      })
                    )}
                  />
                </div>
                <BxMessage
                  type={BxMessageType.error}
                  message={accountForm.error}
                />
                <div className="form-control mt-4">
                  <BxButton
                    onClick={() => {
                      if(validateAccountForm()) {
                        addBankAccount();
                        setAccountForm({
                          ...accountForm,
                          accountName: '',
                          accountNo: '',
                          fiat: '',
                          bank: ''
                        });
                        setAddAccountShowing(false);
                      }
                    }}
                    isLoading={accountForm.isLoading}
                    type={BxButtonType.gradient}
                  >
                    {t("action.addBankAccount")}
                  </BxButton>
                </div>
              </form>
            </div>
          </BxCard>
        </Transition>
        <BxCard className="w-full" hasHover={false}>
          <div className="card-body">
            <div className="grid grid-cols gap-4">
            <div className="">
              {StringUtility.isListEmpty(bankAccounts.accounts) 
              ? <BxMessage
                  type={BxMessageType.warning}
                  message={t('label.empty')}
                /> 
              : <></>}
              {bankAccounts.accounts.map((item, index) => {
                return (
                  <div className="my-3"> 
                    <div>{item.bank_name} <span className="badge badge-info font-semibold text-white">{item.status_text}</span></div>
                    <div className="text-lg font-semibold">
                      <span>{item.account_no} - {item.account_name}</span> <span>({item.fiat_symbol})</span>
                    </div>
                  </div>
                );
              })}
            </div>
            </div>
            {/* <div className="card-actions justify-end">
              
            </div> */}
          </div>
        </BxCard>
      </div>
    );
  }

  // ================================================================== //
  return (
    <div className="md:grid lg:grid-cols-3 md:gap-4">
      <div className="lg:col-span-2">
        <div className="flex h-7">
          <h2 className="text-xl font-medium">{t('menu.wallet')}</h2>
        </div>
        <Divider/>
        {WalletFiat()}
        <h2 className="mt-8 mb-4 text-xl font-medium">{t('label.transactionHistory')}</h2>
        {TransactionHistory()}
      </div>

      <div className="">
        <div className="flex h-7 justify-between">
          <h2 className="text-xl font-medium">{t('label.account')}</h2>
          <span className="">
            <button className={clsx("btn btn-sm text-primary w-44 btn-accent no-animation", isAddAccountShowing ? "btn-active" : "")}
              onClick={() => {
                if(banks.banks.length === 0) {
                  getBank();
                }
                if(fiats.fiats.length === 0) {
                  getFiats();
                }
                setAddAccountShowing(!isAddAccountShowing);
              }}
            >
              <IoMdAddCircle size={17} className="mr-1"/> {t('action.addAccount')}
            </button>
          </span>
        </div>
        <Divider/>
        {WalletAccounts()}
      </div>
    </div>
  );
}

export default WalletSection;