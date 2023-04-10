import { AuctionLogisticsArea } from "./AuctionLogisticsArea";
 
 export interface AuctionLogisticsInfo {
  pickup_section:   AuctionPickupSectionDto;
  delivery_section: AuctionDeliverySectionDto;
}

export interface AuctionDeliverySectionDto {
  warning:          string;
  areas:            AuctionLogisticsArea[];
  who_pays_the_fee: WhoPaysTheFeeDto[];
}

export interface AuctionPickupSectionDto {
  warning:          string;
  areas:            AuctionLogisticsArea[];
  time:             string;
}

export interface WhoPaysTheFeeDto {
  code: string,
  text: string,
}