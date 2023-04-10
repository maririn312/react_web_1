import { FeedbackDto } from "./FeedbackDto";

export interface FeedbackListResponseDto {
  msg:       string;
  status:    number;
  page:      number;
  size:      number;
  feedbacks: FeedbackDto[];
}
