import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { URL_IMG_ROOT, USER_IMG_DEFAULT } from "../../app/appConst";
import { useAppSelector } from "../../app/hooks";
import { userState } from "../../redux/user/userSlice";
import { TabTitle } from "../../utility/TabTitleUtility";
import { UserMenu } from "../profile/ProfilePage";
import MyNftCollected from "./MyNftCollected";
import MyNftCreated from "./MyNftCreated";
import MyNftSection from "./MyNftSection";
import MnTranslation from "../../i18n/mn/translation.json";

export enum NftMenu {
  COLLECTIBLES,
  CREATED,
}

const MyNft = () => {
  const user = useAppSelector(userState);
  const { menu } = useParams();
  const [isShowing, setIsShowing] = useState(true);
  const [nftMenu, setNftMenu] = useState<NftMenu>(NftMenu.COLLECTIBLES);

  TabTitle(MnTranslation.mainTitle.myNft);

  // ================================================================== //
  useEffect(() => {
    setIsShowing(false);

    if (menu === "collectibles") {
      setNftMenu(NftMenu.COLLECTIBLES);
    } else if (menu === "created") {
      setNftMenu(NftMenu.CREATED);
    }
  }, [menu]);

  // ================================================================== //
  const Cover = () => {
    const cover = user.info?.userMe.coverPhoto;
    return (
      <div className="page__header w-full aspect-[3/1] relative"
        style={{
          backgroundImage: `url("${URL_IMG_ROOT}/${cover}")`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
      </div>
    );
  };

  // ================================================================== //
  const NftContent = () => {
    if (nftMenu === NftMenu.COLLECTIBLES) {
      return <MyNftCollected />;
    } else if (nftMenu === NftMenu.CREATED) {
      return <MyNftCreated />;
    }
    return <></>;
  };

  const profileImgMd = user.info?.userMe.profilePictureMd;

  return (
    <div className="profile__wrapper">
      <div className="page__head relative mb-5">{Cover()}</div>
      <div className="wrap__container relative grid grid-cols-1 gap-0 my-0 mx-auto w-[86vw] max-w-[1200px]">
        <div className="wrap__main pt-5">
          <div className="grid lg:grid-cols-320px grid-cols-1 gap-8">
            <div className="relative">
              <div className="profile__img -top-[130px] absolute  border-profile-b box-border ">
                {profileImgMd === USER_IMG_DEFAULT ? (
                  <div className="object-cover rounded-full left-0  w-[130px] h-[130px] bg-white p-[5px]"></div>
                ) : (
                  <img
                    className="object-cover rounded-full left-0  w-[130px] h-[130px] bg-white p-[5px]"
                    src={`${URL_IMG_ROOT}/${profileImgMd}`}
                    alt=""
                  />
                )}
              </div>
              <h1 className="text-white my-[15px] font-bold text-[28px] uppercase">
                {user.info?.userMe.nickname}
              </h1>
              <div className="flex items-center">
                <Link
                  to={`/profile/general`}
                  className="btn font-medium bg-custom-blue hover:bg-prm-hover text-white items-center justify-center h-11 leading-[44px] py-0 px-5 border-black cursor-pointer"
                >
                  <span className="w-5 h-5">
                    <img
                      src={require("../../assets/img/edit-icon.png")}
                      alt="edit"
                    />
                  </span>
                </Link>
              </div>
            </div>
            <div className="list">
              <MyNftSection activeNftMenu={nftMenu} />
              {/* <======================================> */}
              <div className="w-full py-10">{NftContent()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyNft;
