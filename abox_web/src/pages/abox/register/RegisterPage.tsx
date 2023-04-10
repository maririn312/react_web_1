import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { RESPONSE_ERROR, RESPONSE_SUCCESS, USER_INDIVIDUAL } from "../../../app/appConst";
import { BxButton, BxButtonType, BxInput } from "../../../components";
import { RegisterRequestDto } from "../../../models/user/RegisterRequestDto";
import { register } from "../../../service/registerApiClient";
import ErrorManager from "../../../utility/ErrorManager";
import StringUtility from "../../../utility/StringUtility";
import UserUtility from "../../../utility/UserUtility";

const RegisterPage:FunctionComponent = () => {

  const { t } = useTranslation();
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    phoneNo: '',
    phoneNoError: '',
    password: '',
    passwordError: '',
    passwordRe: '',
    passwordReError: '',
    formError: '',
    isLoading: false,
  });

  // ======================================================= //
  // ======================================================= //
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  // ======================================================= //
  // ======================================================= //
  function validateForm() {
    let hasError = false;
    let phoneError:string = '';
    let passwordError:string = '';
    let passwordReError:string = '';

    if(!StringUtility.isValidText(form.phoneNo)) {
      hasError = true;
      phoneError = t('error.errorField');
    }
    if(!StringUtility.isValidText(form.password)) {
      hasError = true;
      passwordError = t('error.errorField');
    }
    if(!StringUtility.isValidText(form.passwordRe)) {
      hasError = true;
      passwordReError = t('error.errorField');
    }
    setForm({...form, 
      phoneNoError: phoneError,  
      passwordError: passwordError, 
      passwordRe: passwordReError, 
    });
    return !hasError;
  }
  
  // ======================================================= //
  // ======================================================= //
  async function registerSubmit() {
    setForm({...form, isLoading: true, formError: ''});
    
    try {
      const request:RegisterRequestDto = {
        phone_no: form.phoneNo,
        password: form.password,
        confirm_password: form.passwordRe,
        type: USER_INDIVIDUAL,
      }
      
      const response = await register(request);
      if(response.status === RESPONSE_SUCCESS) {
        UserUtility.saveRegisterPhoneNo(form.phoneNo);
        navigate('/registerConfirm');
      } else if(response.status === RESPONSE_ERROR) {
        setForm({...form, isLoading: true, formError: response.msg});
      }
      
    } catch(ex) {
      setForm({...form, isLoading: true, formError: ErrorManager.handleRequestError(ex)});
    }
  }

  // ======================================================= //
  // ======================================================= //
  return (
    <div>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-white">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span>{t("label.phone")}</span>
                </label> 
                <BxInput 
                  id='phoneNo' 
                  name='phoneNo' 
                  placeholder={t("label.phone")} 
                  error={form.phoneNoError} 
                  onChange={handleChange} 
                  value={form.phoneNo} 
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span>{t("label.password")}</span>
                </label> 
                <BxInput 
                  id='password' 
                  name='password' 
                  placeholder={t("label.password")} 
                  obscureText={true}
                  error={form.passwordError} 
                  onChange={handleChange} 
                  value={form.password} 
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span>{t("label.passwordRe")}</span>
                </label> 
                <BxInput 
                  id='passwordRe' 
                  name='passwordRe' 
                  placeholder={t("label.passwordRe")} 
                  obscureText={true}
                  error={form.passwordReError} 
                  onChange={handleChange} 
                  value={form.passwordRe} 
                />
              </div>
              <div className="card-actions mt-3">
                <div className="grid flex-grow">
                    <BxButton
                      onClick={() => {
                        if(validateForm()) {
                          registerSubmit();
                        }
                      }}
                      isLoading={form.isLoading}
                      type={BxButtonType.gradient}
                    >
                      {t("action.register")}
                    </BxButton>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default RegisterPage;