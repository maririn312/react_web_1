import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { RESPONSE_ERROR, RESPONSE_SUCCESS } from "../../../app/appConst";
import { BxButton, BxButtonType, BxInput } from "../../../components";
import { registerConfirm } from "../../../service/registerApiClient";
import ErrorManager from "../../../utility/ErrorManager";
import StringUtility from "../../../utility/StringUtility";
import UserUtility from "../../../utility/UserUtility";

const RegisterConfirmPage:FunctionComponent = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [form, setForm] = useState({
    isLoading: false,
    tanCode: '',
    tanCodeError: '',
  });

  // ======================================================= //
  // ======================================================= //
  function validateForm() {
    if(!StringUtility.isValidText(form.tanCode)) {
      setForm({...form, tanCodeError: t('error.errorField')});
      return false;
    }
    return true;
  }

  // ======================================================= //
  // ======================================================= //
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  // ======================================================= //
  // ======================================================= //
  async function submitConfirm() {
    setForm({...form, isLoading: true, tanCodeError: ''});
    
    try {
      const phoneNo = await UserUtility.getRegisterPhoneNo();
      const response = await registerConfirm(form.tanCode, phoneNo);
      if(response.status === RESPONSE_SUCCESS) {
        navigate('/');
      } else if(response.status === RESPONSE_ERROR) {
        setForm({...form, isLoading: false, tanCodeError: response.msg});
      }
      
    } catch(ex) {
      setForm({...form, isLoading: false, tanCodeError: ErrorManager.handleRequestError(ex)});
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
                  <span>{t("label.tancode")}</span>
                </label> 
                <BxInput 
                  id='tanCode' 
                  name='tanCode' 
                  placeholder={t("label.tancode")} 
                  error={form.tanCodeError} 
                  onChange={handleChange} 
                  value={form.tanCode} 
                />
              </div>
              <div className="card-actions mt-3">
                <div className="grid flex-grow">
                    <BxButton
                      onClick={() => {
                        if(validateForm()) {
                          submitConfirm();
                        }
                      }}
                      isLoading={form.isLoading}
                      type={BxButtonType.gradient}
                    >
                      {t("action.confirm")}
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

export default RegisterConfirmPage;