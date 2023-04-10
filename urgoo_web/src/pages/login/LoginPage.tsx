import React, { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Main from "../../components/layout/main/main";
import NomadInput from "../../components/nomad/NomadInput";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { userLogin, userState } from "../../redux/user/userSlice";
import UserUtility from "../../utility/UserUtility";
import StringUtility from "../../utility/StringUtility";
import NomadBtn, { BtnType } from "../../components/nomad/NomadBtn";
import { TabTitle } from "../../utility/TabTitleUtility";
import MnTranslation from "../../i18n/mn/translation.json";
import NomadToast, {
  ToastAlert,
  ToastType,
} from "../../components/nomad/NomadToast";

const LoginPage: FunctionComponent = () => {
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    usernameError: "",
    passwordError: "",
    error: "",
  });

  const dispatch = useAppDispatch();
  const loginStatus = useAppSelector(userState);

  TabTitle(MnTranslation.mainTitle.loginTitle);

  // ================================================================== //
  useEffect(() => {
    if (UserUtility.isUserLoggedIn()) {
      navigate("/");
    }
  });

  // ================================================================== //
  useEffect(() => {
    if (loginStatus.status === "loading") {
      setForm({ ...form, error: "" });
      setLoading(true);
    } else if (loginStatus.status === "loaded") {
      setLoading(false);
      if (loginStatus.isLoggedIn) {
        navigate("/");
        window.location.reload();
      }
    } else if (loginStatus.status === "error") {
      setLoading(false);
      setForm({
        ...form,
        error: loginStatus.error ? loginStatus.error : "",
        username: "",
        password: "",
      });
      ToastAlert(t("validation.loginError"), ToastType.WARNING);
    }
  }, [loginStatus]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function validateForm() {
    if (!StringUtility.isValidText(form.username)) {
      setForm({
        ...form,
        error: "",
        passwordError: "",
        usernameError: t("validation.usernameError"),
      });
      return false;
    }
    if (!StringUtility.isValidText(form.password)) {
      setForm({
        ...form,
        error: "",
        usernameError: "",
        passwordError: t("validation.passwordError"),
      });
      return false;
    }
    setForm({ ...form, usernameError: "", passwordError: "" });
    return true;
  }

  return (
    <Main>
      <div className="grid relative grid-cols-1 gap-0 mx-auto">
        <div className="lg:w-[440px] xs:w-[330px]  p-7 my-12 bg-login-bg">
          <div className="content">
            <div className="login__header mb-7">
              <h2 className="text-sec-green text-2xl font-normal mb-2">
                {t("action.login")}
              </h2>
            </div>
            <div className="login__main">
              <form>
                <div className="form-item relative table w-full mb-5">
                  <label className="text-label flex font-normal mb-2">
                    <span>{t("label.phone")}</span>
                  </label>
                  <NomadInput
                    id="username"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                  ></NomadInput>
                  <p
                    className="help_error text-[#cf304a]"
                    data-testid="user-error-sms"
                  >
                    {form.usernameError}
                  </p>
                </div>
                <div className="form-item relative table w-full mb-5">
                  <label className="text-label flex font-normal mb-2">
                    {t("label.password")}
                  </label>
                  <NomadInput
                    id="password"
                    name="password"
                    value={form.password}
                    obscureText={true}
                    onChange={handleChange}
                  ></NomadInput>
                  <p
                    className="help_error text-[#cf304a]"
                    data-testid="user-error-sms"
                  >
                    {form.passwordError}
                  </p>
                </div>
                <div className="form-item relative table w-full mb-5">
                  <NomadBtn
                    width={"100%"}
                    height={"44px"}
                    onClick={() => {
                      if (validateForm()) {
                        dispatch(
                          userLogin({
                            username: form.username,
                            password: form.password,
                          })
                        );
                      }
                    }}
                    className="item-[#081227] items-center justify-center w-full flex font-normal pt-0 pb-0 pr-[20px] pl-[20px] transition-all duration-[0.15s] ease-in delay-[0s] border-[#0000] border-solid border-[1px] rounded-[8px]"
                    isLoading={isLoading}
                    type={BtnType.secondary}
                  >
                    {t("action.login")}
                  </NomadBtn>
                  <NomadToast />
                </div>
                <div className="flex mt-6 flex-col text-sec-green">
                  <Link className="mb-2" to="/forgot">
                    {t("action.forget")}
                  </Link>
                  <Link to="/register">{t("action.register")}</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default LoginPage;
