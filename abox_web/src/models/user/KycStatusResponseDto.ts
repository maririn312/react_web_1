export interface KycStatusResponseDto {
  msg:                 string;
  status:              number;
  basic_info_required: boolean;
  kyc_confirmed_flag:  boolean;
  nickname_status:     boolean;
  nickname:            string;
  roles:               UserRoleDto[];
  id_front_status:     number;
  id_front_text:       string;
  id_back_status:      number;
  id_back_text:        string;
  id_front:            string;
  id_back:             string;
  first_name:          string;
  last_name:           string;
  registration_no:     string;
}

export interface UserRoleDto {
  code: string;
  name: string;
}
