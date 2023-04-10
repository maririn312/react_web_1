export interface AuctionCurrentStatusResponseDto {
  msg:                      string;
  status:                   number;
  winning_price:            number;
  my_last_bidding_price:    number;
  you_are_currently_winner: boolean;
}
