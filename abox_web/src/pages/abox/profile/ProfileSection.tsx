import React, { FunctionComponent, useEffect, useState } from "react";
import { Divider } from "react-daisyui";
import { useTranslation } from "react-i18next";
import { RESPONSE_ERROR, RESPONSE_SUCCESS, URL_BACKEND_DOWNLOAD, USER_FOLLOW, USER_INDIVIDUAL, USER_UNFOLLOW } from "../../../app/appConst";
import { BxButton, BxButtonType, BxRating } from "../../../components";
import { BxCard } from "../../../components/bx/BxCard";
import StringUtility from "../../../utility/StringUtility";
import { FaWallet, FaWrench, FaUserAlt } from 'react-icons/fa';
import { FiList } from 'react-icons/fi';
import { MdAddBox } from 'react-icons/md';
import { IoMdPeople, IoMdTime } from 'react-icons/io';
import { AiFillCar } from 'react-icons/ai';
import { BsPersonCircle } from 'react-icons/bs';
import { TbBox } from 'react-icons/tb';
import UserProfileResponseDto from "../../../models/user/UserProfileResponseDto";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserMenu } from "./ProfilePage";
import clsx from 'clsx';
import { userAskFollow, userFollow } from "../../../service/userApiClient";
import ErrorManager from "../../../utility/ErrorManager";
import { useAppSelector } from "../../../app/hooks";
import { userState } from "../../../redux/user/userSlice";

interface ProfileSectionProps {
  data:UserProfileResponseDto,
  isMe:boolean,
  activeUserMenu: UserMenu,
}

