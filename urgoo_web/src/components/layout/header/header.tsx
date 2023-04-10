import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NavBar from "../../navbar/NavBar";
import NomadBtn, { BtnType } from "../../nomad/NomadBtn";
import logo from "../../../assets/img/logo.svg";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { userMe, userLogout, userState } from "../../../redux/user/userSlice";
import StringUtility from "../../../utility/StringUtility";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { BiMenuAltLeft, BiX } from "react-icons/bi";

const Header: FunctionComponent = () => {
  const { t } = useTranslation();
  const user = useAppSelector(userState);
  const dispatch = useAppDispatch();
  const [isMobileOpen, setMobileOpen] = useState<boolean>(false);

  // ================================================================== //
  useEffect(() => {
    if (user.isLoggedIn) {
      if (user.info === undefined) {
        dispatch(userMe());
      }
    }
  }, [user.isLoggedIn]);

  // ================================================================== //
  const ProfileSection = () => {
    return (
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        {user.isLoggedIn ? UserActions() : WelcomeActions()}
      </div>
    );
  };

  // ================================================================== //
  const UserActions = () => {
    return (
      <>
        <div className="login-item mr-3 relative">
          <Link to="/profile">
            <NomadBtn height="36px" icon={true} type={BtnType.primary}
              className="pr-3 pl-3"
            >
              {user.info?.userMe.firstName !== undefined &&
              user.info?.userMe.lastName !== undefined
                ? StringUtility.mnNameFormat({
                    lastname: user.info?.userMe.lastName,
                    firstname: user.info?.userMe.firstName,
                  })
                : user.info?.userMe.phoneNo}
            </NomadBtn>
          </Link>
        </div>
        
        <div className="reg-item relative">
          <Link to="/">
            <NomadBtn
              type={BtnType.primary}
              onClick={() => {
                dispatch(userLogout());
              }}
              className="pr-3 pl-3 border-[#e91e63] text-[#e91e63]"
              height="36px"
            >
              {t("action.logout")}
            </NomadBtn>
          </Link>
        </div>
      </>
    );
  };

  // ================================================================== //
  const WelcomeActions = () => {
    return (
      <>
        <div className="login-item mr-3 relative">
          <Link to="/login">
            <NomadBtn height="36px" icon={true} type={BtnType.primary}>
              {t("action.login")}
            </NomadBtn>
          </Link>
        </div>
        <div className="reg-item relative">
          <Link to="/register">
            <NomadBtn type={BtnType.secondary} height="36px">
              {t("action.register")}
            </NomadBtn>
          </Link>
        </div>
      </>
    );
  };

  // ================================================================== //
  const MyNft = () => {
    return (
      <li className="px-3 cursoyr-pointer relative h-full">
        <NavLink
          to="mynft"
          className={({ isActive }) =>
            isActive ? `${defaultClass} ${activeClass}` : `${defaultClass}`
          }
        >
          {t("label.myNft")}
        </NavLink>
      </li>
    );
  };

  /* ============================================================================ */
  /* ============================================================================ */
  const mobileMenu = () => {
    return <div className="block md:hidden">
      <Transition
          as={Fragment}
          show={isMobileOpen}
          enter="transform transition duration-[400ms]"
          enterFrom="opacity-0 -translate-x-40"
          enterTo="opacity-100 scale-100"
          leave="transform duration-150 transition ease-in-out"
          leaveFrom="opacity-100 "
          leaveTo="opacity-0 scale-95 "
      >
        <div className="bg-[#091127] grid">
          <NavLink
            to="nft/list"
            className={({ isActive }) => mobileClass}
            onClick={() => {setMobileOpen(false)}}
          >
            {t("label.nft")}
          </NavLink>
          <NavLink
            to="/nft/market/all"
            className={({ isActive }) => mobileClass}
            onClick={() => {setMobileOpen(false)}}
          >
            {t("label.marketplace")}
          </NavLink>
          <NavLink
            to="/gift"
            className={({ isActive }) => mobileClass}
            onClick={() => {setMobileOpen(false)}}
          >
            {t("label.giftCard")}
          </NavLink>
          <NavLink
            to="/wallet"
            className={({ isActive }) => mobileClass}
            onClick={() => {setMobileOpen(false)}}
          >
            {t("label.wallet")}
          </NavLink>
          {user.isLoggedIn ? 
            <NavLink
              to="/mynft"
              className={({ isActive }) => mobileClass}
              onClick={() => {setMobileOpen(false)}}
            >
              {t("label.myNft")}
            </NavLink> : <></>
          }
        </div>
      </Transition>
    </div>
  }

  const mobileClass = 'text-lg font-bold px-[20px] py-[14px] text-white border-[#18264c] border-b-[1px]'
  const defaultClass = "h-20 flex items-center px-2 relative justify-center font-bold";
  const activeClass = "after:absolute after:content-[''] after:bottom-0 after:h-[2px] after:w-full after:bg-sec-green";
  
  // ================================================================== //
  return (
    <header className="header__wrap h-20 bg-bx-color top-0 fixed z-[100] w-full m-0 p-0">
      <div className="header__main text-white flex h-20 border-b border-b-color">
        <div className="container grid mx-auto md:max-w-[1280px] grid-cols-1 gap-0 relative">
          <div className="flex content-center justify-between px-3">
            <div className="header__left">
              <nav className="shadow-lg">
                <div className="mx-auto">
                  <div className="flex justify-between">
                    <div className="flex">
                      
                      <div className="inset-y-0 left-0 flex items-center md:hidden">
                        <div className="inline-flex items-center justify-center p-2 rounded-md cursor-pointer">
                          {isMobileOpen ? (
                            <div className="" onClick={() => {setMobileOpen(false)}}>
                              <BiX className="text-white" size={28}/>
                            </div>
                          ) : (
                            <div className="" onClick={() => {setMobileOpen(true)}}>
                              <BiMenuAltLeft className="text-white" size={28}/>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        {/* <!-- Website Logo --> */}
                        <Link
                          to="nft/list"
                          className="flex items-center py-4 mr-6"
                        >
                          <img
                            src={logo}
                            alt="Logo"
                            className="h-8 w-[120px] mt-2"
                          />
                        </Link>
                      </div>
                      {/* <!-- Primary Navbar items --> */}
                      <div className="md:flex hidden items-center header__menu">
                        <ul className="flex h-full items-center">
                          <li className="px-3 cursor-pointer relative h-full ">
                            <NavLink
                              to="nft/list"
                              className={({ isActive }) =>
                                isActive
                                  ? `${defaultClass} ${activeClass}`
                                  : `${defaultClass}`
                              }
                            >
                              {t("label.nft")}
                            </NavLink>
                          </li>
                          <li className="px-3 cursor-pointer relative h-full">
                            <NavLink
                              to="nft/market/all"
                              className={({ isActive }) =>
                                isActive
                                  ? `${defaultClass} ${activeClass}`
                                  : `${defaultClass}`
                              }
                            >
                              {t("label.marketplace")}
                            </NavLink>
                          </li>
                          <li className="px-3 cursor-pointer  relative h-full">
                            <NavLink
                              to="gift"
                              className={({ isActive }) =>
                                isActive
                                  ? `${defaultClass} ${activeClass}`
                                  : `${defaultClass}`
                              }
                            >
                              {t("label.giftCard")}
                            </NavLink>
                          </li>
                          <li className="px-3 cursoyr-pointer relative h-full">
                            <NavLink
                              to="wallet"
                              className={({ isActive }) =>
                                isActive
                                  ? `${defaultClass} ${activeClass}`
                                  : `${defaultClass}`
                              }
                            >
                              {t("label.wallet")}
                            </NavLink>
                          </li>
                          {user.isLoggedIn ? MyNft() : ""}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
            <div className="header__right flex items-center">
              <div className="flex items-center">{ProfileSection()}</div>
            </div>
          </div>
        </div>
      </div>
      {mobileMenu()}
    </header>
  );
};

export default Header;
