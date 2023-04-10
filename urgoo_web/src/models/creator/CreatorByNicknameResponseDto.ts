export interface CreatorByNicknameResponseDto {
  msg: string;
  status: number;
  nickname: string;
  profile_photo_md: string;
  profile_photo_sm: string;
  cover_picture: string;
  facebook_url: string;
  twitter_url: string;
  instagram_url: string;
  likes: number;
  seen: number;
  created: number;
  shared: number;
  verified_flag: boolean;
}
