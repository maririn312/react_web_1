import { ImageDto } from "../ImageDto";
import { AuctionLogisticsInfo } from "./AuctionLogisticsInfo";

export interface AuctionDetailResponseDto {
  msg:              string;
  status:           number;
  auction:          AuctionDetailDto;
  logistics_info:   AuctionLogisticsInfo;
  pending_payments: PendingPaymentDto[];
}

export interface AuctionDetailDto {
  inquire_id:               string;
  auction_id:               number;
  status:                   number;
  status_text:              string;
  name:                     string;
  description:              string;
  permission:               string;
  condition:                PurpleConditionDto;
  categories:               FactoryDto[];
  factory:                  FactoryDto;
  product:                  FactoryDto;
  initial_price:            number;
  start_date:               string;
  end_date:                 string;
  has_buy_it_now:           boolean;
  buy_it_now_price:         number;
  fiat_code:                string;
  conditions:               ConditionElementDto[];
  images:                   ImageDto[];
  fee:                      number;
  fee_balance:              number;
  feedback:                 string;
  creator:                  string;
  subscribed_flag:          boolean;
  winning_price:            number;
  who_pays_the_freight:     string;
  who_pays_the_freight_txt: string;
  freight_id:               number;
}

export interface PurpleConditionDto {
  id:          number;
  code:        string;
  name:        string;
  description: string;
}

export interface ConditionElementDto {
  id:          number;
  auction_id:  number;
  name:        string;
  value:       string;
  arrangement: number;
}

export interface FactoryDto {
  id:                number;
  name:              string;
  icon:              string;
  factory:           null;
  category:          null;
  total_active_item: number;
  parent_id?:        number | null;
  factory_id:        number;
}

export interface PendingPaymentDto {
  invoice_id:     number;
  statement:      string;
  fiat_symbol:    string;
  has_to_pay:     number;
  has_expiration: boolean;
  expire_at:      string;
}
