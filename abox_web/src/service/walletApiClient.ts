import { URL_BACKEND_FIAT_HISTORY, URL_BACKEND_WALLET_ACTIVE_FIAT_LIST, URL_BACKEND_WALLET_ADD_ACCOUNT, URL_BACKEND_WALLET_BANK_LIST, URL_BACKEND_WALLET_DEPOSIT, URL_BACKEND_WALLET_MY_BALANCE, URL_BACKEND_WALLET_MY_BANK_ACCOUNTS, URL_BACKEND_WALLET_WITHDRAW } from "../app/appConst";
import BadResponseError from "../error/BadResponseError";
import MessageResponseDto from "../models/MessageResponseDto";
import { AddBankAccountRequestDto } from "../models/wallet/AddBankAccountRequestDto";
import { BalanceResponseDto } from "../models/wallet/BalanceResponseDto";
import { BankListResponseDto } from "../models/wallet/BankListResponseDto";
import { FiatHistoryResponseDto } from "../models/wallet/FiatHistoryResponseDto";
import { FiatListResponseDto } from "../models/wallet/FiatListResponseDto";
import { MyBankAccountResponseDto } from "../models/wallet/MyBankAccountResponseDto";
import { WalletDepositResponseDto } from "../models/wallet/WalletDepositResponseDto";
import { WalletWithdrawRequestDto } from "../models/wallet/WalletWithdrawRequestDto";
import { ApiClient, ApiUtility } from "../utility/ApiUtility";

// ================================================================== //
export const walletBankList = async () => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = URL_BACKEND_WALLET_BANK_LIST;
  
  const response = await ApiClient().get<BankListResponseDto>(url, config);
  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const walletAddAccount = async (request:AddBankAccountRequestDto) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = URL_BACKEND_WALLET_ADD_ACCOUNT;
  
  const response = await ApiClient().post<MessageResponseDto>(url, JSON.stringify(request), config);
  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const walletListActiveFiat = async () => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = URL_BACKEND_WALLET_ACTIVE_FIAT_LIST;
  
  const response = await ApiClient().get<FiatListResponseDto>(url, config);
  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const walletMyBankAccounts = async () => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = URL_BACKEND_WALLET_MY_BANK_ACCOUNTS;
  
  const response = await ApiClient().get<MyBankAccountResponseDto>(url, config);
  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const walletMyBalance = async () => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = URL_BACKEND_WALLET_MY_BALANCE;
  
  const response = await ApiClient().get<BalanceResponseDto>(url, config);
  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const walletFiatHistory = async ({fiatcode, page, size}:{fiatcode:string, page:number, size:number}) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = `${URL_BACKEND_FIAT_HISTORY}?fiat-code=${fiatcode}&page=${page}&size=${size}`;
  
  const response = await ApiClient().get<FiatHistoryResponseDto>(url, config);
  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const walletWithdraw = async (request:WalletWithdrawRequestDto) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = URL_BACKEND_WALLET_WITHDRAW;
  
  const response = await ApiClient().get<MessageResponseDto>(url, config);
  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const walletDeposit = async ({fiatcode}:{fiatcode:string}) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  }
  const url = `${URL_BACKEND_WALLET_DEPOSIT}?fiat-code=${fiatcode}`;
  
  const response = await ApiClient().get<WalletDepositResponseDto>(url, config);
  if(response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}
