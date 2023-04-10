/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { RESPONSE_ERROR, RESPONSE_SUCCESS } from "../../../app/appConst";
import { RegisterConfirmRequestDto } from "../../../models/user/RegisterConfirmResponseDto";
import { UserRegisterReTanRequestDto } from "../../../models/user/UserRegisterReTanRequestDto";
import { registerConfirm, registerGetReTanCode } from "../../../service/registerApiClients";
import ErrorManager from "../../../utility/ErrorManager";
import { TabTitle } from "../../../utility/TabTitleUtility";
import MnTranslation from "../../../i18n/mn/translation.json";

let timeout: NodeJS.Timeout; 
let currentIndex: number = 0; 

const RegisterConfirm = ({visible , phoneNo, onClose}) => {
  
  // ======================================================= //
  // ======================================================= //
  if(!visible) return null;
  
  // ======================================================= //
  // ======================================================= //
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [seconds, setSeconds] = useState<number>(180);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0);
  const count = Math.floor(seconds);

  TabTitle(MnTranslation.mainTitle.registerConfirm);
  
  const [form, setForm] = useState({
    username: phoneNo,
    tancode: "",
    error: "",
    isLoading: false,
  });

  // ======================================================= //
  // ======================================================= //
  useEffect(()=>{
    inputRef.current?.focus();
  }, [activeOTPIndex])

  // ======================================================= //
  // ======================================================= //
  useEffect(()=>{
    if(seconds > 0){
      timeout = setTimeout(() => {
        setSeconds((state) => state - 1);
      }, 1000);
    } else {
      clearTimeout(timeout);
    } 
  }, [seconds])

  // ======================================================= //
  // ======================================================= //
  const HandleOnChange = ({target}: React.ChangeEvent<HTMLInputElement>) : void => {
    const {value} = target;
    const newOTP: string [] = [...otp];
    newOTP[currentIndex] = value.substring(value.length - 1);

    if(!value ) setActiveOTPIndex(currentIndex -1);
    else setActiveOTPIndex(currentIndex + 1);

    form.tancode = newOTP.join('');

    if(currentIndex + 1 === otp.length) {
      registerConfirmSubmit();
    } 

    setOtp(newOTP);
  };

  // ======================================================= //
  // ======================================================= //
  const HandleOnKeyDown = ({key}: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    currentIndex = index;
    if(key === "Backspace") setActiveOTPIndex(currentIndex - 1);
  };

  // ======================================================= //
  // ======================================================= //
  async function registerConfirmSubmit() {
    setForm({...form, isLoading: true, error: ''});
    
    try {
      const request:RegisterConfirmRequestDto = {
        phoneNo: form.username,
        tanCode: form.tancode,
      }
      
      const response = await registerConfirm(request);
      if(response.status === RESPONSE_SUCCESS) {

      } else if (response.status === RESPONSE_ERROR) {
        setForm({...form, isLoading: true, error: response.msg});
      }
      
    } catch(ex) {
      setForm({...form, isLoading: true, error: ErrorManager.handleRequestError(ex)});
    }
  }

  // ======================================================= //
  // ======================================================= //
  async function getReTanCodeSubmit() {
    setForm({...form, isLoading: true, error: ''});
    
    try {
      const request:UserRegisterReTanRequestDto = {
        phoneNo: phoneNo,
      }
      
      const response = await registerGetReTanCode(request);
      if(response.status === RESPONSE_SUCCESS) {
      } else if (response.status === RESPONSE_ERROR) {
        setForm({...form, isLoading: true, error: response.msg});
      }
      
    } catch(ex) {
      setForm({...form, isLoading: true, error: ErrorManager.handleRequestError(ex)});
    }
  }

  // ======================================================= //
  // ======================================================= //
  return (
    <>
      <div className="fixed inset-0 z-[1040] overflow-y-auto">
        <div className="flex items-center min-h-screen">
          <div className="relative w-full max-w-lg  mx-auto">
            <div className="text-center">
              <div className=" border-b-0 bg-white text-[#32363a] p-[1.5rem] mt-2 items-center flex shrink-0 justify-between box-border rounded-t-lg">
                <span className="font-semibold text-xl" >{t("label.accept")}</span>
                <button className=" text-[#32363a] bg-[#5a5a5a1a] w-[2rem] mr-0 h-[2rem] rounded-[50%] transition-all duration-[0.2s] ease-in delay-[0s] items-center flex justify-center overflow-hidden relative" onClick={onClose}>
                  <span className=" not-italic font-normal normal-nums normal-case leading-none inline-block box-border text-[1rem]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                </button>
              </div>
              <div className="bg-white pr-[1.5rem] pl-[1.5rem] mb-2 overflow-y-auto box-border">
                <div className="grid gap-[10px] mb-2 justify-center items-center box-border">
                  <div className="mt-2 p-0 m-0  box-border ">
                    {otp.map((_, index) => {
                      return (
                        <React.Fragment key={index}>
                          <input
                            ref ={index === activeOTPIndex ? inputRef : null}
                            className="text-[#000] text-[14px] font-semibold min-h-[48px]  w-[50px] h-[50px] leading-[46px] bg-[#fff] px-[14px] border-[#eaecef] border duration-200 ease-in-out delay-[0s] transition-all text-center mr-[8px] rounded bg-transparent outline-none text-xl spin-button-none focus:border-sec-green" 
                            form="text"
                            onChange={HandleOnChange}
                            onKeyDown = {(e) => HandleOnKeyDown(e, index)}
                            value={otp[index]}
                          />
                          {index === otp.length -1 ? null : (
                            <span className="w-2 py-0.5 bg-gray-400"></span>
                          )}
                        </React.Fragment>
                      );
                    })}  
                  </div>
                </div>
                <div className="flex justify-between items-center pt-[35px] pb-[20px]">
                  <div className="flex box-border">
                    <div className="w-[32px] box-border text-[#888a8c] font-normal">{count}</div>
                    <span className="box-border text-[#888a8c] font-normal ">{t("date.second")} </span>
                  </div>
                  <button type="button" className=" bg-custom-green  text-[#091127] font-medium leading-[36px] h-[36px] pr-[16px] pl-[16px] border-solid border-1 border-[#9cffdc] transition-all duration [15s] ease-in delay-[0s] rounded-[8px]"
                    onClick={
                      () => {
                        getReTanCodeSubmit();
                      }
                    }
                  >
                    {t("label.getReTanCode")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default RegisterConfirm;