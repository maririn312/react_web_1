import { AuctionDto } from "./AuctionDto";

export interface MyAuctionResponseDto {
  msg:      string;
  status:   number;
  page:     number;
  size:     number;
  total:    number;
  auctions: AuctionDto[];
}
