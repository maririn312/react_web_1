export default interface UserProfileResponseDto {
  msg: string;
  status: number;
  id: number;
  type: string;
  description: string;
  cover_photo: string;
  profile_photo_small: string;
  profile_photo_medium: string;
  nickname: string;
  total_number_of_feedback: number;
  total_sum_of_feedback: number;
  feedback_unit: number;
  since: string;
  total_number_of_auction: number;
  total_number_of_follower: number;
}
