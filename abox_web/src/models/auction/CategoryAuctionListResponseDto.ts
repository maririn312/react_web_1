import { AuctionDto } from "./AuctionDto";

export interface CategoryAuctionListResponseDto {
  msg:      string;
  status:   number;
  page:     number;
  size:     number;
  total:    number;
  auctions: AuctionDto[];
}
