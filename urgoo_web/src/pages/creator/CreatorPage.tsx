import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { TabTitle } from "../../utility/TabTitleUtility";
import MnTranslation from "../../i18n/mn/translation.json";
import { getCreatorByNickname } from "../../service/creatorApiClient";
import {
  RESPONSE_SUCCESS,
  URL_IMG_ROOT,
  USER_IMG_DEFAULT,
} from "../../app/appConst";
import { CreatorByNicknameResponseDto } from "../../models/creator/CreatorByNicknameResponseDto";
import { faListNumeric } from "@fortawesome/free-solid-svg-icons";
import ErrorManager from "../../utility/ErrorManager";
import userEvent from "@testing-library/user-event";
import StringUtility from "../../utility/StringUtility";
import CreatorTabs from "../../components/creator-tabs/CreatorTabs";

export enum NftMenu {
  COLLECTIBLES,
  CREATED,
}

const CreatorPage = () => {
  TabTitle(MnTranslation.mainTitle.creatorTitle);

  const { t } = useTranslation();
  const { creatorId } = useParams();
  const [isShowing, setIsShowing] = useState(true);
  const [info, setInfo] = useState({
    isLoading: false,
    error: "",
    nickname: "",
    profile_photo_md: "",
    profile_photo_sm: "",
    cover_picture: "",
    facebook_url: "",
    twitter_url: "",
    instagram_url: "",
    likes: 0,
    seen: 0,
    created: 0,
    shared: 0,
    verified_flag: false,
  });
  const [nftMenu, setNftMenu] = useState<NftMenu>(NftMenu.COLLECTIBLES);

  //   useEffect(() => {
  //     setIsShowing(false);

  //     if (menu === "collectibles") {
  //       setNftMenu(NftMenu.COLLECTIBLES);
  //     } else if (menu === "created") {
  //       setNftMenu(NftMenu.CREATED);
  //     }
  //   }, [menu]);

  async function creatorInfo() {
    if (creatorId === undefined) return;

    setInfo({ ...info, isLoading: true });
    try {
      const response = await getCreatorByNickname({ nickname: creatorId });
      if (response.status === RESPONSE_SUCCESS) {
        setInfo({
          ...info,
          isLoading: false,
          nickname: response.nickname,
          profile_photo_md: response.profile_photo_md,
          profile_photo_sm: response.profile_photo_sm,
          cover_picture: response.cover_picture,
          facebook_url: response.facebook_url,
          twitter_url: response.twitter_url,
          instagram_url: response.instagram_url,
          likes: response.likes,
          seen: response.seen,
          created: response.created,
          shared: response.shared,
          verified_flag: response.verified_flag,
        });
      } else {
        setInfo({
          ...info,
          isLoading: false,
          error: response.msg,
        });
      }
    } catch (error) {
      setInfo({
        ...info,
        isLoading: false,
        error: ErrorManager.handleRequestError(error),
      });
    }
  }

  function handleClick(link: string) {
    window.open(link);
  }

  useEffect(() => {
    creatorInfo();
  }, [creatorId]);

  // ================================================================== //
  const Cover = () => {
    const cover = info.cover_picture;
    return (
      <div className="relative w-full aspect-[3/1] relative"
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
  const fillGrey = "#abb5cf";
  return (
    <div className="profile__wrapper">
      <div className="relative mb-5">{Cover()}</div>
      <div className="wrap__container relative grid grid-cols-1 gap-0 my-0 mx-auto w-[86vw] max-w-[1200px]">
        <div className="wrap__main pt-5">
          <div className="grid lg:grid-cols-320px grid-cols-1 gap-8">
            <div className="relative">
              <div className="profile__img -top-[85px] sm:-top-[130px] absolute  border-profile-b box-border ">
                {info.profile_photo_md === USER_IMG_DEFAULT ? (
                  <div className="object-cover rounded-full left-0 w-[84px] h-[84px] sm:w-[130px] sm:h-[130px] bg-white p-[5px]"></div>
                ) : (
                  <img
                    className="object-cover rounded-full left-0 w-[84px] h-[84px]  sm:w-[130px] sm:h-[130px] bg-white p-[5px]"
                    src={`${URL_IMG_ROOT}/${info.profile_photo_md}`}
                    alt=""
                  />
                )}
              </div>
              <div className="main pt-5">
                <div className="content relative">
                  <h1 className="text-white my-[15px] font-bold text-[28px] uppercase">
                    {StringUtility.extractNickName(info.nickname)[0]}
                    <span className="ml-1 text-base text-sec-grey">
                      @{StringUtility.extractNickName(info.nickname)[1]}
                    </span>
                  </h1>
                  <div className="flex items-center text-white text-base">
                    {info.nickname}
                  </div>
                  <div className="my-7 socials">
                    <ul className="flex items-center">
                      <span
                        className="cursor-pointer flex items-center justify-center h-6 w-6 bg-no-repeat "
                        onClick={() => handleClick(info.facebook_url)}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24">
                          <path
                            fill={fillGrey}
                            d="M24 12.0709C23.9997 9.77768 23.3424 7.53257 22.1058 5.60135C20.8692 3.67013 19.1051 2.13368 17.0225 1.17388C14.9398 0.214091 12.6257 -0.128845 10.3542 0.185675C8.08263 0.500195 5.94878 1.459 4.20524 2.94858C2.4617 4.43816 1.18149 6.39613 0.516158 8.5907C-0.149172 10.7853 -0.171753 13.1245 0.451088 15.3315C1.07393 17.5385 2.31611 19.5208 4.03057 21.0438C5.74503 22.5668 7.85996 23.5666 10.125 23.9249V15.5399H7.078V12.0699H10.125V9.42788C10.125 6.42088 11.917 4.75788 14.657 4.75788C15.557 4.77188 16.455 4.84988 17.344 4.99288V7.94688H15.83C15.5721 7.91267 15.3098 7.93693 15.0626 8.01785C14.8153 8.09877 14.5895 8.23429 14.4017 8.41436C14.214 8.59443 14.0691 8.81445 13.9779 9.0581C13.8868 9.30175 13.8516 9.56279 13.875 9.82188V12.0719H17.2L16.668 15.5409H13.868V23.9259C16.6922 23.4808 19.2647 22.042 21.1223 19.8686C22.9798 17.6952 24.0003 14.9299 24 12.0709Z"
                          ></path>
                        </svg>
                      </span>
                      <span
                        className="cursor-pointer ml-4 flex items-center justify-center h-6 w-6 bg-no-repeat"
                        onClick={() => handleClick(info.twitter_url)}
                      >
                        <svg width="24" height="20" viewBox="0 0 24 20">
                          <path
                            fill={fillGrey}
                            d="M24 2.60078C23.1 3.00078 22.2 3.30078 21.2 3.40078C22.2 2.80078 23 1.80078 23.4 0.700781C22.4 1.30078 21.4 1.70078 20.3 1.90078C19.4 0.900781 18.1 0.300781 16.7 0.300781C14 0.300781 11.8 2.50078 11.8 5.20078C11.8 5.60078 11.8 6.00078 11.9 6.30078C7.7 6.10078 4.1 4.10078 1.7 1.10078C1.2 1.90078 1 2.70078 1 3.60078C1 5.30078 1.9 6.80078 3.2 7.70078C2.4 7.70078 1.6 7.50078 1 7.10078V7.20078C1 9.60078 2.7 11.6008 4.9 12.0008C4.5 12.1008 4.1 12.2008 3.6 12.2008C3.3 12.2008 3 12.2008 2.7 12.1008C3.3 14.1008 5.1 15.5008 7.3 15.5008C5.6 16.8008 3.5 17.6008 1.2 17.6008C0.8 17.6008 0.4 17.6008 0 17.5008C2.2 18.9008 4.8 19.7008 7.5 19.7008C16.6 19.7008 21.5 12.2008 21.5 5.70078V5.10078C22.5 4.40078 23.3 3.50078 24 2.60078Z"
                          ></path>
                        </svg>
                      </span>
                      <span
                        className="cursor-pointer ml-4 flex items-center justify-center h-6 w-6 bg-no-repeat"
                        onClick={() => handleClick(info.instagram_url)}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24">
                          <path
                            fill={fillGrey}
                            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                          ></path>
                        </svg>
                      </span>
                    </ul>
                  </div>
                  <div className="status">
                    <ul className="grid grid-cols-2 gap-2.5">
                      <li className="py-2 px-3 rounded-lg bg-creator">
                        <label className="text-price text-xs font-semibold">
                          {t("label.liked")}
                        </label>
                        <p className="text-white text-sm font-semibold">
                          {info.likes}
                        </p>
                      </li>
                      <li className="py-2 px-3 rounded-lg bg-creator">
                        <label className="text-price text-xs font-semibold">
                          {t("label.seen")}
                        </label>
                        <p className="text-white text-sm font-semibold">
                          {info.seen}
                        </p>
                      </li>
                      <li className="py-2 px-3 rounded-lg bg-creator">
                        <label className="text-price text-xs font-semibold">
                          {t("label.created")}
                        </label>
                        <p className="text-white text-sm font-semibold">
                          {info.created}
                        </p>
                      </li>
                      <li className="py-2 px-3 rounded-lg bg-creator">
                        <label className="text-price text-xs font-semibold">
                          {t("label.shared")}
                        </label>
                        <p className="text-white text-sm font-semibold">
                          {info.shared}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="list w-full flex-col">
              <CreatorTabs nickname={info.nickname} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorPage;
