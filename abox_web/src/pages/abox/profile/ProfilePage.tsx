import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { BxCard } from "../../../components/bx/BxCard";
import { getAuctionsByNickname, getFeedbacksByNickname, getUserByNickname } from "../../../service/userApiClient";
import UserUtility from "../../../utility/UserUtility";
import ErrorManager from '../../../utility/ErrorManager';
import ProfileSection from "./ProfileSection";
import UserProfileResponseDto from "../../../models/user/UserProfileResponseDto";
import { FeedbackDto } from "../../../models/feedback/FeedbackDto";
import { AuctionDto } from "../../../models/auction/AuctionDto";
import AuctionsSection from "./AuctionsSection";
import FeedbackSection from "./FeedbacksSection";
import { userState } from "../../../redux/user/userSlice";
import { KYC_IMAGE_DEFAULT, URL_BACKEND_DOWNLOAD } from "../../../app/appConst";
import WalletSection from "./WalletSection";
import SettingsSection from "./SettingsSection";
import MyAuctionWatchedSection from "./MyWatchedAuctionsSection";
import MyAuctionCreatedSection from "./MyCreatedAuctionsSection";
import NewAuctionSection from "./NewAuctionSection";
import { useTimeoutFn } from 'react-use'
import { Transition } from "@headlessui/react";

export enum UserMenu {
  NONE,
  PROFILE,
  WALLET,
  SETTINGS,
  MY_AUCTION_WATCHED,
  MY_AUCTION_CREATED,
  NEW_AUCTION,
  DRIVER,
}

const ProfilePage:FunctionComponent = () => {

  const { nickname, menu } = useParams();
  const navigate = useNavigate();
  const user = useAppSelector(userState);

  const [isShowing, setIsShowing] = useState(true);
  const [, , resetIsShowing] = useTimeoutFn(() => setIsShowing(true), 500);

  const [isMe, setIsMe] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState({
    userInfo: {} as UserProfileResponseDto,
    error: '',
  });

  const [userMenu, setUserMenu] = useState<UserMenu>(UserMenu.NONE);

  useEffect(() => {
    
  }, []);

  useEffect(() => {
    getUserInfo();
  }, [nickname]);

  useEffect(() => {
    checkIsMe();
  }, [user.info, nickname]);

  useEffect(() => {
    getUserInfo();
  }, [user.info?.image]);

  useEffect(() => {
    setIsShowing(false);
    resetIsShowing();

    if(menu === undefined) {
      setUserMenu(UserMenu.PROFILE);
    } if(menu === 'wallet') {
      setUserMenu(UserMenu.WALLET);
    } else if(menu === 'new') {
      setUserMenu(UserMenu.NEW_AUCTION);
    } else if(menu === 'au') {
      setUserMenu(UserMenu.NEW_AUCTION);
    }else if(menu === 'watchedAuctions') {
      setUserMenu(UserMenu.MY_AUCTION_WATCHED);
    } else if(menu === 'createdAuctions') {
      setUserMenu(UserMenu.MY_AUCTION_CREATED);
    } else if(menu === 'settings') {
      setUserMenu(UserMenu.SETTINGS);
    }
  }, [menu]);

  // ================================================================== //
  function checkIsMe() {
    if(user.isLoggedIn) {
      if(user.info?.kyc.nickname === nickname) {
        if(!user.info?.kyc.kyc_confirmed_flag) {
          navigate('/kyc');
        } else {
          setIsMe(true);
        }
      }
    }
  }

  // ================================================================== //
  async function getUserInfo() { 
    if(nickname === undefined) return;
    try {
      const response = await getUserByNickname(nickname);
      setUserInfo({...userInfo, error:'', userInfo:response});
    } catch(ex) {
      setUserInfo({...userInfo, error: ErrorManager.handleRequestError(ex)});
    }
  }

  // ================================================================== //
  const Cover = () => {
    const cover = userInfo.userInfo.cover_photo;
    if(cover === KYC_IMAGE_DEFAULT) {
      return <></>
    }

    return (
      <div className="">
        <img height="100px" className="auction-img" src={`${URL_BACKEND_DOWNLOAD}/${userInfo.userInfo.cover_photo}`} alt="Shoes" />
      </div>
    );
  }
  
  // ================================================================== //
  const Profile = () => {
    return (
      <div className="md:grid md:grid-cols-3 md:gap-4">
        <div className="md:col-span-2">
          <AuctionsSection nickname={nickname}/>
        </div>
        <div>
          <FeedbackSection nickname={nickname} isMe={isMe} userId={userInfo.userInfo.id}/>
        </div>
      </div>
    );
  }

  // ================================================================== //
  const Wallet = () => {
    return (
      <WalletSection/>
    );
  }

  // ================================================================== //
  const NewAuction = () => {
    return (
      <NewAuctionSection/>
    );
  }

  // ================================================================== //
  const MyAuctionWatched = () => {
    return (
      <div className="grid">
        <MyAuctionWatchedSection/>
      </div>
    );
  }

  // ================================================================== //
  const MyAuctionCreated = () => {
    return (
      <div className="grid">
        <MyAuctionCreatedSection/>
      </div>
    );
  }

  // ================================================================== //
  const Settings = () => {
    return (
      <div className="md:grid md:grid-cols-3 md:gap-4">
        <div className="md:col-span-3">
          <SettingsSection/>
        </div>
      </div>
    );
  }

  // ================================================================== //
  const ProfileContent = ({isShowing:boolean}) => {
    if(isShowing) {
      if(userMenu === UserMenu.PROFILE) {
        return Profile();
      } else if(userMenu === UserMenu.MY_AUCTION_WATCHED) {
        return MyAuctionWatched();
      } else if(userMenu === UserMenu.MY_AUCTION_CREATED) {
        return MyAuctionCreated();
      } else if(userMenu === UserMenu.NEW_AUCTION) {
        return NewAuction();
      } else if(userMenu === UserMenu.SETTINGS) {
        return Settings();
      } else if(userMenu === UserMenu.WALLET) {
        return Wallet();
      } 
      return <div></div>;
    }
    return <div></div>;
  }

  // ================================================================== /
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-none">
          <ProfileSection 
            data={userInfo?.userInfo}
            isMe={isMe}
            activeUserMenu={userMenu}
          />
        </div>
        <div className="p-2 w-full">
          {Cover()}
          <Transition
            as={Fragment}
            show={isShowing}
            enter="transform transition duration-[400ms]"
            enterFrom="opacity-0 scale-95 translate-x-20"
            enterTo="opacity-100 scale-100"
            leave="transform duration-200 transition ease-in-out"
            leaveFrom="opacity-100 scale-100 "
            leaveTo="opacity-0 scale-95 "
          >
            <div>
              {ProfileContent({isShowing: isShowing})}
            </div>
          </Transition>
          {/* <ProfileContent/> */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
