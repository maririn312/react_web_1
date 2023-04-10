import { request } from "http";
import {
  URL_BACKEND_BALANCE_CHARGE,
  URL_BACKEND_BALANCE_DISCHARGE,
  URL_BACKEND_BALANCE_HISTORY,
  URL_BACKEND_FIAT_MINE,
  URL_BACKEND_GET_BALANCE,
  URL_BACKEND_REMOVE_BANK_ACCOUNT,
  URL_BACKEND_TOKEN_HISTORY,
  URL_BACKEND_TOKEN_TRANSFER,
  URL_BACKEND_WALLET_ACTIVE_FIAT_LIST,
  URL_BACKEND_WALLET_ADD_ACCOUNT,
  URL_BACKEND_WALLET_BANK_LIST,
  URL_BACKEND_WALLET_MY_BANK_ACCOUNTS,
} from "../app/appConst";
import BadResponseError from "../error/BadResponseError";
import MessageResponseDto from "../models/MessageResponseDto";
import { AddbankAccountResponseDto } from "../models/account/AddbankAccountResponseDto";
import { BalanceHistoryResponseDto } from "../models/account/BalanceHistoryResponseDto";
import { BankListResponseDto } from "../models/account/BankListResponseDto";
import { FiatListResponseDto } from "../models/account/FiatListResponseDto";
import { MyBankAccountResponseDto } from "../models/account/MyBankAccountResponseDto";
import { ApiClient, ApiUtility } from "../utility/ApiUtility";
import { BalanceResponseDto } from "../models/account/BalanceResponseDto";
import { WalletBalanceResponseDto } from "../models/wallet/WalletBalanceResponseDto";
import { BalanceChargeResponseDto } from "../models/wallet/BalanceChargeResponseDto";
import { TokenTransferDto } from "../models/wallet/TokenTransferDto";
import { TokenHistoryResponseDto } from "../models/wallet/TokenHistoryResponseDto";
import { WalletDischargeRequestDto } from "../models/wallet/WalletDischargeResponseDto";

// ================================================================== //
export const walletBankList = async () => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  };
  const url = URL_BACKEND_WALLET_BANK_LIST;

  const response = await ApiClient().get<BankListResponseDto>(url, config);
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
};

// ================================================================== //
export const walletAddAccount = async (request: AddbankAccountResponseDto) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  };
  const url = URL_BACKEND_WALLET_ADD_ACCOUNT;

  const response = await ApiClient().post<MessageResponseDto>(
    url,
    JSON.stringify(request),
    config
  );
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
};

// ================================================================== //
export const walletMyBankAccounts = async () => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  };
  const url = URL_BACKEND_WALLET_MY_BANK_ACCOUNTS;

  const response = await ApiClient().get<MyBankAccountResponseDto>(url, config);
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
};

// ================================================================== //
export const walletListActiveFiat = async () => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  };
  const url = URL_BACKEND_WALLET_ACTIVE_FIAT_LIST;

  const response = await ApiClient().get<FiatListResponseDto>(url, config);
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
};

// ================================================================== //
export const walletBalanceHistory = async ({
  type,
  page,
  size,
}: {
  type: string;
  page: number;
  size: number;
}) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  };
  const url = `${URL_BACKEND_BALANCE_HISTORY}?type=${type}&page=${page}&size=${size}`;

  const response = await ApiClient().get<BalanceHistoryResponseDto>(
    url,
    config
  );
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
};

// ================================================================== //
export const walletTokenHistory = async ({
  type,
  page,
  size,
}: {
  type: string;
  page: number;
  size: number;
}) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  };
  const url = `${URL_BACKEND_TOKEN_HISTORY}?type=${type}&page=${page}&size=${size}`;
  const response = await ApiClient().get<TokenHistoryResponseDto>(url, config);
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
};

// ================================================================== //
export const walletRemoveAccount = async (id: number) => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  };
  const url = `${URL_BACKEND_REMOVE_BANK_ACCOUNT}?account-id=${id}`;

  const response = await ApiClient().delete<MessageResponseDto>(url, config);

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
};

// ================================================================== //
export const getFiatMine = async () => {
  const url = `${URL_BACKEND_FIAT_MINE}`;
  const response = await ApiClient().get<BalanceResponseDto>(url);

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
};

// ================================================================== //
export const getBalance = async () => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  };
  const url = `${URL_BACKEND_GET_BALANCE}`;
  const response = await ApiClient().get<WalletBalanceResponseDto>(url, config);

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
};

// ================================================================== //
export const balanceCharge = async () => {
  const config = {
    headers: ApiUtility.getRestHeader(),
  };

  const url = `${URL_BACKEND_BALANCE_CHARGE}`;
  const response = await ApiClient().get<BalanceChargeResponseDto>(url, config);

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
};

// ================================================================== //
export const balanceDischarge = async (request:WalletDischargeRequestDto) => {
  const url = `${URL_BACKEND_BALANCE_DISCHARGE}`;
  const response = await ApiClient().post<MessageResponseDto>(url, JSON.stringify(request));

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
}

// ================================================================== //
export const tokenTransfer = async (request: TokenTransferDto) => {
  const url = URL_BACKEND_TOKEN_TRANSFER;
  const response = await ApiClient().post<MessageResponseDto>(url, JSON.stringify(request));

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new BadResponseError(response.status);
};
