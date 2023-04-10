import { AuctionDto } from "./AuctionDto";

export interface PromotedAuctionResponseDto {
  msg:      string;
  status:   number;
  total:    number;
  auctions: AuctionDto[];
}