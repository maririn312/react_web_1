export default interface TokenResponseDto {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  greetings: string;
  error: string;
  error_description: string;
}
