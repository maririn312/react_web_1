import trans from "../i18n/mn/translation.json";

export default class RefreshTokenExpError extends Error {
  message: string;

  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, RefreshTokenExpError.prototype);

    if (message === undefined) message = trans.error.network;
    this.message = message;
  }
}
