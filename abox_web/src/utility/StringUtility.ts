import { v4 as uuidv4 } from 'uuid';
import { BANK_GOLOMT, BANK_KHAAN, BANK_KHAS, BANK_MONGOLBANK, BANK_NATIONAL_INVESTMENT, BANK_STATE, BANK_TDB } from '../app/appConst';

export default class StringUtility {

  /// ====================================================== ///
  static generateInquireId = () => {
      const date = Date.now().toString();
      const unique = uuidv4().replaceAll("-","");
      const inquireId = `${date}-${unique}`;
      return inquireId;
  }

  static bankCodeToImagePath = (bankcode:string) => {
    switch(bankcode) {
      case BANK_GOLOMT:
        return '/assets/banks/golomt_bank.png';
      case BANK_KHAAN:
        return '/assets/banks/khaan_bank.png';
      case BANK_KHAS:
        return '/assets/banks/khas_bank.png';
      case BANK_TDB:
        return '/assets/banks/td_bank.png';
      case BANK_STATE:
        return '/assets/banks/state_bank.png';
      case BANK_NATIONAL_INVESTMENT:
        return '/assets/banks/invest_bank.png';
    }
    return '/assets/banks/bank.png';
  }

  /// ====================================================== ///
  static isValidText = (text:string | number | Date | undefined) => {
    if(text !== undefined && text !== null && text !== '') {
      return true;
    }
    return false;
  } 

  /// ====================================================== ///
  static isValidEmail = (email:string) => {
    if(this.isValidText(email)) {
      return /^[a-z0-9][a-z0-9-_\\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test(email);
    }
    return false;
  }

  /// ====================================================== ///
  static isListEmpty = (list:any[]) => {
    if(list === undefined) return true;
    if(list.length === 0) return true;
    return false;
  }
  
  /// ====================================================== ///
  static isNumeric = (text:string) => {
    if(this.isValidText(text)) {
      return !isNaN(Number.parseFloat(String(text)));
    } 
    return false;
  }

  /// ====================================================== ///
  static mnNameFormat = ({firstname, lastname}:{firstname:string, lastname:string}) => {
    let name:string = '';

    if(lastname.length < 1) {
      name += 'н.';
    } else {
      name += lastname.charAt(0);
    }

    if(firstname.length < 1) {
      name += 'хэрэглэгч';
    } else {
      name += firstname;
    }

    return name;
  }

  /// ====================================================== ///
  static extractNickname = (nickname:string) => {
    if(this.isValidText(nickname)) {
      return nickname.split("@");
    } 
    return ['_','000'];
  }

  /// ====================================================== ///
  static numberToCurrency = (number:number, currency?:string) => {
    return (`${currency ?? '₮'} ` ?? '') + new Intl.NumberFormat('mn',{
      notation: 'standard',
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(number);
  }

  /// ====================================================== ///
  static currencyToNumber = (currency:string) => {
    if(this.isValidText(currency)) {
      return Number(currency.replace(/[^0-9-]+/g,""));
    }
    return 0;
  }

  /// ====================================================== ///
  static padTo2Digits = (num: number) => {
    return num.toString().padStart(2, '0');
  }
  
  /// ====================================================== ///
  static getDateAsLocal = (date:Date | undefined) => {
    if(date === undefined)  return '';
    return (
      [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate()),
      ].join('-') + 
      ' ' + 
      [
        this.padTo2Digits(date.getHours()),
        this.padTo2Digits(date.getMinutes()),
        this.padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }

}