const ProfileSection:FunctionComponent<ProfileSectionProps> = (props:ProfileSectionProps) => {
  const { t } = useTranslation();
  const user = useAppSelector(userState);
  const name = StringUtility.extractNickname(props.data.nickname ? props.data.nickname : '');
  const type = props.data.type === USER_INDIVIDUAL ? t('label.individual') : t('label.corporate');
  
  const { nickname, menu } = useParams();
  const navigate = useNavigate();

  const [follow, setFollow] = useState({
    isFollowing: false,
    isLoading: false,
    error: '',
  });

  useEffect(() => {
    if(!props.isMe && props.data.id !== undefined) {
      canFollow();
    }
  }, [props.isMe, props.data]);

  /* ============================================================================ */
  /* ============================================================================ */
  async function canFollow() {
    setFollow({...follow, isLoading: true, error: ''});
    try {
      const response = await userAskFollow(props.data.id);
      if(response.status === RESPONSE_SUCCESS) {
        setFollow({...follow, isFollowing: response.following_flag });
      } else if(response.status === RESPONSE_ERROR) {
        setFollow({...follow, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setFollow({...follow, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  /* ============================================================================ */
  /* ============================================================================ */
  async function followAction(action: "FOLLOW" | "UNFOLLOW") {
    setFollow({...follow, isLoading: true, error: ''});
    try {
      const response = await userFollow(props.data.id, action);
      if(response.status === RESPONSE_SUCCESS) {
        setFollow({...follow, isFollowing: action === "FOLLOW" });
      } else if(response.status === RESPONSE_ERROR) {
        setFollow({...follow, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setFollow({...follow, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  // ================================================================== //
  const Actions = () => {
    if(props.isMe) {
      return(
        <div className="grid gap-2 mt-4">
          <Link to={`/user/${nickname}`}>
            <BxButton 
              className={clsx(
                "btn-sm text-primary w-full no-animation gap-2 justify-start",
                {
                  "btn-active": props.activeUserMenu === UserMenu.PROFILE
                }
              )} 
              type={BxButtonType.bordered}
            >
              <FaUserAlt size={15}/> {t('menu.myProfile')}
            </BxButton>
          </Link>
          
          <Link to={`/user/${nickname}/wallet`}>
            <BxButton 
              className={clsx(
                "btn-sm text-primary w-full no-animation gap-2 justify-start",
                {
                  "btn-active": props.activeUserMenu === UserMenu.WALLET
                }
              )} 
              type={BxButtonType.bordered}
            >
              <FaWallet size={15}/> {t('menu.wallet')}
            </BxButton>
          </Link>
          
          <Link to={`/user/${nickname}/new`}>
            <BxButton 
              className={clsx(
                "btn-sm text-primary w-full no-animation gap-2 justify-start",
                {
                  "btn-active": props.activeUserMenu === UserMenu.NEW_AUCTION
                }
              )} 
              type={BxButtonType.bordered}
            >
              <MdAddBox size={15}/> {t('menu.newAuction')}
            </BxButton>
          </Link>
                
          <Link to={`/user/${nickname}/watchedAuctions`}>
            <BxButton 
              className={clsx(
                "btn-sm text-primary w-full no-animation gap-2 justify-start",
                {
                  "btn-active": props.activeUserMenu === UserMenu.MY_AUCTION_WATCHED
                }
              )}
              type={BxButtonType.bordered}
            >
              <TbBox size={15}/> {t('menu.myAuctions')}
            </BxButton>
          </Link>
          
          <Link to={`/user/${nickname}/createdAuctions`}>
            <BxButton 
              className={clsx(
                "btn-sm text-primary w-full no-animation gap-2 justify-start",
                {
                  "btn-active": props.activeUserMenu === UserMenu.MY_AUCTION_CREATED
                }
              )}
              type={BxButtonType.bordered}
            >
              <TbBox size={15}/> {t('menu.myCreatedAuctions')}
            </BxButton>
          </Link>
          
          <Link to={`/user/${nickname}/settings`}>
            <BxButton 
              className={clsx(
                "btn-sm text-primary w-full no-animation gap-2 justify-start",
                {
                  "btn-active": props.activeUserMenu === UserMenu.SETTINGS
                }
              )}
              type={BxButtonType.bordered}
            >
              <FaWrench size={15}/> {t('menu.settings')}
            </BxButton>
          </Link>
        </div>
      );
    } else if(user.isLoggedIn) {
      return(
        <div className="grid gap-2 mt-4">
          <BxButton 
            className="btn-sm text-primary w-full no-animation" 
            type={BxButtonType.bordered}
            isLoading={follow.isLoading}
            onClick={() => {
              if(follow.isFollowing) {
                followAction("UNFOLLOW");
              } else {
                followAction("FOLLOW");
              }
            }}
          >
            {follow.isFollowing ? t('action.unfollow') : t('action.follow')}
          </BxButton>
        </div>
      );
    } else {
      return <></>
    }
  }
  
  // ================================================================== //
  const ProfileImage = () => {
    const img = props.data.profile_photo_medium;

    return (
      <img alt="user" src={
        img === 'DEFAULT' 
          ? '/assets/user/default_profile.png' 
          : `${URL_BACKEND_DOWNLOAD}/${img}`
      } />
    );
  }

  // ================================================================== //
  return (
    <div className="w-60 px-2 md:p-0">
      <div className="flex flex-row md:flex-col">
        <div className="">
          <div className="avatar">
            <div className="w-36 md:w-56 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              {ProfileImage()}
            </div>
          </div>
        </div>
        <div className="mt-2 ml-6 md:ml-0">
          <h2 className="break-words flex-wrap font-medium leading-tight text-3xl mt-0">{name[0]} 
            <span className="mb-2 font-medium leading-tight text-2xl text-gray-400">@{name[1]}</span>
          </h2>
          <p>{props.data.description}</p>
        </div>
      </div>
      <Actions/>
      <Divider/>
      <BxRating readOnly={true} rating={props.data.total_number_of_feedback ? props.data.total_number_of_feedback : 0}/>
      <div className="mt-4">
        <div>
          <span className="inline-flex items-center"><IoMdPeople className="mr-1" size={20}/>{props.data.total_number_of_follower} {t('label.follower').toLowerCase()}</span>
        </div>
        <div>
          <span className="inline-flex items-center"><BsPersonCircle className="mr-1" size={20}/>{type}</span>
        </div>
        <div>
          <span className="inline-flex items-center"><IoMdTime className="mr-1" size={20}/>{props.data.since}</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileSection;