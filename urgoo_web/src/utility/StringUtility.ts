import { v5 as uuidv5 } from 'uuid';

export default class StringUtility {

  /// ====================================================== ///
  static generateInquireId() {
    const date = new Date().toISOString();
    const unique:string = uuidv5(date, '1b671a64-40d5-491e-99b0-da01ff1f3341');
    const inquireId = unique.replaceAll(('-'), '');
    return inquireId;
  }
  
  /// ====================================================== ///
  static isValidText = (text: string) => {
    if (text !== undefined && text !== null && text !== "") {
      return true;
    }
    return false;
  };

  /// ====================================================== ///
  static isValidEmail = (email: string) => {
    if (this.isValidText(email)) {
      return /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test(
        email
      );
    }
    return false;
  };

  /// ====================================================== ///
  static isNumeric = (text: string) => {
    if (this.isValidText(text)) {
      return !isNaN(Number.parseFloat(String(text)));
    }
    return false;
  };

  /// ====================================================== ///
  static mnNameFormat = ({
    firstname,
    lastname,
  }: {
    firstname: string;
    lastname: string;
  }) => {
    let name: string = "";

    if (lastname.length < 1) {
      name += "н.";
    } else {
      name += lastname.charAt(0) + ".";
    }

    if (firstname.length < 1) {
      name += "хэрэглэгч";
    } else {
      name += firstname;
    }

    return name;
  };

  /// ====================================================== ///
  static extractNickName = (nickname: string) => {
    if (this.isValidText(nickname)) {
      return nickname.split("@");
    }
    return ["_", "000"];
  };

  /// ====================================================== ///
  static numberToCurrency = (number:number, currency?:string) => {
    return (`${currency ?? '₮'} ` ?? '') + new Intl.NumberFormat('mn',{
      notation: 'standard',
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(number);
  };

  /// ====================================================== ///
  static padTo2Digits = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  /// ====================================================== ///
  static getDateAsLocal = (date: Date, hasTime?:boolean) => {
    let buffer:string = '';

    buffer += [
      date.getFullYear(),
      this.padTo2Digits(date.getMonth() + 1),
      this.padTo2Digits(date.getDate()),
    ].join("-");

    if(hasTime === undefined || hasTime) {
      buffer += " " +
      [
        this.padTo2Digits(date.getHours()),
        this.padTo2Digits(date.getMinutes()),
        this.padTo2Digits(date.getSeconds()),
      ].join(":");
    }

    return buffer;
  };
}
