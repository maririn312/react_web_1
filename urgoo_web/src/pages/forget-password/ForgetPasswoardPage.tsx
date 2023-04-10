import React, { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import Main from "../../components/layout/main/main";
import NomadInput from "../../components/nomad/NomadInput";
import NomadBtn, { BtnType } from "../../components/nomad/NomadBtn";
import ErrorManager from "../../utility/ErrorManager";
import StringUtility from "../../utility/StringUtility";
import { ForgotRequestDto } from "../../models/user/ForgetRequestDto";
import { forgot } from "../../service/forgotApiClient";
import { RESPONSE_ERROR, RESPONSE_SUCCESS } from "../../app/appConst";
import toast from 'react-hot-toast';
import Translation from "../../i18n/mn/translation.json";
import NomadToast, { ToastAlert, ToastType } from "../../components/nomad/NomadToast";
import { TabTitle } from "../../utility/TabTitleUtility";
import MnTranslation from "../../i18n/mn/translation.json";

const ForgetPasswordPage: FunctionComponent = () => {

  const { t } = useTranslation();
  const [isLoading] = useState<boolean>(false);

  TabTitle(MnTranslation.mainTitle.forgetPassword);

  // ======================================================= //
  // ======================================================= //
  const [form, setForm] = useState({
    username: "",
    usernameError: "",
    error: "",
    isLoading: false
  });

  // ======================================================= //
  // ======================================================= //
  const handleForgotChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch(event.target.name) {
      case "username":
        if(!StringUtility.isValidText(event.target.value) || event.target.value.length < 8) {
          form.usernameError = t("validation.usernameError");
        } else {
          form.usernameError = '';
        }
        break;
      default:
        break;
    }

    setForm({...form, [event.target.name]: event.target.value});
  }

  // ======================================================= //
  // ======================================================= //
  async function forgotSubmit() {
    setForm({...form, isLoading: true, error: ''});

    try {
      const request: ForgotRequestDto = {
        phoneNo: form.username
      };

      const response = await forgot(request);

      if(response.status === RESPONSE_SUCCESS) {
        ToastAlert(response.msg, ToastType.SUCCESS);
      } else if (response.status === RESPONSE_ERROR) {
        ToastAlert(response.msg, ToastType.ERROR);
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
        <div className="w-[440px] p-7 my-12 bg-login-bg">
          <div className="content">
            <div className="login__header mb-7">
              <h2 className="text-sec-green text-[30px] font-normal mb-2">  
                {t("title.forgot")}
              </h2>
              <p className="text-[#3e5178] text-[15px] leading-[1.2]">
                {t('paragraph.forgotDetail')}              
              </p>
            </div>
            <div className="login__main">
              <form >
                <div className="form-item relative table w-full mb-5">
                  <label className="text-label flex font-normal mb-2">
                    <span>{t("label.phone")}</span>
                  </label>
                  <NomadInput
                    id="username"
                    name="username"
                    placeholder={t("label.phone")}
                    value={form.username}
                    dataTestId = "forgetPasswordId"
                    onChange={handleForgotChange}
                  />
                  <p className="help_error text-[#cf304a]" data-testid="forget-password-error-sms" >{form.usernameError}</p>
                </div>
                <div className="mt-[30px]">
                  <NomadBtn
                    width={"100%"}
                    height={"44px"}
                    isLoading={isLoading}
                    onClick ={
                      (!form.username) ? () => {} :
                      forgotSubmit
                    }
                    type={(!form.username) ? BtnType.disabled : BtnType.secondary}
                    className={` ${(!form.username) 
                        ? 'bg-[#21956b]'
                        : 'bg-sec-green' 
                      }
                      item-[#081227] items-center justify-center w-full flex font-normal pt-0  pb-0 pr-[20px] pl-[20px] transition-all duration-[0.15s] ease-in delay-[0s] border-[#0000] border-solid border-[1px] rounded-[8px] hover:bg-[#06d98d] text-[#091127]
                    `}
                  >
                   {t("action.send")}
                  </NomadBtn>
                </div>
              </form>
              <NomadToast />
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default ForgetPasswordPage;