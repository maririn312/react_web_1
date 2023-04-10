import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import NomadFileInput from "../../components/nomad/NomadFileInput";
import NomadInput from "../../components/nomad/NomadInput";
import { userState } from "../../redux/user/userSlice";
import NomadBtn, { BtnType } from "../../components/nomad/NomadBtn";
import { UserProfileResponseDto } from "../../models/user/UserProfileResponseDto";
import { userMeStatus, UserUploadCover } from "../../service/userApiClient";
import ErrorManager from "../../utility/ErrorManager";
import {
  KYC_IMAGE_DEFAULT,
  RESPONSE_ERROR,
  RESPONSE_SUCCESS,
  URL_IMG_ROOT,
  USER_IMG_DEFAULT,
} from "../../app/appConst";
import ProfileSection from "./ProfileSection";
import ProfileGeneral from "./ProfileGeneral";
import ProfileInfo from "./ProfileInfo";
import ProfileAccount from "./ProfileAccount";
import ProfileConfig from "./ProfileConfig";
import { TabTitle } from "../../utility/TabTitleUtility";
import MnTranslation from "../../i18n/mn/translation.json";
import { ToastAlert, ToastType } from "../../components/nomad/NomadToast";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import UserUtility from "../../utility/UserUtility";

// import { useTimeoutFn } from "react-use";
export enum UserMenu {
  GENERAL,
  INFO,
  ACCOUNT,
  CONFIG,
  NONE,
}

const ProfilePage = () => {

  const { menu } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [uploadCoverLoading, setCoverLoading] = useState<boolean>(false);

  TabTitle(MnTranslation.mainTitle.profile);

  // const [form, setForm] = useState({
  //   nickname: "",
  //   userbio: "",
  // })

  const [isShowing, setIsShowing] = useState(true);

  const [userInfo, setUserInfo] = useState({
    userInfo: {} as UserProfileResponseDto,
    error: "",
    isLoading: false,
  });
  const [userMenu, setuserMenu] = useState<UserMenu>(UserMenu.NONE);

  // ================================================================== //
  useEffect(() => {
    if (UserUtility.isUserLoggedIn()) {
      getUserInfo();
    } else {
      navigate("/");
    }
  }, []);

  // ================================================================== //
  useEffect(() => {
    setIsShowing(false);
    
    if (menu === "general") {
      setuserMenu(UserMenu.GENERAL);
    } else if (menu === "info") {
      setuserMenu(UserMenu.INFO);
    } else if (menu === "account") {
      setuserMenu(UserMenu.ACCOUNT);
    } else if (menu === "config") {
      setuserMenu(UserMenu.CONFIG);
    }
  }, [menu]);

  // ================================================================== //
  async function uploadCover(file:File) {
    setCoverLoading(true);
    try {
      const response = await UserUploadCover(file);
      if(response.status === RESPONSE_SUCCESS) {
        getUserInfo();
        ToastAlert(response.msg, ToastType.SUCCESS);
      } else if(response.status === RESPONSE_ERROR) {
        ToastAlert(response.msg, ToastType.ERROR);
      }
      setCoverLoading(false);
    } catch(ex) {
      setCoverLoading(false);
      ToastAlert(ErrorManager.handleRequestError(ex), ToastType.ERROR);
    }
  }

  // ================================================================== //
  const handleUpload = (file:File | undefined | null, name:string) => { 
    if(file !== undefined && file !== null) {
      if(name === 'cover') {
        uploadCover(file);
      }
    }
  }

  // ================================================================== //
  async function getUserInfo() {
    setUserInfo({ ...userInfo, isLoading: true });
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
        isLoading: false,
        error: ErrorManager.handleRequestError(error),
      });
    }
  }

  // ================================================================== //
  const ProfileContent = ({ isShowing: boolean }) => {
    // if (isShowing) {
    if (userMenu === UserMenu.GENERAL) {
      return <ProfileGeneral />;
    } else if (userMenu === UserMenu.INFO) {
      return <ProfileInfo />;
    } else if (userMenu === UserMenu.ACCOUNT) {
      return <ProfileAccount />;
    } else if (userMenu === UserMenu.CONFIG) {
      return <ProfileConfig />;
    }
    // }
    return <></>;
  };

  const uInfo = userInfo.userInfo;

  // ================================================================== //
  const Cover = () => {
    const hasImage = !(uInfo.coverPhoto === KYC_IMAGE_DEFAULT || uInfo.coverPhoto === undefined);
    return (
      <>
        <div 
          className="page__header w-full aspect-[3/1] relative grid place-items-center" 
          style={{
            backgroundImage: `url("${URL_IMG_ROOT}/${uInfo.coverPhoto}")`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <div className="relative grid place-items-center">
            {hasImage && !userInfo.isLoading
              ? <></>
              : <div className="text-white font-bold text-sm">{t('description.coverImageSize')}</div>
            }
            <NomadBtn
              className=""
              type={BtnType.secondary}
            >
              {t('action.uploadImage')}
            </NomadBtn>
            <NomadFileInput
              name="cover"
              onUpload={handleUpload}         
            />
          </div>
        </div>
      </>
    );
  };

  // ================================================================== //
  return (
    <div className="profile__wrapper ">
      <div className="page__wrap">
        {Cover()}
        <div className="page__main bg-white min-h-[100vh-265px]">
          <div className="container mx-auto">
            <div>
              <ProfileSection data={uInfo} activeUserMenu={userMenu} />
              <div className="py-10 ">
                <div className="w-full mx-auto max-w-[800px] md:p-0 p-4">
                  {ProfileContent({ isShowing: { isShowing } })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
