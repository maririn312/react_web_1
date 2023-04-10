// import clsx from "clsx";
// import { FunctionComponent } from "react";
// import { useTranslation } from "react-i18next";
// import { Link } from "react-router-dom";
// import { UserProfileResponseDto } from "../../models/user/UserProfileResponseDto";
// import StringUtility from "../../utility/StringUtility";
// import { UserMenu } from "./profilePage.test";

// interface ProfileSectionProps {
//   data: UserProfileResponseDto;
//   activeUserMenu: UserMenu;
// }

// const ProfileSection: FunctionComponent<ProfileSectionProps> = (
//   props: ProfileSectionProps
// ) => {
//   const { t } = useTranslation();
  
//   const defaultBtn = "py-2 px-2 rounded-lg text-sec-black font-semibold";

//   return (
//     <div className="pt-3 flex flex-col sm:flex-row items-center justify-center">
//       <Link to={`/profile/general`}>
//         <div
//           className={clsx(defaultBtn, {
//             "bg-sec-green": props.activeUserMenu === UserMenu.GENERAL,
//           })}
//         >
//           Хувийн мэдээлэл
//         </div>
//       </Link>
//       <Link to={`/profile/info`}>
//         <div
//           className={clsx(defaultBtn, {
//             "bg-sec-green": props.activeUserMenu === UserMenu.INFO,
//           })}
//         >
//           Баталгаажуулалт
//         </div>
//       </Link>
//       <Link to={`/profile/account`}>
//         <div
//           className={clsx(defaultBtn, {
//             "bg-sec-green": props.activeUserMenu === UserMenu.ACCOUNT,
//           })}
//         >
//           Дансны удирдлага
//         </div>
//       </Link>
//       <Link to={`/profile/config`}>
//         <div
//           className={clsx(defaultBtn, {
//             "bg-sec-green": props.activeUserMenu === UserMenu.CONFIG,
//           })}
//         >
//           Тохиргоо
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default ProfileSection;
import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import NftCardDetailPage from "../../../pages/nft-detail/NftCardDetailPage";
import ProfileSection from "../../../pages/profile/ProfileSection";

i18n.init();

describe('Profile Section test', () => {
  const initialProfileSectionState = {
      user:{
          username: 'khatnaa'
      },
      addWallet: {
          wallet:{
              id: 'wallet1'
          }
      }
  };

  const mockStore = configureStore();
  let store;

  test('render Profile Section', () => {
      store = mockStore(initialProfileSectionState);
      render(
        <Provider store={store}>
            <ProfileSection data={store.data} activeUserMenu={store.activeUserMenu} />
        </Provider>,
        {wrapper: BrowserRouter}
      );
  })
});