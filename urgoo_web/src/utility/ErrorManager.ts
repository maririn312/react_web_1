import axios from "axios";
import BadResponseError from "../error/BadResponseError";
import trans from "../i18n/mn/translation.json";

export default class ErrorManager {
  static handleRequestError = (ex: any) => {
    if (ex instanceof BadResponseError) {
      return ex.message;
    } else if (axios.isAxiosError(ex)) {
      switch (ex.code) {
        case "ECONNABORTED":
          return trans.error.timeout;
        case "ETIMEDOUT":
          return trans.error.timeout;
        case "ERR_CANCELED":
          return trans.error.network;
        case "ERR_NETWORK":
          return trans.error.network;
      }
      return ex.message;
    } else if (ex instanceof Error) {
      return ex.message;
    }
    return trans.error.general;
  };
}
