import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  RESPONSE_ERROR,
  RESPONSE_SUCCESS,
  URL_IMG_ROOT,
  USER_IMG_DEFAULT,
} from "../../app/appConst";
import { useAppSelector } from "../../app/hooks";
import NomadBtn, { BtnType } from "../../components/nomad/NomadBtn";
import NomadInput from "../../components/nomad/NomadInput";
import { UserProfileResponseDto } from "../../models/user/UserProfileResponseDto";
import { userState } from "../../redux/user/userSlice";
import {
  UpdateProfile,
  userMeStatus,
  UserUploadCover,
  UserUploadProfile,
} from "../../service/userApiClient";
import ErrorManager from "../../utility/ErrorManager";
import { useTranslation } from "react-i18next";
import { UpdateProfileRequestDto } from "../../models/user/UpdateProfileRequestDto";
import { TabTitle } from "../../utility/TabTitleUtility";
import MnTranslation from "../../i18n/mn/translation.json";
import NomadFileInput from "../../components/nomad/NomadFileInput";
import { ToastAlert, ToastType } from "../../components/nomad/NomadToast";

const ProfileGeneral = () => {
  const { t } = useTranslation();

  const [uploadProfileLoading, setProfileLoading] = useState<boolean>(false);

  TabTitle(MnTranslation.mainTitle.profileGeneral);

  // ================================================================== //
  const [userInfo, setUserInfo] = useState({
    userInfo: {} as UserProfileResponseDto,
    isLoading: false,
    error: "",
  });

  // ================================================================== //
  const [form, setForm] = useState({
    nickname: "",
    bio: "",
    fb: "",
    twitter: "",
    instagram: "",
    error: "",
    isFormLoading: false,
  });

  // ================================================================== //
  useEffect(() => {
    getUserInfo();
  }, []);

  // ================================================================== //
  async function getUserInfo() {
    setUserInfo({ ...userInfo, isLoading: true });
    try {
      const response = await userMeStatus();
      setUserInfo({ ...userInfo, isLoading: false, userInfo: response });
      setForm({
        ...form,
        nickname: response.nickname,
        bio: response.bio,
        fb: response.fb,
        twitter: response.twitter,
        instagram: response.instagram,
      });
    } catch (error) {
      setUserInfo({
        ...userInfo,
        isLoading: false,
        error: ErrorManager.handleRequestError(error),
      });
    }
  }

  // ================================================================== //
  async function updateUserInfo() {
    setForm({ ...form, isFormLoading: true, error: "" });

    try {
      const request: UpdateProfileRequestDto = {
        nickname: form.nickname,
        bio: form.bio,
        fb: form.fb,
        twitter: form.twitter,
        instagram: form.instagram,
      };

      const response = await UpdateProfile(request);

      if (response.status === RESPONSE_SUCCESS) {
        setForm({ ...form, isFormLoading: false });
        ToastAlert(response.msg, ToastType.SUCCESS);
      } else if (response.status === RESPONSE_ERROR) {
        ToastAlert(response.msg, ToastType.WARNING);
        setForm({ ...form, isFormLoading: true, error: response.msg });
      }
    } catch (ex) {
      setForm({
        ...form,
        isFormLoading: true,
        error: ErrorManager.handleRequestError(ex),
      });
    }
  }

  // ================================================================== //
  async function uploadProfile(file: File) {
    setProfileLoading(true);
    try {
      const response = await UserUploadProfile(file);
      if (response.status === RESPONSE_SUCCESS) {
        getUserInfo();
        ToastAlert(response.msg, ToastType.SUCCESS);
      } else if (response.status === RESPONSE_ERROR) {
        ToastAlert(response.msg, ToastType.ERROR);
      }
      setProfileLoading(false);
    } catch (ex) {
      setProfileLoading(false);
      ToastAlert(ErrorManager.handleRequestError(ex), ToastType.ERROR);
    }
  }

  // ================================================================== //
  const handleUpload = (file: File | undefined | null, name: string) => {
    if (file !== undefined && file !== null) {
      if (name === "profile") {
        uploadProfile(file);
      }
    }
  };

  // ================================================================== //
  const HandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  // ================================================================== //
  const HandeTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  // ================================================================== //
  const profileBefore =
    " before:absolute before:left-2/4 before:bottom-6 before:h-10 before:w-10 before:pointer-events-none content-['']";

  // ================================================================== //
  return (
    <>
      <div className="grid">
        <div className="bg-white border border-tab-border rounded-lg">
          <div className="p-5">
            <div className="sm:grid sm:gap-6 grid-cols-200px">
              <div className="profile__img-wrap mb-4 sm:mb-0">
                <div
                  className={`relative rounded-lg overflow-hidden ${profileBefore}`}
                >
                  <img
                    className="object-cover h-[200px] w-[200px]"
                    src={
                      userInfo.userInfo.profilePictureMd === USER_IMG_DEFAULT
                        ? "/img/default-profile.png"
                        : `${URL_IMG_ROOT}/${userInfo.userInfo.profilePictureMd}`
                    }
                    alt=""
                  />
                  <div className="cursor-pointer z-20">
                    <NomadFileInput name="profile" onUpload={handleUpload} />
                  </div>
                </div>
              </div>
              <div className="profile__form">
                <form action="">
                  <div className="form-item relative table w-full mb-5">
                    <label className="flex text-pro-label font-semibold mb-1">
                      {t("label.nickname")}
                    </label>
                    <NomadInput readonly={true} value={form.nickname} />
                  </div>
                  <div className="form-item relative table w-full mb-5">
                    <label className="flex text-pro-label font-semibold mb-1">
                      {t("label.userBio")}
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      placeholder={t("holder.bio")}
                      value={form.bio}
                      className="text-sm text-black min-h-12 px-4 w-full leading-10 bg-white rounded-lg border-input-bor focus:border-sec-green hover:border-sec-green border focus:border focus:outline-none "
                      onChange={HandeTextChange}
                    ></textarea>
                  </div>
                  <div className="form-item relative table w-full mb-5">
                    <label className="flex text-pro-label font-semibold mb-1">
                      {t("label.userSocialFb")}
                    </label>
                    <NomadInput
                      name="fb"
                      value={form.fb}
                      placeholder={t("label.userSocialFb")}
                      onChange={HandleChange}
                    />
                  </div>
                  <div className="form-item relative table w-full mb-5">
                    <label className="flex text-pro-label font-semibold mb-1">
                      {t("label.userSocialTwitter")}
                    </label>
                    <NomadInput
                      name="twitter"
                      value={form.twitter}
                      placeholder={t("label.userSocialTwitter")}
                      onChange={HandleChange}
                    />
                  </div>
                  <div className="form-item relative table w-full mb-5">
                    <label className="flex text-pro-label font-semibold mb-1">
                      {t("label.userSocialInstagram")}
                    </label>
                    <NomadInput
                      name="instagram"
                      value={form.instagram}
                      placeholder={t("label.userSocialInstagram")}
                      onChange={HandleChange}
                    />
                  </div>
                  <NomadBtn
                    type={BtnType.secondary}
                    width={"100%"}
                    className="justify-center"
                    isLoading={form.isFormLoading}
                    onClick={() => {
                      updateUserInfo();
                    }}
                  >
                    {t("label.userSave")}
                  </NomadBtn>
                </form>
                {/* <NomadToast /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileGeneral;
