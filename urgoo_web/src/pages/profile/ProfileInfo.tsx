import { useEffect, useState } from "react";
import NomadBtn, { BtnType } from "../../components/nomad/NomadBtn";
import NomadFileInput from "../../components/nomad/NomadFileInput";
import NomadInput from "../../components/nomad/NomadInput";
import { UserProfileResponseDto } from "../../models/user/UserProfileResponseDto";
import {
  ChangeInfo,
  userMeStatus,
  UserUploadKycBack,
  UserUploadKycFront,
  UserUploadKycSelfie,
} from "../../service/userApiClient";
import ErrorManager from "../../utility/ErrorManager";
import { TabTitle } from "../../utility/TabTitleUtility";
import MnTranslation from "../../i18n/mn/translation.json";
import { useTranslation } from "react-i18next";
import notConfirm from "../../assets/img/__account_notcomplete_icon.c56020ad0adb483fddbb.svg";
import userIdFront from "../../assets/img/id_front_icon.svg";
import selfie from "../../assets/img/selfie_icon.svg";
import confirm from "../../assets/img/__account_complete_icon.10f3d95fe7b6faf37069.svg";
import {
  RESPONSE_ERROR,
  RESPONSE_SUCCESS,
  URL_IMG_ROOT,
} from "../../app/appConst";
import NomadToast, {
  ToastAlert,
  ToastType,
} from "../../components/nomad/NomadToast";
import { ChangeInfoRequestDto } from "../../models/user/ChangeInfoRequestDts";

