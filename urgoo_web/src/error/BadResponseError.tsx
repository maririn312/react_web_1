import trans from "../i18n/mn/translation.json";

export default class BadResponseError extends Error {
  status: number;
  message: string;

  constructor(status: number, message?: string) {
    super(message);
    Object.setPrototypeOf(this, BadResponseError.prototype);
    this.status = status;

    if (message === undefined) message = trans.error.badRequest;
    this.message = message;
  }
}
