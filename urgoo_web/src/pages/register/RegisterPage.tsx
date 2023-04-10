import React, { FunctionComponent } from "react";
import { useState,} from "react";
import { useTranslation } from "react-i18next";
import { RESPONSE_ERROR, RESPONSE_SUCCESS } from "../../app/appConst";
import Main from "../../components/layout/main/main";
import NomadBtn, { BtnType } from "../../components/nomad/NomadBtn";
import NomadInput from "../../components/nomad/NomadInput";
import RegisterConfirm from "../dialog/register-confirm/RegisterConfirm";
import { RegisterRequestDto } from "../../models/user/RegisterRequestDto";
import { register } from "../../service/registerApiClients";
import ErrorManager from "../../utility/ErrorManager";
import StringUtility from "../../utility/StringUtility";
import './../../index.css';
import { Link } from "react-router-dom";
import NomadToast, { ToastAlert, ToastType } from "../../components/nomad/NomadToast";


export const unameRegex = new RegExp("([0-9]{8,})");
export const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
export const capitalRegex = new RegExp("^(?=.*[A-Z])");
export const alphabetRegex = new RegExp("^(?=.*?[a-z])");
export const numericeRegex = new RegExp("^(?=.*?[0-9])");
export const symbolRegex = new RegExp("^(?=.*[!@#$%^&*])");

export const rePasswordValid = (
  formRePassword : string, 
  rePasswordInput: string,
  formRePasswordError: string,
  rePasswordValidation: string 
) => {
  if(formRePassword !== rePasswordInput){
    formRePasswordError = rePasswordValidation;
    return false;
  } else {
    formRePasswordError = "";
    return true;
  }
}