const ProfileInfo = () => {
  const { t } = useTranslation();

  const [userInfo, setUserInfo] = useState({
    userInfo: {} as UserProfileResponseDto,
    isLoading: false,
    error: "",
  });

  const [form, setForm] = useState({
    regNo: "",
    lastname: "",
    firstname: "",
    error: "",
    isLoading: false,
  });

  const [uploadSelfieLoading, setUploadSelfieLoading] =
    useState<boolean>(false);
  const [uploadFrontLoading, setUploadFrontLoading] = useState<boolean>(false);
  const [uploadBackLoading, setUploadBackLoading] = useState<boolean>(false);

  TabTitle(MnTranslation.mainTitle.profileInfo);

  useEffect(() => {
    getUserInfo();
  }, []);

  // ================================================================== //
  async function getUserInfo() {
    setUserInfo({ ...userInfo, isLoading: true });
    try {
      const response = await userMeStatus();
      if (response.status === RESPONSE_SUCCESS) {
        setUserInfo({ ...userInfo, isLoading: false });
        setForm({
          ...form,
          regNo: response.regNo,
          firstname: response.firstName,
          lastname: response.lastName,
        });
      } else if (response.status === RESPONSE_ERROR) {
        ToastAlert(response.msg, ToastType.ERROR);
        setUserInfo({ ...userInfo, isLoading: false });
      }
      setUserInfo({ ...userInfo, error: "", userInfo: response });
    } catch (error) {
      ToastAlert(ErrorManager.handleRequestError(error), ToastType.ERROR);

      setUserInfo({
        ...userInfo,
        error: ErrorManager.handleRequestError(error),
      });
    }
  }

  // ================================================================== //
  async function uploadSelfie(file: File) {
    setUploadSelfieLoading(true);
    try {
      const response = await UserUploadKycSelfie(file);
      if (response.status === RESPONSE_SUCCESS) {
        getUserInfo();
        ToastAlert(response.msg, ToastType.SUCCESS);
      } else if (response.status === RESPONSE_ERROR) {
        ToastAlert(response.msg, ToastType.ERROR);
      }
      setUploadSelfieLoading(false);
    } catch (ex) {
      setUploadSelfieLoading(false);
      ToastAlert(ErrorManager.handleRequestError(ex), ToastType.ERROR);
    }
  }

  // ================================================================== //
  async function uploadFront(file: File) {
    setUploadFrontLoading(true);
    try {
      const response = await UserUploadKycFront(file);
      if (response.status === RESPONSE_SUCCESS) {
        getUserInfo();
        ToastAlert(response.msg, ToastType.SUCCESS);
      } else if (response.status === RESPONSE_ERROR) {
        ToastAlert(response.msg, ToastType.ERROR);
      }
      setUploadFrontLoading(false);
    } catch (ex) {
      setUploadFrontLoading(false);
      ToastAlert(ErrorManager.handleRequestError(ex), ToastType.ERROR);
    }
  }

  // ================================================================== //
  async function uploadBack(file: File) {
    setUploadBackLoading(true);
    try {
      const response = await UserUploadKycBack(file);
      if (response.status === RESPONSE_SUCCESS) {
        getUserInfo();
        ToastAlert(response.msg, ToastType.SUCCESS);
      } else if (response.status === RESPONSE_ERROR) {
        ToastAlert(response.msg, ToastType.ERROR);
      }
      setUploadBackLoading(false);
    } catch (ex) {
      setUploadBackLoading(false);
      ToastAlert(ErrorManager.handleRequestError(ex), ToastType.ERROR);
    }
  }

  // ================================================================= //
  async function changeInfo() {
    setForm({ ...form, isLoading: true, error: "" });
    try {
      const request: ChangeInfoRequestDto = {
        regNo: form.regNo,
        firstName: form.firstname,
        lastName: form.lastname,
      };

      const response = await ChangeInfo(request);

      if (response?.status === RESPONSE_SUCCESS) {
        setForm({ ...form, isLoading: false });
        ToastAlert(response.msg, ToastType.SUCCESS);
      } else if (response?.status === RESPONSE_ERROR) {
        ToastAlert(response.msg, ToastType.WARNING);
        setForm({ ...form, isLoading: false, error: response.msg });
      }
    } catch (error) {
      setForm({
        ...form,
        isLoading: false,
        error: ErrorManager.handleRequestError(error),
      });
    }
  }

  const HandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  // ================================================================== //
  const handleUpload = (file: File | undefined | null, name: string) => {
    if (file !== undefined && file !== null) {
      if (name === "idBack") {
        uploadBack(file);
      } else if (name === "idFront") {
        uploadFront(file);
      } else if (name === "idSelfie") {
        uploadSelfie(file);
      }
    }
  };

  // ================================================================== //
  const notComplete = " text-not-complete bg-not-complete-bg";
  const complete = " text-complete bg-complete-bg ";
  const btnBefAf =
    "after:rotate-90 after:absolute after:contents-[''] after:h-0.5 after:w-[14px] after:bg-sec-black before:absolute before:contents-[''] before:h-0.5 before:w-[14px] before:bg-sec-black";
  const numBefore =
    " before:absolute  before:left-0 before:top-2/4 before:flex before:items-center before:justify-center before:text-sm before:leading-7 before:h-7 before:w-7 before:-translate-y-2/4 before:border-2 before:border-sec-black before:rounded-lg";
  return (
    <>
      <div className="grid">
        <div className="mt-6">
          <form action="">
            <h3
              className={`flex md:flex-row sm:items-center sm:justify-between flex-col items-start pl-10 text-sec-black relative text-xl font-semibold mb-4 before:content-['1'] ${numBefore}`}
            >
              {t("label.userConfirmation")}

              {userInfo.userInfo.statusCode === 2 && (
                <div
                  className={`profile__status flex items-center rounded-2xl whitespace-nowrap text-sm font-normal h-8 pr-4 pl-2 ${complete}`}
                >
                  <span
                    className="flex h-5 w-5 mr-[7px]"
                    style={{
                      backgroundImage: ` url(${confirm})`,
                    }}
                  />

                  {userInfo.userInfo.statusText}
                </div>
              )}
              {userInfo.userInfo.statusCode === 1 && (
                <div
                  className={`profile__status flex items-center rounded-2xl whitespace-nowrap text-sm font-normal h-8 pr-4 pl-2 ${notComplete}`}
                >
                  <span
                    className="flex h-5 w-5 mr-[7px]"
                    style={{
                      backgroundImage: ` url(${notConfirm})`,
                    }}
                  />

                  {userInfo.userInfo.statusText}
                </div>
              )}
              {userInfo.userInfo.statusCode === 0 && (
                <div
                  className={`profile__status flex items-center rounded-2xl whitespace-nowrap text-sm font-normal h-8 pr-4 pl-2 ${notComplete}`}
                >
                  <span
                    className="flex h-5 w-5 mr-[7px]"
                    style={{
                      backgroundImage: ` url(${notConfirm})`,
                    }}
                  />

                  {userInfo.userInfo.statusText}
                </div>
              )}
            </h3>
            <div className="warning__notice sm:flex-row flex-col text-black font-semibold flex p-4 mb-4 bg-notice border border-notice-border rounded-lg">
              <p>
                {t("label.userCardFront")} <br />
                {userInfo.userInfo.idFrontConfirmedStatusText}
              </p>
              <br />
              <p>
                {t("label.userCardBack")} <br />
                {userInfo.userInfo.idBackConfirmedStatusText}
              </p>
              <br />
              <p>
                {t("label.userSelfie")} <br />
                {userInfo.userInfo.selfieWithIdConfirmedStatusText}
              </p>
            </div>
            <div className="bg-white border border-tab-border rounded-lg">
              <div className="p-5">
                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2">
                  <div className="national__id">
                    <div className="national__id-item cursor-pointer">
                      <label className="text-white relative z-10 text-xs font-medium table pt-[10px] px-3 pb-2 bg-sec-black">
                        <span>{t("label.userCardFront")}</span>
                      </label>
                      <div className="front__id relative flex items-center justify-center p-0.5 bg-sec-black overflow-hidden">
                        {userInfo.userInfo.idFrontConfirmedStatus === 0 ? (
                          <>
                            <span
                              className="flex h-[209px] w-full bg-100%"
                              style={{
                                backgroundImage: `url(${userIdFront})`,
                                backgroundRepeat: "no-repeat",
                              }}
                            >
                              <div className="cursor-pointer z-20">
                                <NomadFileInput
                                  name="idFront"
                                  onUpload={handleUpload}
                                />
                              </div>
                            </span>
                            <i
                              className={`flex items-center justify-center absolute h-10 w-10 rounded-full bg-sec-green ${btnBefAf}`}
                            ></i>
                          </>
                        ) : (
                          <span
                            className="flex h-[209px] w-full bg-100%"
                            style={{
                              backgroundImage: `url(${
                                URL_IMG_ROOT + userInfo.userInfo.idFront
                              })`,
                              backgroundRepeat: "no-repeat",
                            }}
                          ></span>
                        )}
                      </div>
                    </div>
                    <div className="national__id-item cursor-pointer mt-4">
                      <label className="text-white relative z-10 text-xs font-medium table pt-[10px] px-3 pb-2 bg-sec-black">
                        <span>{t("label.userCardBack")}</span>
                      </label>
                      <div className="front__id relative flex items-center justify-center p-0.5 bg-sec-black overflow-hidden">
                        {userInfo.userInfo.idBackConfirmedStatus === 0 ? (
                          <>
                            <span
                              className="flex h-[209px] w-full bg-100% bg-white"
                              // style={{
                              //   backgroundImage: `url(${userIdFront})`,
                              //   backgroundRepeat: "no-repeat",
                              // }}
                            >
                              <div className="cursor-pointer z-20">
                                <NomadFileInput
                                  name="idBack"
                                  onUpload={handleUpload}
                                />
                              </div>
                            </span>
                            <i
                              className={`flex items-center justify-center absolute h-10 w-10 rounded-full bg-sec-green ${btnBefAf}`}
                            ></i>
                          </>
                        ) : (
                          <span
                            className="flex h-[209px] w-full bg-100%"
                            style={{
                              backgroundImage: `url(${
                                URL_IMG_ROOT + userInfo.userInfo.idBack
                              })`,
                              backgroundRepeat: "no-repeat",
                            }}
                          ></span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="selfie-pic cursor-pointer">
                    <label className="text-white relative z-10 text-xs font-medium table pt-[10px] px-3 pb-2 bg-sec-black">
                      <span>{t("label.uploadUserSelfie")}</span>
                    </label>
                    <div className="selfie__id h-[calc(100%-33px)] relative flex items-center justify-center p-0.5 bg-sec-black overflow-hidden z-10">
                      <div className="h-full w-full relative bg-white overflow-hidden flex justify-center items-center">
                        {userInfo.userInfo.selfieWithIdConfirmedStatus === 0 ? (
                          <>
                            <span
                              className="flex h-[209px] w-full bg-center"
                              style={{
                                backgroundImage: `url(${selfie})`,
                                backgroundRepeat: "no-repeat",
                              }}
                            >
                              <div className="cursor-pointer z-20">
                                <NomadFileInput
                                  name="idSelfie"
                                  onUpload={handleUpload}
                                />
                              </div>
                            </span>
                            <i
                              className={`flex items-center justify-center absolute h-10 w-10 rounded-full bg-sec-green ${btnBefAf}`}
                            ></i>
                          </>
                        ) : (
                          <span
                            className="flex h-[209px] w-full bg-100%"
                            style={{
                              backgroundImage: `url(${
                                URL_IMG_ROOT + userInfo.userInfo.selfieWithIid
                              })`,
                              backgroundRepeat: "no-repeat",
                              height: "100%",
                            }}
                          ></span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative border-t my-10 border-tab-border"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="form-item relative table w-full">
                    <label className="flex text-pro-label font-semibold mb-1">
                      {t("label.userId")}
                    </label>
                    <NomadInput
                      name="regNo"
                      placeholder={t("label.userId")}
                      value={form.regNo}
                      onChange={HandleChange}
                    />
                  </div>
                  <div className="form-item relative table w-full">
                    <label className="flex text-pro-label font-semibold mb-1">
                      {t("label.lastname")}
                    </label>
                    <NomadInput
                      placeholder={t("label.lastname")}
                      name="lastname"
                      value={form.lastname}
                      onChange={HandleChange}
                    />
                  </div>
                  <div className="form-item relative table w-full">
                    <label className="flex text-pro-label font-semibold mb-1">
                      {t("label.firstname")}
                    </label>
                    <NomadInput
                      placeholder={t("label.firstname")}
                      name="firstname"
                      value={form.firstname}
                      onChange={HandleChange}
                    />
                  </div>
                </div>

                <div className="flex sm:flex-row-reverse items-center sm:mt-0 mt-2">
                  <NomadBtn
                    className="w-full justify-center sm:w-auto sm:justify-start"
                    type={BtnType.secondary}
                    isLoading={form.isLoading}
                    onClick={() => {
                      changeInfo();
                    }}
                  >
                    {t("label.saveUserData")}
                  </NomadBtn>
                </div>
              </div>
            </div>
          </form>
        </div>
        <NomadToast />
      </div>
    </>
  );
};

export default ProfileInfo;
