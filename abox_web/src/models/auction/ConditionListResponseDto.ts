export interface ConditionListResponseDto {
  msg:        string;
  status:     number;
  conditions: NewCondition[];
}

export interface NewCondition {
  id:          number;
  code:        string;
  name:        string;
  description: string;
}
