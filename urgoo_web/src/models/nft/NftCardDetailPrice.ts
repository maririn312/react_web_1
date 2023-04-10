export interface NftCardDetailPriceDto {
    id:          number;
    nftId:       number;
    unitPrice:   number;
    type:        string;
    symbol:      string;
    bsNetworkId: number | null;
    decimal:     number;
    tokenId:     null;
    fiatId:      null;
}