const RegisterPage: FunctionComponent = () => {

  const { t } = useTranslation();
  const [isLoading] = useState<boolean>(false);
  const [showRegisterConfirm, setRegisterConfirm] = useState(false);
  const handleClose = () => setRegisterConfirm(false);
  const [checked, setChecked] = React.useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
    repassword: "",
    usernameError: "",
    passwordError: "error",
    passwordLengthError: "error",
    capitalLetterError: "error",
    alphabetError: "error",
    numericError: "error",
    symbolError: "error",
    repasswordError: "",
    error: "",
    isLoading: false,
  });

  // ======================================================= //
  // ======================================================= //
  const HandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch(event.target.name) {
      case 'username':
        if(!StringUtility.isValidText(event.target.value) || event.target.value.length < 8) {
          form.usernameError = t("validation.usernameError");
        } else {
          form.usernameError = '';
        } 
        break;
      case 'password':
        if(!StringUtility.isValidText(event.target.value)){
          form.passwordError = t("validation.passwordError");
          form.passwordLengthError = t("validation.passwordError");
          form.capitalLetterError = t("validation.passwordError");
          form.alphabetError = t("validation.passwordError");
          form.numericError = t("validation.passwordError");
          form.symbolError = t("validation.passwordError");
        } else {
          form.passwordError = '';
          form.passwordLengthError = '';
          form.capitalLetterError = '';
          form.alphabetError = '';
          form.numericError = '';
          form.symbolError = '';
        }

        if(!StringUtility.isValidText(event.target.value) || event.target.value.length < 8) {
          form.passwordLengthError = t("validation.passwordError");
        } else {
          form.passwordLengthError = '';
        } 

        if(!StringUtility.isValidText(event.target.value) || !passwordRegex.test(event.target.value)) {
          form.passwordError = t("validation.passwordError");
        } else {
          form.passwordError = '';
        }
        
        if(!StringUtility.isValidText(event.target.value) || !capitalRegex.test(event.target.value)) {
          form.capitalLetterError = t("validation.passwordError");
        } else {
          form.capitalLetterError = "";
        }
        if (!StringUtility.isValidText(event.target.value) || !alphabetRegex.test(event.target.value)){
          form.alphabetError = t("validation.passwordError");
        } else {
          form.alphabetError = "";
        }
        
        if (!StringUtility.isValidText(event.target.value) || !numericeRegex.test(event.target.value)){
          form.numericError = t("validation.passwordError");
        } else {
          form.numericError = "";
        } 
        
        if (!StringUtility.isValidText(event.target.value) || !symbolRegex.test(event.target.value)) {
          form.symbolError = t("validation.passwordError");
        } else {
          form.symbolError = "";
        }
        break;
      case 'repassword':
        if(form.password !== event.target.value){
          form.repasswordError = t("validation.repasswordError");
        } else {
          form.repasswordError = "";
        }
        rePasswordValid(
          form.password,
          event.target.value,
          form.repasswordError,
          t("validation.repasswordError")
        );
        break;
      default:
        break;
    }
  
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  // ======================================================= //
  // ======================================================= //
  function handleCheck() {
    setChecked(!checked);
  };

  // ======================================================= //
  // ======================================================= //
  function validateForm() {
    if(!StringUtility.isValidText(form.username) || form.username.length < 8) {
      setForm({
        ...form,
        error: "",
        passwordError: "",
        usernameError: t("validation.usernameError")
      });
      return false;
    } 
    
    if (!StringUtility.isValidText(form.password) || !passwordRegex.test(form.password)) {
      setForm({
        ...form,
        error: "",
        usernameError: "",
        repasswordError: "",
        passwordError: t("validation.passwordError"),
      });
      return false;
    }
    
    if (!StringUtility.isValidText(form.repassword) || form.password !== form.repassword) {
      setForm({
        ...form,
        error: "",
        usernameError: "",
        passwordError: "",
        repasswordError: t("validation.repasswordError")
      });
      return false;
    }


    setForm({ ...form, usernameError: "", passwordError: "", repasswordError: "" });
    return true;
  };
  
  // ======================================================= //
  // ======================================================= //
  async function registerSubmit() {
    setForm({...form, isLoading: true, error: ''});
    
    try {
      const request:RegisterRequestDto = {
        phoneNo: form.username,
        pwd: form.password,
      };
      
      const response = await register(request);
      if(response.status === RESPONSE_SUCCESS) {
        ToastAlert(response.msg, ToastType.SUCCESS);
        return setRegisterConfirm(true);
      } else if(response.status === RESPONSE_ERROR) {
        ToastAlert(response.msg, ToastType.WARNING);
        setForm({...form, isLoading: true, error: response.msg});
      }
      
    } catch(ex) {
      setForm({...form, isLoading: true, error: ErrorManager.handleRequestError(ex)});
    }
  }

  // ======================================================= //
  // ======================================================= //
  return (
    <Main>
      <div className="grid relative grid-cols-1 gap-0 mx-auto">
        <div className="lg:w-[440px] xs:w-[330px] p-7 my-12 bg-login-bg border-solid border-2 border-[#26304c] ">
          <div className="content">
            <div className="register__header mb-7">
              <h2 className="text-sec-green text-2xl text-[30px] font-normal mb-2">
                {t("title.register")}
              </h2>
            </div>
            <div className="regist__header mb-3">
              <h4 className="text-[#3e5178] text-[15px] leading-[1.2]">
                {t("subTitle.registerSubTitle")}
              </h4>
            </div>
            <div className="register__main">
              <form>
                <div className="form-item relative table w-full mb-[20px]">
                  <label className="text-label flex font-normal mb-[6px]">
                    <span>{t("label.phone")}</span>
                  </label>
                  <NomadInput
                    id="username"
                    name="username"
                    value={form.username}
                    dataTestId = "userId"
                    onChange={HandleChange}
                  />
                  <p className="help_error text-[#cf304a]" data-testid="user-error-sms" >{form.usernameError}</p>
                </div>
                <div className="form-item relative table w-full mb-[20px]">
                  <label className="text-label flex font-normal mb-[6px]">
                    {t("label.password")}
                  </label>
                  <NomadInput
                    id="password"
                    name="password"
                    value={form.password}
                    obscureText={true}
                    dataTestId = "passwordId"
                    onChange={HandleChange}
                  />
                  {
                    form.passwordError === "" 
                      ? <></> 
                      : 
                      <div className=" 
                          absolute 
                          content-none
                          top-2/4
                          left-[calc(100% + 10px)] 
                          pt-[7px]
                          pb-[7px]
                          pr-[10px]
                          pl-[10px]
                          bg-[#f1f3f4] 
                          shadow-[0_5px_15px_rgba(0,0,0,0)]
                          skew-x-[-5deg]
                          translate-y-[-57%]
                          translate-x-[206%]
                        ">
                          <ul className="list-none">
                            <li className="flex text-[13px] items-center whitespace-nowrap" data-testid="password-length-error-sms"> 
                              <span
                                className={`
                                  ${(form.passwordError !== "") 
                                    ? 'error ' 
                                    : "bg-[url(./assets/icons/__valid_confirm_icon.004a01fdade9f7552c12.svg)]"
                                  } 
                                  h-[14px] w-[14px] mr-[5px] share-icon flex relative hover:bg-right 
                                `} 
                              />
                              {t("validation.passwordLengthError")}
                            </li>
                            <li className="flex text-[13px] items-center whitespace-nowrap" data-testid="capital-password-error-sms"> 
                              <span
                                className={`
                                  ${(form.capitalLetterError !== "") 
                                    ? 'error ' 
                                    : "bg-[url(./assets/icons/__valid_confirm_icon.004a01fdade9f7552c12.svg)]"
                                  } 
                                  h-[14px] w-[14px] mr-[5px] share-icon flex relative hover:bg-right 
                                `} 
                              />
                              {t("validation.capitalLetterError")}
                            </li>
                            <li className="flex text-[13px] items-center whitespace-nowrap" data-testid="letter-password-error-sms"> 
                              <span
                                className={`
                                  ${(form.alphabetError !== "") 
                                    ? 'error ' 
                                    : "bg-[url(./assets/icons/__valid_confirm_icon.004a01fdade9f7552c12.svg)]"
                                  } 
                                  h-[14px] w-[14px] mr-[5px] share-icon flex relative hover:bg-right 
                                `} 
                              />
                              {t("validation.letterError")}
                            </li>
                            <li className="flex text-[13px] items-center whitespace-nowrap" data-testid="numeric-password-error-sms"> 
                              <span
                                className={`
                                  ${(form.numericError !== "") 
                                    ? 'error ' 
                                    : "bg-[url(./assets/icons/__valid_confirm_icon.004a01fdade9f7552c12.svg)]"
                                  } 
                                  h-[14px] w-[14px] mr-[5px] share-icon flex relative hover:bg-right 
                                `} 
                              />
                              {t("validation.numericError")}
                            </li>
                            <li className="flex text-[13px] items-center whitespace-nowrap" data-testid="symbol-password-error-sms"> 
                              <span
                                className={`
                                  ${(form.symbolError !== "") 
                                    ? 'error ' 
                                    : "bg-[url(./assets/icons/__valid_confirm_icon.004a01fdade9f7552c12.svg)]"
                                  } 
                                  h-[14px] w-[14px] mr-[5px] share-icon flex relative hover:bg-right 
                                `} 
                              />
                              {t("validation.symbolError")}
                            </li>
                          </ul>
                        </div> 
                  }
                </div>
                <div className="form-item relative table w-full mb-[20px] pb-2">
                  <label className="text-label flex font-normal mb-[6px]">
                    {t("label.repassword")}
                  </label>
                  <NomadInput
                    id="repassword"
                    name="repassword"
                    value={form.repassword}
                    obscureText={true}
                    dataTestId = "rePasswordId"
                    onChange={HandleChange}
                  />
                  <p className="help_error text-[#cf304a]" data-testid="repassword-error-sms" >{form.repasswordError}</p>
                </div>
                <div className="flex items-center justify-between">
                  <label className="relative flex items-start justify-start text-left  p-0">
                    <label className="w-[40px] cursor-pointer label form-check inline-block grow "> 
                      <input 
                        type="checkbox" 
                        checked={checked} 
                        name="checkbox" 
                        id="checkbox" 
                        onChange={handleCheck}
                        className="grow inline-block bg-[#1a2542] text-sec-green border border-[#c1c1c1] h-[20px] w-[20px] absolute rounded-[6px] box-border translate-y-[-50%] align-middle focus:ring-0 focus:ring-offset-0 outline-none"
                      />
                    </label>
                  </label>
                  <div className="text-white flex font-normal flex-wrap leading-[1.2] ml-2" >  
                    {t("label.nomadTermsWallet")}
                    <Link className="text-sec-green ml-[5px] cursor-pointer" to="/termsOfCondition" >{t("label.termsCondition")}</Link>
                    {t("label.nomadTermsConditionAccept")}
                  </div>
                </div>
                <div className="mt-[30px]">
                  <NomadBtn
                    width={"100%"}
                    height={"44px"}
                    onClick={
                      (
                        (!form.repassword && !passwordRegex.test(form.password)) 
                          || (!passwordRegex.test(form.password) && form.password !== form.repassword) 
                          || (form.password !== form.repassword && !checked)
                      ) ? ()=>{} : ()=>{
                        if(validateForm()){
                          registerSubmit();
                        }
                      } 
                    }
                    isLoading={isLoading}
                    type={
                      (
                        (!form.repassword && !passwordRegex.test(form.password)) 
                          || (!passwordRegex.test(form.password) && form.password !== form.repassword) 
                          || (form.password !== form.repassword && !checked)
                      ) ? BtnType.disabled : BtnType.secondary
                    }
                    className={` 
                      ${(!form.repassword || !passwordRegex.test(form.password) || !checked) 
                        ? 'bg-disable-button-green' 
                        : 'bg-sec-green'
                      } 
                      item-[#081227] items-center justify-center w-full flex font-normal pt-0  pb-0 pr-[20px] pl-[20px] transition-all duration-[0.15s] ease-in delay-[0s] border-[#0000] border-solid border-[1px] rounded-[8px] 
                    `}
                  >
                    {t("action.register")}
                  </NomadBtn>
                </div>
                <div className="mt-[25px] text-[15px] font-medium flex flex-col ">
                  <p className="text-[#566075] ">
                    {t("action.registered")}
                    <Link className="text-sec-hover-bor text-[14px] ml-1" to="/login" >{t("action.login")}</Link>
                  </p>
                </div>
                <RegisterConfirm phoneNo={form.username} onClose={handleClose} visible={showRegisterConfirm} />
              </form>
              <NomadToast />
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}

export default RegisterPage

