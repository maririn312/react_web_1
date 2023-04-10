export interface AuctionDataRequestDto {
  inquire_id:      string;
  description:     string;
  categories:      number[];
  product_id:      number;
  factory_id:      number;
  condition:       string;
  name:            string;
  selling_details: SellingDetails;
  freight_details: FreightDetails;
}

export interface FreightDetails {
  who_pays_delivery:  string;
}

export interface SellingDetails {
  initial_price:    number;
  start_date:       string;
  end_date:         string;
  has_buy_it_now:   boolean;
  buy_it_now_price: number;
  fiat_code:         string;
}
