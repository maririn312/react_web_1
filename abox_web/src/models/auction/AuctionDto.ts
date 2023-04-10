import { ImageDto } from "../ImageDto";

export interface AuctionDto {
  auction_id:            number;
  name:                  string;
  image:                 ImageDto;
  status:                number;
  status_text:           string;
  start_date:            string;
  end_date:              string;
  current_winning_price: number;
  starting_price:        number;
  subscribers:           number;
  special_flag:          boolean;
}
