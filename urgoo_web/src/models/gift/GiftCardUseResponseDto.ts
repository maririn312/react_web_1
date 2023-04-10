export interface GiftCardUseResponseDto {
  msg:         string;
  status:      number;
  barCode:     string;
  hasPin:      boolean;
  pin:         string;
  fiatBalance: number;
  fiatCode:    string;
}