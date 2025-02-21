export type FrontErrorType =
  "invalid_request"
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "too_many_requests"
  | "server_error"
  | "unexpected";

export class FrontError extends Error{
  params?: Record<string, string>;
  show: boolean = true;

  public constructor(public messageKey?: FrontErrorType) {
    super(messageKey as string);
  }
}
