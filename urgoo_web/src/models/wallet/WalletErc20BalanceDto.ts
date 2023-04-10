export interface WalletErc20BalanceDto {
    msg:      string;
    status:   number;
    address:  string;
    balances: Erc20BalanceDto[];
}

export interface Erc20BalanceDto {
    type:                string;
    symbol:              string;
    code:                string;
    name:                string;
    bsNetworkId:         number;
    decimal:             number;
    available:           number;
    withdrawAllowedFlag: boolean;
    withdrawPercentage:  number;
}
