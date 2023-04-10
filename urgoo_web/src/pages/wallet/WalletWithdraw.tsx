import React, { useEffect, useState } from "react";
import NomadSelect from "../../components/nomad/NomadSelect";
import walletIcon from "../../assets/img/wallet_icon.svg";
import { useTranslation } from "react-i18next";
import NomadInput, { InputType } from "../../components/nomad/NomadInput";
import upIcon from "../../assets/img/up_icon.svg";
import downIcon from "../../assets/img/down_icon.svg";
import NomadBtn, { BtnType } from "../../components/nomad/NomadBtn";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import {
  getBalanceEvent,
  getBalanceState,
} from "../../redux/Wallet/balanceSlice";
import { fiatMineEvent, fiatMineState } from "../../redux/Wallet/fiatMineSlice";
import urgIcon from "../../assets/icons/urg_coin.webp";
import mntIcon from "../../assets/icons/mnt.svg";
import Select, {
  components,
  OptionProps,
  SingleValueProps,
} from "react-select";
import { MyAccountDto } from "../../models/account/MyBankAccountResponseDto";
import {
  balanceDischarge,
  tokenTransfer,
  walletMyBankAccounts,
} from "../../service/walletApiClient";
import { RESPONSE_SUCCESS } from "../../app/appConst";
import ErrorManager from "../../utility/ErrorManager";
import StringUtility from "../../utility/StringUtility";
import WithdrawConfirm from "../dialog/WithdrawConfirmDialog";
import WithdrawConfirmDialog from "../dialog/WithdrawConfirmDialog";
import { TabTitle } from "../../utility/TabTitleUtility";
import MnTranslation from "../../i18n/mn/translation.json";
import { WalletDischargeRequestDto } from "../../models/wallet/WalletDischargeResponseDto";
import NomadToast, { ToastAlert, ToastType } from "../../components/nomad/NomadToast";
import { WalletBalanceDto } from "../../models/wallet/WalletBalanceResponseDto";
import { FiatBalanceDto } from "../../models/wallet/WalletFiatBalanceDto";

export enum Type {
  URGX = "urgx",
  MNT = "mnt",
}

interface SelectType {
  value: string;
  text: string;
  icon: string;
  allowed: boolean;
  code: string;
  withdrawPercent: number
}

