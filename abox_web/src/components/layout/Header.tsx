import React, { FunctionComponent, useEffect, useState } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { userKyc, userLogout, userState } from "../../redux/user/userSlice";
import { ReactComponent as AboxIcon } from "../../assets/images/abox.svg";
import UserUtility from "../../utility/UserUtility";
import { Link } from "react-router-dom";
import { URL_BACKEND_DOWNLOAD } from "../../app/appConst";
import { BxInput, BxInputType } from "../bx/BxInput";
import { AiOutlineLogin } from "react-icons/ai";
import { BiLogOutCircle, BiUser, BiUserPlus } from "react-icons/bi";
import clsx from "clsx";
import { FaWrench } from "react-icons/fa";

const Header: FunctionComponent = () => {
  const { t } = useTranslation();
  const user = useAppSelector(userState);
  const dispatch = useAppDispatch();

  /* ============================================================================ */
  /* ============================================================================ */
  const navigation = [
    { name: t('menu.home'), href: "/", current: true },
    { name: t('menu.category'), href: "#", current: false },
    { name: t('menu.factory'), href: "#", current: false },
  ];

  const [search, setSearch] = useState({
    searchValue: '',
    error: '',
    isLoading: false,
  });

  const menuItemClass = clsx(
    "block px-5 py-3 text-sm text-gray-700",
    "transition ease-in-out delay-100 hover:text-white",
    "hover:bg-gradient-to-r hover:from-primary hover:to-secondary duration-300"
  );

  useEffect(() => {
    if(user.isLoggedIn) {
      if(user.info === undefined) {
        dispatch(userKyc());
      }
    }
  }, [user.isLoggedIn]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({ ...search, searchValue: event.target.value });
  }

  /* ============================================================================ */
  /* ============================================================================ */
  const profileSection = () => {
    return (
      <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto">
        {
          user.isLoggedIn ? userActions() : welcomeActions()
        }
      </div>
    );
  }

  /* ============================================================================ */
  /* ============================================================================ */
  const userActions = () => {
    return <>
        <Menu as="div" className="relative">
          <div>
            <Menu.Button>
              <button
                type="button"
                className="bg-primary p-1 rounded-full text-accent hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-white"
              >
              <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="z-[100] origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                <Link to={`/user/${user.info?.kyc.nickname}`} className={menuItemClass}>
                  <div className="flex gap-2 items-center">
                    <BiUser size={15}/> <span>{t('action.profile')}</span>
                  </div>
                </Link>
              </Menu.Item>
              <hr/>
              <Menu.Item>
                <Link to={`/user/${user.info?.kyc.nickname}/settings`} className={menuItemClass}>
                  <div className="flex gap-2 items-center">
                    <FaWrench size={15}/> <span>{t('action.settings')}</span>
                  </div>
                </Link>
              </Menu.Item>
              <hr/>
              <Menu.Item>
                <Link to="" onClick={() => { dispatch(userLogout()) }} className={menuItemClass}>
                  <div className="flex gap-2 items-center">
                    <BiLogOutCircle size={15}/> <span>{t('action.logout')}</span>
                  </div>
                </Link>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>

        <Menu as="div" className="ml-3 relative">
          <div>
            <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">Open user menu</span>
              <img 
                className="h-8 w-8 rounded-full"
                src={user.info?.image === 'DEFAULT' ? '/assets/user/default_profile.png' : `${URL_BACKEND_DOWNLOAD}/${user.info?.image}`}
                alt='profile'
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="z-[100] origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                <Link to={`/user/${user.info?.kyc.nickname}`} className={menuItemClass}>
                  <div className="flex gap-2 items-center">
                    <BiUser size={15}/> <span>{t('action.profile')}</span>
                  </div>
                </Link>
              </Menu.Item>
              <hr/>
              <Menu.Item>
                <Link to={`/user/${user.info?.kyc.nickname}/settings`} className={menuItemClass}>
                  <div className="flex gap-2 items-center">
                    <FaWrench size={15}/> <span>{t('action.settings')}</span>
                  </div>
                </Link>
              </Menu.Item>
              <hr/>
              <Menu.Item>
                <Link to="" onClick={() => { dispatch(userLogout()) }} className={menuItemClass}>
                  <div className="flex gap-2 items-center">
                    <BiLogOutCircle size={15}/> <span>{t('action.logout')}</span>
                  </div>
                </Link>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
    </>
  }

  /* ============================================================================ */
  /* ============================================================================ */
  const welcomeActions = () => {
    return <>
      <Menu as="div" className="relative">
          <div>
            <Menu.Button className="text-sm text-white rounded-md bg-gradient-to-r from-primary to-secondary flex p-2 px-3 items-center gap-2">
              <BiUser size={15}/>
              <span className="">{t('label.user')}</span>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="z-[100] origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                <Link to="/login" className={menuItemClass}>
                  <div className="flex gap-2 items-center">
                    <AiOutlineLogin size={15}/> <span>{t('action.login')}</span>
                  </div>
                </Link>
              </Menu.Item>
              <hr/>
              <Menu.Item>
                <Link to="/register" className={menuItemClass}>
                  <div className="flex gap-2 items-center">
                    <BiUserPlus size={15}/> <span>{t('action.register')}</span>
                  </div>
                </Link>
              </Menu.Item>
            </Menu.Items>
          </Transition>
      </Menu>
    </>
  }

  /* ============================================================================ */
  /* ============================================================================ */
  const desktopMenu = () => {
    return <>
      <div className="hidden sm:block">
        <div className="flex space-x-4">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={clsx(
                item.current
                  ? "text-primary"
                  : "text-gray-300 hover:bg-accent hover:text-black",
                    "px-3 py-2 rounded-md text-sm font-semibold"
              )}
              aria-current={item.current ? "page" : undefined}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </>
  }

  /* ============================================================================ */
  /* ============================================================================ */
  const mobileMenu = () => {
    return <>
      <Disclosure.Panel className="sm:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navigation.map((item) => (
            <Disclosure.Button
              key={item.name}
              as="a"
              href={item.href}
              className={clsx(
                item.current 
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
              )}
              aria-current={item.current ? "page" : undefined}
            >
              {item.name}
            </Disclosure.Button>
          ))}
        </div>
      </Disclosure.Panel>
    </>
  }

  /* ============================================================================ */
  /* ============================================================================ */
  const searchBar = (isMobile:boolean) => {
    return <div className={clsx(
      isMobile
        ? "sm:hidden"
        : "sm:block hidden pl-3 pr-3",
          "flex-1 px-0"
    )}>
      <BxInput
          id='search'
          name='search'
          placeholder={`${t("label.search")}...`}
          type={BxInputType.search}
          error={search.error}
          onChange={handleChange}
          value={search.searchValue}
        />
    </div>
  }

  /* ============================================================================ */
  /* ============================================================================ */
  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="container mx-auto px-2 sm:px-2 lg:px-0">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <Link to={'/'}>
                    <AboxIcon className="block lg:hidden h-8 w-auto" color={"#6669f1"}/>
                    <AboxIcon className="hidden lg:block h-8 w-auto" color={"#6669f1"}/>
                  </Link>
                </div>
                {searchBar(false)}
              </div>
              {profileSection()}
            </div>
            <div className="flex items-center justify-between h-16">
              {desktopMenu()}
              {searchBar(true)}
            </div>
          </div>
          {mobileMenu()}
        </>
      ) }
    </Disclosure>
  );
};

export default Header;
