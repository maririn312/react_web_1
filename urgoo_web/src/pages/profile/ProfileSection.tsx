import clsx from "clsx";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { UserProfileResponseDto } from "../../models/user/UserProfileResponseDto";
import StringUtility from "../../utility/StringUtility";
import { TabTitle } from "../../utility/TabTitleUtility";
import { UserMenu } from "./ProfilePage";
import MnTranslation from "../../i18n/mn/translation.json";

interface ProfileSectionProps {
  data: UserProfileResponseDto;
  activeUserMenu: UserMenu;
}

const ProfileSection: FunctionComponent<ProfileSectionProps> = (
  props: ProfileSectionProps
) => {
  const { t } = useTranslation();

  TabTitle(MnTranslation.mainTitle.profileSection);
  
  const defaultBtn = "py-2 px-2 rounded-lg text-sec-black font-semibold";

  return (
    <div className="pt-3 flex flex-col sm:flex-row items-center justify-center">
      <Link to={`/profile/general`}>
        <div
          className={clsx(defaultBtn, {
            "bg-sec-green": props.activeUserMenu === UserMenu.GENERAL,
          })}
        >
          {t("profile.personalInfo")}
        </div>
      </Link>
      <Link to={`/profile/info`}>
        <div
          className={clsx(defaultBtn, {
            "bg-sec-green": props.activeUserMenu === UserMenu.INFO,
          })}
        >
          {t("profile.confirmation")}
        </div>
      </Link>
      <Link to={`/profile/account`}>
        <div
          className={clsx(defaultBtn, {
            "bg-sec-green": props.activeUserMenu === UserMenu.ACCOUNT,
          })}
        >
          {t("profile.accountControl")}
        </div>
      </Link>
      <Link to={`/profile/config`}>
        <div
          className={clsx(defaultBtn, {
            "bg-sec-green": props.activeUserMenu === UserMenu.CONFIG,
          })}
        >
          {t("profile.settings")}
        </div>
      </Link>
    </div>
  );
};

export default ProfileSection;