const WalletWithdraw = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<any>();
  const getBalances = useAppSelector(getBalanceState);
  const getFiat = useAppSelector(fiatMineState);

  TabTitle(MnTranslation.mainTitle.walletWithdraw);

  const [selectedOption, setSelectedOption] = useState<SelectType>();
  const [selectData, setSelectData] = useState<SelectType[]>([]);

  // const selectData: SelectType[] = [
  //   {
  //     value: Type.URGX,
  //     text: "URG COIN",
  //     icon: urgIcon,
  //   },
  //   {
  //     value: Type.MNT,
  //     text: "Монгол төгрөг",
  //     icon: mntIcon,
  //   },
  // ];

  const [bankAccounts, setBankAccounts] = useState({
    isLoading: false,
    error: "",
    accounts: Array<MyAccountDto>(),
  });

  const [accountForm, setAccountForm] = useState({
    accountId: 0,
    accountIdError: "",
    accountNo: "",
    accountNoError: "",
    accountName: "",
    accountNameError: "",
    fiat: "",
    fiatError: "",
    bank: "",
    bankError: "",
    amount: 0,
    amountError: "",
    isLoading: false,
    error: "",
  });

  const [coinForm, setCoinForm] = useState({
    address: "",
    addressError: "",
    amount: 0,
    amountError: "",
    tokenCode: "",
    bsNetworkId: 1,
    inquiredId: "",
    error: "",
    isLoading: false,
  });

  const [isCoinDialogShowing, setCoinDialog] = useState(false);
  const [isAccountDialogShowing, setAccountDialog] = useState(false);

  useEffect(() => {
    let buffer:SelectType[] = [];

    if(getFiat.balances !== undefined) {
      for(const balance of getFiat.balances) {
        buffer.push({
          value: balance.code,
          text: balance.name,
          code: balance.code,
          icon: mntIcon,
          allowed: true,
          withdrawPercent: 0
        });
      }
    }

    if(getBalances.balances !== undefined) {
      for(const balance of getBalances.balances) {
        buffer.push({
          value: balance.code,
          text: balance.name,
          code: balance.code,
          icon: urgIcon,
          allowed: balance.withdrawAllowedFlag,
          withdrawPercent: balance.withdrawPercentage,
        });
      }
    }
    
    setSelectData(buffer);
    if(buffer.length > 0) {
      setSelectedOption(buffer[0]);
    }
  }, [getFiat.balances, getBalances.balances, ]);

  // ================================================================== //
  useEffect(() => {
    if(getBalances.address === undefined) {
      dispatch(getBalanceEvent());
    }
  }, [getBalances.address]);

  // ================================================================== //
  useEffect(() => {
    if(getFiat.balances === undefined) {
      dispatch(fiatMineEvent());
    }
    getBankAccounts();
  }, [getFiat.balances]);

  // ================================================================== //
  function handleChange(e) {
    setSelectedOption(e);
  }

  // ================================================================== //
  function inputAccountChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAccountForm({
      ...accountForm,
      [event.target.name]: event.target.value,
    });
  }

  // ================================================================== //
  function accountBankChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setAccountForm({
      ...accountForm,
      accountId: parseInt(event.target.value),
    });
  }

  // ================================================================== //
  function inputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCoinForm({
      ...coinForm,
      [event.target.name]: event.target.value,
    });
  }

  // ================================================================== //
  function validateFiatForm() {
    setAccountForm({
      ...accountForm,
      accountNameError: "",
      accountNoError: "",
      fiatError: "",
      bankError: "",
    });

    if(accountForm.accountId === undefined) {
      setAccountForm({ ...accountForm, accountNameError: t('validation.fieldError') });
      return false;
    }
    if(accountForm.amount <= 0) {
      setAccountForm({ ...accountForm, accountNameError: t('validation.fieldError') });
      return false;
    }
    return true;
  }

  // ================================================================== //
  function validateCoinForm() {
    setCoinForm({
      ...coinForm,
      addressError: "",
      amountError: "",
    });
    if (!StringUtility.isValidText(coinForm.address)) {
      setCoinForm({ ...coinForm, addressError: t('validation.fieldError') });
      return false;
    }
    if (coinForm.amount <= 0) {
      setCoinForm({ ...coinForm, amountError: t('validation.fieldError') });
      return false;
    }
    return true;
  }

  // ================================================================== //
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

  // ================================================================== //
  async function makeTokenTransfer(password:string, tokenCode:string, bsNetworkId:number) {
    setCoinForm({ ...coinForm, isLoading: true });
    try {
      if(getBalances.balances !== undefined) {
        const response = await tokenTransfer({
          to: coinForm.address,
          amount: coinForm.amount.toString(),
          pinCode: password,
          tokenCode: tokenCode,
          bsNetworkId: bsNetworkId,
          inquireId: StringUtility.generateInquireId(),
        });
        if (response.status === RESPONSE_SUCCESS) {
          ToastAlert(response.msg, ToastType.SUCCESS);
          setCoinForm({ ...coinForm, isLoading: false });
        } else {
          ToastAlert(response.msg, ToastType.ERROR);
          setCoinForm({ ...coinForm, isLoading: false });
        }
      }
      setCoinDialog(false);
    } catch (error) {
      ToastAlert(ErrorManager.handleRequestError(error), ToastType.ERROR);
      setCoinDialog(false);
      setCoinForm({
        ...coinForm,
        isLoading: false
      });
    }
  }

  // ================================================================== //
  async function discharge(password:string) {
    setAccountForm({ ...accountForm, isLoading: true });
    try {
      const response = await balanceDischarge({
        inquireId: StringUtility.generateInquireId(),
        pinCode: password,
        dischargeAmount: accountForm.amount,
        bankAccountId: accountForm.accountId,
      });
      if (response.status === RESPONSE_SUCCESS) {
        ToastAlert(response.msg, ToastType.SUCCESS);
        setAccountForm({ ...accountForm, isLoading: false });
      } else {
        ToastAlert(response.msg, ToastType.ERROR);
        setAccountForm({ ...accountForm, isLoading: false });
      }
      setAccountDialog(false);
    } catch (error) {
      ToastAlert(ErrorManager.handleRequestError(error), ToastType.ERROR);
      setAccountDialog(false);
      setAccountForm({
        ...accountForm,
        isLoading: false
      });
    }
  }

  // ================================================================== //
  const SingleValue = (singleValueProps: SingleValueProps<SelectType>) => {
    const { data: { value, text, icon }} = singleValueProps;

    return (
      <components.SingleValue {...singleValueProps}>
        <span className="flex items-center py-2">
          {icon && <img height={28} width={28} src={icon} alt={value} />}
          <span className="ml-2">{text}</span>
        </span>
      </components.SingleValue>
    );
  };

  // ================================================================== //
  const Option = (optionProps: OptionProps<SelectType>) => {
    const { data } = optionProps;
    return (
      <components.Option {...optionProps}>
        <span className="flex items-center py-2">
          {data.icon && (
            <img height={28} width={28} src={data.icon} alt={data.value} />
          )}
          <span className="ml-2">{data.text}</span>
        </span>
      </components.Option>
    );
  };

  // ================================================================== //
  const CoinSection = (coin:WalletBalanceDto) => {
    
    const fee = coin.withdrawAllowedFlag ? (coinForm.amount/100) * coin.withdrawPercentage : 0;

    return (
      <>
        <form>
          <div className="form__item relative table w-full mb-5">
            <label className="flex text-pro-label font-semibold mb-1.5">
              {t('label.withdrawingAddress')}
              <span className="ml-1 text-xs text-notif">
                ({t('description.onlyBEP20network')})
              </span>
            </label>
            <NomadInput
              id="address"
              name="address"
              value={coinForm.address}
              error={coinForm.addressError}
              onChange={inputChange}
              placeholder="Хаяг"
            />
          </div>
          <div className="form__item relative table w-full mb-5">
            <label className="flex text-pro-label font-semibold mb-1.5">
              {t('label.withdrawAmount')}
            </label>
            <NomadInput
              id="amount"
              name="amount"
              value={coinForm.amount.toString()}
              error={coinForm.amountError}
              placeholder="0.00"
              onChange={inputChange}
            />
          </div>

          <div className="text-pro-label font-semibold">
            {t("label.potentialBalance")}
          </div>
          <div className="text-pro-label font-semibold mt-1">
            {t('label.withdrawLowLimit')}
            <span className="text-sec-black ml-1">
              {t("label.coinLimit")} {coin.symbol} -
              <i className="text-notif text-[11px]">{t('label.coinLimitAlert')}</i>
            </span>
          </div>
          <div className={`mt-6 grid grid-cols-2 border border-updown`}>
            <div className="p-2.5 bg-tab">
              <div className="grid gap-2.5 grid-cols-24px">
                <img className="flex h-6 w-6" src={upIcon} />
                <div>
                  <label className="flex text-pro-label font-semibold mb-1.5">
                    {t("label.feeAmount")}
                  </label>
                  <h4 className="text-sm font-semibold">{StringUtility.numberToCurrency(fee)} {coin.symbol}</h4>
                </div>
              </div>
            </div>
            <div className="p-2.5 bg-tab">
              <div className="grid gap-2.5 grid-cols-24px">
                <img className="flex h-6 w-6" src={downIcon} />
                <div>
                  <label className="flex text-pro-label font-semibold mb-1.5">
                    {t("label.receiveAmount")}
                  </label>
                  <h4 className="text-sm font-semibold">{StringUtility.numberToCurrency(coinForm.amount - fee)} {coin.symbol}</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end items-center mt-6">
            <NomadBtn 
              type={BtnType.secondary} 
              className="text-xs px-5"
              isLoading={coinForm.isLoading}
              onClick={() => {
                if(validateCoinForm()) {
                  setCoinDialog(true);
                }
              }}
            >
              {t("label.makeWithdraw")}
            </NomadBtn>
            <WithdrawConfirmDialog 
              isOpen={isCoinDialogShowing}
              setIsOpen={setCoinDialog}
              action={(password:string) => {
                makeTokenTransfer(password, coin.code, coin.bsNetworkId);
              }}
            />
          </div>
        </form>
      </>
    );
  };

  // ================================================================== //
  const FiatSection = (fiat:FiatBalanceDto) => {
    return (
      <>
        <form>
          <div className="form__item relative table w-full mb-5">
            <label className="flex text-pro-label font-semibold mb-1.5">
              {t('label.withdrawAccount')}
            </label>
            <NomadSelect
              chooseDef={t("label.choiceAccount")}
              name="bank"
              key="bank"
              error={accountForm.error}
              selectChange={accountBankChange}
              data={
                new Map<string, string>(
                  bankAccounts.accounts.map((item, idx) => {
                    return [item.id.toString(), `${item.accountName} (${item.accountNo}) - ${item.bankName}`];
                  })
                )
              }
            />
            {/* <NomadInput value="" placeholder="Хаяг" /> */}
          </div>
          <div className="form__item relative table w-full mb-5">
            <label className="flex text-pro-label font-semibold mb-1.5">
              {t('label.withdrawAmount')}
            </label>
            <NomadInput 
              id="amount"
              name="amount"
              value={accountForm.amount.toString()}
              placeholder="0.00"
              onChange={inputAccountChange}
            />
          </div>
        </form>
        <div className={`mt-6 grid grid-cols-2 border border-updown`}>
          <div className="p-2.5 bg-tab">
            <div className="grid gap-2.5 grid-cols-24px">
              <img className="flex h-6 w-6" src={upIcon} />
              <div>
                <label className="flex text-pro-label font-semibold mb-1.5">
                  {t("label.feeAmount")}
                </label>
                <h4 className="text-sm font-semibold">500</h4>
              </div>
            </div>
          </div>
          <div className="p-2.5 bg-tab">
            <div className="grid gap-2.5 grid-cols-24px">
              <img className="flex h-6 w-6" src={downIcon} />
              <div>
                <label className="flex text-pro-label font-semibold mb-1.5">
                  {t("label.receiveAmount")}
                </label>
                <h4 className="text-sm font-semibold">
                  {StringUtility.numberToCurrency((accountForm.amount <= 500 ? 0 : accountForm.amount - 500))}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end items-center mt-6">
          <NomadBtn 
            type={BtnType.secondary} 
            disabled={false}
            className="text-xs px-5"
            isLoading={accountForm.isLoading}
            onClick={() => {
              if(validateFiatForm()) {
                setAccountDialog(true);
              }
            }}
          >
            {t("label.makeWithdraw")}
          </NomadBtn>
          <WithdrawConfirmDialog 
            isOpen={isAccountDialogShowing}
            setIsOpen={setAccountDialog}
            action={(password:string) => {
              discharge(password);
            }}
          />
        </div>
      </>
    );
  };

  // ================================================================== //
  const BalanceAmount = () => {
    const fiatBalance = getFiat.balances?.find(element => element.code === selectedOption?.code);
    const coinBalance = getBalances.balances?.find(element => element.code === selectedOption?.code);

    return (
      <div className="font-semibold mt-5">
        {fiatBalance !== undefined 
        ? <>
            <p className="text-lg ">{StringUtility.numberToCurrency(fiatBalance.balance)}</p>
            <p className="text-base">{fiatBalance.code}</p>
          </>
        : <></>
        }

        {coinBalance !== undefined 
        ? <>
            <p className="text-lg ">{StringUtility.numberToCurrency(coinBalance.available)}</p>
            <p className="text-base">{coinBalance.code}</p>
          </>
        : <></>
        }
      </div>
    );
  };

  // ================================================================== //
  const ActionSection = () => {
    const fiatBalance = getFiat.balances?.find(element => element.code === selectedOption?.code);
    if(fiatBalance !== undefined) {
      return FiatSection(fiatBalance);
    }

    const coinBalance = getBalances.balances?.find(element => element.code === selectedOption?.code);
    if(coinBalance !== undefined) {
      return CoinSection(coinBalance);
    }

    return (
      <></>
    );
  };

  const borderGray = "border-tab-border rounded-lg shadow-table";
  // ================================================================== //
  return (
    <>
      <h3 className="relative text-xl font-semibold mb-4 text-sec-black">
        {t("label.withdraw")}
      </h3>
      <div className={`bg-white border ${borderGray} grid`}>
        <div className="p-10">
          <label className="flex text-pro-label font-semibold mb-1.5 text-sm">
            {t("label.enterOutcome")}
          </label>
          <Select
            value={selectedOption}
            options={selectData}
            defaultValue={selectData}
            onChange={handleChange}
            isSearchable={false}
            components={{ SingleValue, Option }}
          />
          <div className="mt-7 grid ">
            <div className={`border ${borderGray} grid`}>
              <div className="p-5">
                <div className="grid gap-5 grid-cols-3">
                  <div className="grid grid-cols-24px gap-2.5 ">
                    <img className="flex h-6 w-6" src={walletIcon} />
                    <div>
                      <label className="text-count text-xs font-semibold mb-0.5">
                        {t("label.totalBalance")}
                      </label>
                      {BalanceAmount()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-10 border-t border-tab-border">
          {ActionSection()}
        </div>
      </div>
      <NomadToast/>
      {/* <h3 className="mt-10 relative text-sec-black text-xl font-semibold mb-4 flex items-center justify-between">
        {t("label.lastWithdrawHistory")}
        <a className="text-card text-sm cursor-pointer">
          {t("action.seeAllHistory")}
        </a>
      </h3>
      <div className={`bg-white border ${borderGray}`}>
        <div className="relative overflow-x-auto">
          <table className="w-full table-auto border-spacing-y-0 border-spacing-x-px">
            <thead>
              <tr>
                <th className={thead}>{t("label.date")}</th>
                <th className={thead}>{t("label.fiat")}</th>
                <th className={thead}>{t("label.size")}</th>
                <th className={thead}>{t("label.quantity")}</th>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
            </tbody>
          </table>
        </div>
      </div> */}
    </>
  );
};

export default WalletWithdraw;
