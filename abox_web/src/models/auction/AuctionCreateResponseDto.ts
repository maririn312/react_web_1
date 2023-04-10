import { AuctionLogisticsArea } from "./AuctionLogisticsArea";
import { AuctionLogisticsInfo } from "./AuctionLogisticsInfo";

export interface CreateAuctionResponseDto {
  msg:            string;
  status:         number;
  id:             number;
  logistics_info: AuctionLogisticsInfo;
  buy_bow_flag:   boolean;
  buy_now_percentage: number;
}
