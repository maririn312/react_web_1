import React, { FunctionComponent, useEffect, useState } from "react";
import { BxButton, BxButtonType, BxInput } from "../../../components";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { userState, userLogin } from "../../../redux/user/userSlice";
import StringUtility from "../../../utility/StringUtility";
import { BxMessage, BxMessageType } from "../../../components/bx/BxMessage";
import { useNavigate } from "react-router-dom";
import UserUtility from "../../../utility/UserUtility";

const LoginPage:FunctionComponent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useAppSelector(userState);

  const [form, setForm] = useState({
    username: '',
    password: '',
    usernameError: '',
    passwordError: '',
    error: '',
    isLoading: false,
  });

  // ======================================================= //
  // ======================================================= //
  const dispatch = useAppDispatch();
  const loginStatus = useAppSelector(userState);

  useEffect(() => {
    if(user.isLoggedIn) {
      navigate('/');
    }
  });

  useEffect(() => {
    if(loginStatus.status === 'loading') {
      setForm({...form, error: '', isLoading: true});
    } else if(loginStatus.status === 'loaded') {
      setForm({...form, isLoading: false});
      if(loginStatus.isLoggedIn) {
        navigate('/');
      }
    } else if(loginStatus.status === 'error') {
      setForm({...form, 
        error: loginStatus.error ? loginStatus.error : '',
        username: '',
        password: '',
        isLoading: false,
      });
    }
  }, [loginStatus]);

  // ======================================================= //
  // ======================================================= //
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  // ======================================================= //
  // ======================================================= //
  function validateForm() {
    if(!StringUtility.isValidText(form.username)) {
      setForm({...form, error: '', passwordError: '', usernameError: t('error.errorField')});
      return false;
    }
    if(!StringUtility.isValidText(form.password)) {
      setForm({...form, error: '', usernameError: '', passwordError: t('error.errorField')});
      return false;
    }
    setForm({...form, usernameError: '', passwordError: ''});
    return true;
  }

  // ======================================================= //
  // ======================================================= //
  return (
    <div>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-white">
            <div className="card-body">
              <h2 className="card-title">{t("title.login")}</h2>
              <form>
                <div className="form-control">
                  <label className="label">
                    <span>{t("label.username")}</span>
                  </label>
                  <BxInput
                    id='username'
                    name='username'
                    placeholder={t("label.username")}
                    error={form.usernameError}
                    onChange={handleChange}
                    value={form.username}
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
                    error={form.passwordError}
                    onChange={handleChange}
                    obscureText={true}
                    value={form.password}
                  />
                </div>
                <BxMessage
                  type={BxMessageType.error}
                  message={form.error}
                />
              </form>
              <div className="card-actions mt-3">
                <div className="flex w-full">
                  <div className="grid flex-grow">
                    <BxButton
                      onClick={() => {
                        navigate('/register');
                      }}
                      isLoading={form.isLoading}
                      type={BxButtonType.gradient}
                    >
                      {t("action.register")}
                    </BxButton>
                  </div>
                  <div className="divider divider-horizontal"></div>
                  <div className="grid flex-grow">
                    <BxButton
                      onClick={() => {
                        if(validateForm()) {
                          dispatch(userLogin({username: form.username, password: form.password}));
                        }
                      }}
                      isLoading={form.isLoading}
                      type={BxButtonType.gradient}
                    >
                      {t("action.login")}
                    </BxButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
