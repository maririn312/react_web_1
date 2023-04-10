import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/outline";
import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { RESPONSE_ERROR, RESPONSE_SUCCESS } from "../../../app/appConst";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { BxButton, BxButtonType, BxImageUpload, BxInput } from "../../../components";
import { BxCard } from "../../../components/bx/BxCard";
import { BxMessage, BxMessageType } from "../../../components/bx/BxMessage";
import { userKyc, userState } from "../../../redux/user/userSlice";
import { userUploadProfile } from "../../../service/userApiClient";
import ErrorManager from "../../../utility/ErrorManager";

interface SettingsSectionProps {
  
}

const SettingsSection:FunctionComponent<SettingsSectionProps> = (props:SettingsSectionProps) => {
  const { t } = useTranslation();
  const user = useAppSelector(userState);
  const dispatch = useAppDispatch();

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    oldPasswordError: '',
    newPassword: '',
    newPasswordError: '',
    newPasswordRe: '',
    newPasswordReError: '',
    isLoading: false,
    error: '',
  });

  const [profileImg, setProfileImg] = useState({
    img: '',
    isLoading: false,
    error: '',
  });

  // ======================================================= //
  // ======================================================= //
  const handleUpload = (file:File | undefined | null, name:string) => {
    if(file !== undefined && file !== null) {
      uploadProfile(file);
    }
  }

  // ======================================================= //
  // ======================================================= //
  async function uploadProfile(file:File) {
    setProfileImg({...profileImg, img: URL.createObjectURL(file), isLoading: true, error: ''});
    try {
      const response = await userUploadProfile(file);
      if(response.status === RESPONSE_SUCCESS) {
        setProfileImg({...profileImg});
        dispatch(userKyc());
      } else if(response.status === RESPONSE_ERROR) {
        setProfileImg({...profileImg, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setProfileImg({...profileImg, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  /* ============================================================================ */
  /* ============================================================================ */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({ ...passwordForm, [event.target.name]: event.target.value });
  }

  /* ============================================================================ */
  /* ============================================================================ */
  const PersonalInfo = () => {
    return (
      <div>
         <div className="text-xl font-bold">{t('title.personalInfo')}</div>
         <hr className="my-2"/>
         <div className="">
          {Label(t('label.kycStatus'), 
            user.info?.kyc.kyc_confirmed_flag 
            ? <div className="badge badge-success">{t('action.yes')}</div> 
            : <div className="badge badge-error">{t('action.no')}</div>
          )}
          {Label(t('label.lastname'), user.info?.kyc.last_name)}
          {Label(t('label.firstname'), user.info?.kyc.first_name)}
          {Label(t('label.registerNo'), user.info?.kyc.registration_no)}
         </div>
      </div>
    );
  }

  /* ============================================================================ */
  /* ============================================================================ */
  const ProfileImages = () => {
    return (
      <div>
         <div className="text-xl font-bold">{t('title.personalInfo')}</div>
         <hr className="my-2"/>
         <div className="flex gap-2">
          <div>
            <BxImageUpload
              image={profileImg.img}
              isLoading={profileImg.isLoading}
              onUpload={handleUpload}
            />
          </div>
         </div>
      </div>
    );
  }

  /* ============================================================================ */
  /* ============================================================================ */
  const Label = (label:string | undefined, value:React.ReactNode) => {
    return <div className="mb-2">
      <div className="text-sm font-semibold">{label}</div>
      <div>{value}</div>
    </div>
  }

  /* ============================================================================ */
  /* ============================================================================ */
  const ChangePassword = () => {
    return (
      <Disclosure>
        {({ open }) => (
          <BxCard className="w-96 p-1">
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-lg font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <h2 className="">{t('label.changePassword')}</h2>
              <ChevronUpIcon
                className={`${
                  open ? 'rotate-180 transform' : ''
                } h-5 w-5 text-purple-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 p-1">
              <form>
                <div className="form-control">
                  <label className="label">
                    <span>{t("label.oldPassword")}</span>
                  </label>
                  <BxInput
                    id='oldPassword'
                    name='oldPassword'
                    placeholder={t("label.oldPassword")}
                    error={passwordForm.oldPasswordError}
                    onChange={handleChange}
                    obscureText={true}
                    value={passwordForm.oldPassword}
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span>{t("label.newPassword")}</span>
                  </label>
                  <BxInput
                    id='newPassword'
                    name='newPassword'
                    placeholder={t("label.newPassword")}
                    error={passwordForm.newPasswordError}
                    onChange={handleChange}
                    obscureText={true}
                    value={passwordForm.newPassword}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span>{t("label.newPasswordRe")}</span>
                  </label>
                  <BxInput
                    id='newPasswordRe'
                    name='newPasswordRe'
                    placeholder={t("label.newPasswordRe")}
                    error={passwordForm.newPasswordReError}
                    onChange={handleChange}
                    obscureText={true}
                    value={passwordForm.newPasswordRe}
                  />
                </div>
                
                <BxButton className="w-full mt-6" type={BxButtonType.gradient} onClick={() => {console.log('GG')}}>
                  {t('action.change')}
                </BxButton>

                <BxMessage
                  type={BxMessageType.error}
                  message={passwordForm.error} 
                />
              </form>
            </Disclosure.Panel>
          </BxCard>
        )}
      </Disclosure>
    );
  }

  return (
    <div className="grid gap-3">
      {PersonalInfo()}
      {ProfileImages()}
      {ChangePassword()}
    </div>
  );
}

export default SettingsSection;