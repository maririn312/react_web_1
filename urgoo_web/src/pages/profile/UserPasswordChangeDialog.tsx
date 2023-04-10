import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import NomadInput from "../../components/nomad/NomadInput";
import NomadBtn, { BtnType } from "../../components/nomad/NomadBtn";
import { TabTitle } from "../../utility/TabTitleUtility";
import MnTranslation from "../../i18n/mn/translation.json";
import StringUtility from "../../utility/StringUtility";
import ErrorManager from "../../utility/ErrorManager";
import { UserPasswordChangeRequestDto } from "../../models/user/UserPasswordChangeRequestDto";
import { ChangeUserPassword } from "../../service/userApiClient";
import { RESPONSE_ERROR, RESPONSE_SUCCESS } from "../../app/appConst";
import NomadToast, { ToastAlert, ToastType } from "../../components/nomad/NomadToast";


interface UserPasswordChangeDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserPasswordChangeDialog = ({
  isOpen,
  setIsOpen,
}: UserPasswordChangeDialogProps) => {
  const { t } = useTranslation();
  const [showUserPasswordChangeConfirm, setUserPasswordChangeConfirm] = useState(false);

  TabTitle(MnTranslation.mainTitle.withdrawConfirmDialog);

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    newRepassword: "",
    oldPasswordError: "",
    newPasswordError: "error",
    passwordLengthError: "error",
    capitalLetterError: "error",
    alphabetError: "error",
    numericError: "error",
    symbolError: "error",
    newRepasswordError: "",
    error: "",
    isLoading: false,
  });

  const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
  const capitalRegex = new RegExp("^(?=.*[A-Z])");
  const alphabetRegex = new RegExp("^(?=.*?[a-z])");
  const numericeRegex = new RegExp("^(?=.*?[0-9])");
  const symbolRegex = new RegExp("^(?=.*[!@#$%^&*])");

  // ======================================================= //
  // ======================================================= //
  const HandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch(event.target.name) {
      case 'oldPassword':
        if( !StringUtility.isValidText(event.target.value)) {
          form.oldPasswordError = t("validation.oldPasswordError");
        } else {
          form.oldPasswordError = '';
        } 
        break;
      case 'newPassword':
        if(!StringUtility.isValidText(event.target.value)){
          form.newPasswordError = t("validation.passwordError");
          form.passwordLengthError = t("validation.passwordError");
          form.capitalLetterError = t("validation.passwordError");
          form.alphabetError = t("validation.passwordError");
          form.numericError = t("validation.passwordError");
          form.symbolError = t("validation.passwordError");
        } else {
          form.newPasswordError = '';
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
          form.newPasswordError = t("validation.passwordError");
        } else {
          form.newPasswordError = '';
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
      case 'newRepassword':
        if(form.newPassword !== event.target.value){
          form.newRepasswordError = t("validation.repasswordError");
        } else {
          form.newRepasswordError = "";
        }
        break;
      default:
        break;
    }
  
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  // ======================================================= //
  // ======================================================= //
  function validateForm() {
    if(!StringUtility.isValidText(form.oldPassword)) {
      setForm({
        ...form,
        error: "",
        newPasswordError: "",
        newRepasswordError: "",
        oldPasswordError: t("validation.passwordError")
      });
      return false;
    } 

    if (!StringUtility.isValidText(form.newPassword) || !passwordRegex.test(form.newPassword)) {
      setForm({
        ...form,
        error: "",
        oldPasswordError: "",
        newRepasswordError: "",
        newPasswordError: t("validation.passwordError"),
      });
      return false;
    }
    
    if (!StringUtility.isValidText(form.newRepassword) || form.newPassword !== form.newRepassword) {
      setForm({
        ...form,
        error: "",
        oldPasswordError: "",
        newPasswordError: "",
        newRepasswordError: t("validation.repasswordError")
      });
      return false;
    }

    setForm({ ...form, oldPasswordError: "", newPasswordError: "", newRepasswordError: "" });
    return true;
  };
  
  // ======================================================= //
  // ======================================================= //
  async function changePasswordSubmit() {
    setForm({...form, isLoading: true, error: ''});
    
    try {
      const request: UserPasswordChangeRequestDto = {
        currentPwd: form.oldPassword,
        newPwd: form.newPassword,
        rePwd: form.newRepassword
      };

      const response = await ChangeUserPassword(request);

      if (response.status === RESPONSE_SUCCESS ) {
        setForm({...form, isLoading: false, error: response.msg});
        return setUserPasswordChangeConfirm(true);
      } else if (response.status === RESPONSE_ERROR) {
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
    <Dialog
      open={isOpen}
      onClose={setIsOpen}
      as="div"
      className={clsx(
        "fixed inset-0 z-[111] flex items-center justify-center overflow-y-auto bg-opacity-50",
        {
          "bg-black": isOpen === true,
        }
      )}
    >
      <div className="flex flex-col bg-white py-8 px-4">
        <Dialog.Overlay />
        <Dialog.Title className="text-black mb-4">
          <h3 className="font-medium text-lg">{t("label.password")}</h3>
        </Dialog.Title>
        <hr className="mb-4" />
        <Dialog.Panel>
          <form>
            <div className="form-control mb-4">
              <label className="flex text-[#616e91] font-normal  mb-[6px]">
                <span>{t("label.oldPassword")}</span>
              </label>
              <NomadInput
                id="oldPassword"
                name="oldPassword"
                onChange={HandleChange}
                obscureText={true}
                dataTestId = "oldPasswordId"
                value={form.oldPassword}
                error={form.oldPasswordError}
              />
            </div>
            <div className="form-control mb-4">
              <label className="flex text-[#616e91] font-normal  mb-[6px]">
                <span>{t("label.newPassword")}</span>
              </label>
              <NomadInput
                id="newPassword"
                name="newPassword"
                onChange={HandleChange}
                obscureText={true}
                dataTestId = "newPasswordId"
                value={form.newPassword}
              />
              {
                form.newPasswordError === "" 
                  ? <></> 
                  : 
                  <div className=" 
                    lg:absolute 
                    content-none
                    lg:top-2/4
                    lg:left-[calc(100% + 10px)] 
                    py-[7px]
                    px-[10px]
                    bg-[#f1f3f4] 
                    shadow-[0_5px_15px_rgba(0,0,0,0)]
                    lg:skew-x-[-5deg]
                    lg:translate-y-[-57%]
                    lg:translate-x-[206%]
                  ">
                    <ul className="list-none">
                      <li className="flex text-[13px] items-center whitespace-nowrap" data-testid="password-length-error-sms"> 
                        <span
                          className={`
                            ${(form.newPasswordError !== "") 
                              ? 'error' 
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
            <div className="form-control mb-4">
              <label className="flex text-[#616e91] font-normal  mb-[6px]">
                <span>{t("label.newRepassword")}</span>
              </label>
              <NomadInput
                id="newRepassword"
                name="newRepassword"
                obscureText={true}
                dataTestId = "newRepasswordId"
                onChange={HandleChange}
                value={form.newRepassword}
                error={form.newRepasswordError}
              />
            </div>
          </form>
          <div className="box-border p-0 m-0 outline-none ">
            <div className="box-border gap-5 grid-cols-2 grid p-0 m-0 ">
              <NomadBtn
                className="mt-4 w-full flex justify-center text-[#1f4c76] border-[#1f4c76]"
                type={BtnType.white}
                onClick={() => {
                  setIsOpen(false);
                }}
                isLoading={form.isLoading}
              >
                {t("label.cancel")}
              </NomadBtn>
              <NomadBtn
                className="mt-4 w-full flex justify-center"
                type={BtnType.secondary}
                onClick={() => {
                  if (validateForm()) {
                    changePasswordSubmit();
                  }
                }}
                isLoading={form.isLoading}
              >
                {t("action.send")}
              </NomadBtn>
            </div>
          </div>
          <NomadToast />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default UserPasswordChangeDialog;