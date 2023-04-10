import React, { useEffect, useState } from "react";
import { RESPONSE_SUCCESS } from "../../app/appConst";
import { useAppSelector } from "../../app/hooks";
import NomadBtn, { BtnType } from "../../components/nomad/NomadBtn";
import { UserProfileResponseDto } from "../../models/user/UserProfileResponseDto";
import { userState } from "../../redux/user/userSlice";
import { userMeStatus } from "../../service/userApiClient";
import ErrorManager from "../../utility/ErrorManager";
import { useTranslation } from "react-i18next";
import { TabTitle } from "../../utility/TabTitleUtility";
import MnTranslation from "../../i18n/mn/translation.json";
import UserPasswordChangeDialog from "./UserPasswordChangeDialog";
import walletIcon from "./../../assets/img/wallet_icon.dd7e5aade12e2577d81b.svg";

const ProfileConfig = () => {
  const user = useAppSelector(userState);
  const { t } = useTranslation();

  TabTitle(MnTranslation.mainTitle.profileConfig);

  const [isUserPasswordChangeShowing, setUserPasswordChangeShowing] = React.useState(false);
  const [userInfo, setUserInfo] = useState({
    userInfo: {} as UserProfileResponseDto,
    error: "",
    isLoading: false,
  });

  useEffect(() => {
    getUserInfo();
  }, []);

  async function getUserInfo() {
    try {
      const response = await userMeStatus();

      if (response.status === RESPONSE_SUCCESS) {
        setUserInfo({ ...userInfo, isLoading: false, userInfo: response });
      } else {
        setUserInfo({ ...userInfo, isLoading: false, error: response.msg });
      }
    } catch (error) {
      setUserInfo({
        ...userInfo,
        error: ErrorManager.handleRequestError(error),
      });
    }
  }

  const numBefore =
    " before:absolute  before:left-0 before:top-2/4 before:flex before:items-center before:justify-center before:text-sm before:leading-7 before:h-7 before:w-7 before:-translate-y-2/4 before:border-2 before:border-sec-black before:rounded-lg";
  return (
    <>
      <div className="profile__info">
        <h3
          className={`pl-10 text-sec-black relative text-xl font-semibold mb-4 before:content-['1'] ${numBefore}`}
        >
          {t("label.userAprove")}
        </h3>
        <div className="bg-white border border-tab-border rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="grid gap-4 grid-cols-40px items-center">
                <div className="flex h-10 w-10 rounded-lg bg-svg-back justify-center items-center">
                  <div
                    className="flex h-6 w-6 bg-no-repeat bg-100% bg-50%"
                    style={{
                      backgroundImage: `url(${walletIcon})`,
                    }}
                  ></div>
                </div>
                <p className="text-base font-bold">
                  {userInfo.userInfo.phoneNo}
                </p>
              </div>
            </div>
          </div>
        </div>
        <h3
          className={`pl-10 text-sec-black relative text-xl mt-10 font-semibold mb-4 before:content-['2'] ${numBefore}`}
        >
          {t("label.userEmail")}
        </h3>
        <div className="bg-white border border-tab-border rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="grid gap-4 grid-cols-40px items-center">
                <div className="flex h-10 w-10 rounded-lg bg-svg-back justify-center items-center">
                  <div
                    className="flex h-6 w-6 bg-no-repeat bg-100% bg-50%"
                    style={{
                      backgroundImage: `url(${walletIcon})`,
                    }}
                  ></div>
                </div>
                <p className="text-base font-bold">
                  {userInfo.userInfo.email
                    ? userInfo.userInfo.email
                    : t("label.userNotRegistered")}
                </p>
              </div>
            </div>
          </div>
        </div>
        <h3
          className={`pl-10 text-sec-black relative mt-10 text-xl font-semibold mb-4 before:content-['3'] ${numBefore}`}
        >
          {t("label.userPassword")}
        </h3>
        <div className="bg-white border border-tab-border rounded-lg">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div className="grid gap-4 grid-cols-40px items-center">
                <div className="flex h-10 w-10 rounded-lg bg-svg-back justify-center items-center">
                  <div
                    className="flex h-6 w-6 bg-no-repeat bg-100% bg-50%"
                    style={{
                      backgroundImage: `url(${walletIcon})`,
                    }}
                  ></div>
                </div>
                <p className="text-base font-bold">{t("label.userSecure")}</p>
              </div>
              <NomadBtn 
                type={BtnType.secondary} 
                width=""
                onClick={ 
                  () => setUserPasswordChangeShowing(!isUserPasswordChangeShowing)
                }
              >
                {t("label.userChange")}
              </NomadBtn>
              <UserPasswordChangeDialog 
                isOpen={isUserPasswordChangeShowing} 
                setIsOpen={setUserPasswordChangeShowing} 
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileConfig;
