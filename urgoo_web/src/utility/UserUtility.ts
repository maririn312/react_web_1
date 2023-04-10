// import Cookies from "js-cookie";
import StringUtility from "./StringUtility";

export default class UserUtility {
  static isUserLoggedIn = () => {
    const accessToken: string = localStorage.getItem("accessToken") as string;
    const refreshToken: string = localStorage.getItem("refreshToken") as string;
    if (
      StringUtility.isValidText(accessToken) &&
      StringUtility.isValidText(refreshToken)
    ) {
      return true;
    }
    return false;
  };

  static saveClientCredential = (clientToken:string) => {
    localStorage.setItem('clientToken', clientToken);
  }

  static saveUserCredential = ({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  static getClientCredential = () => {
    return localStorage.getItem('clientToken') ?? '';
  }

  static getUserCredential = () => {
    const accessToken = localStorage.getItem("accessToken") ?? "";
    const refreshToken = localStorage.getItem("refreshToken") ?? "";
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  };

  static deleteUserCredential = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  static deleteClientCredential = () => { 
    localStorage.removeItem('clientToken');
  }
}
