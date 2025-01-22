export type ErrorType =
  "invalid_request"
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "too_many_requests"
  | "server_error"
  | "unexpected";

export interface ErrorState {
  messageKey?: ErrorType;
  params?: Record<string, string>;
  show: boolean;
}
