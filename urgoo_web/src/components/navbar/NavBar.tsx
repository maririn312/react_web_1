import React from "react";
import logo from "../../assets/img/logo.svg";
import { CSSProperties } from "react";
import { Link, NavLink } from "react-router-dom";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
// import
const headerMenu: CSSProperties = {
  padding: "0 10px",
};
const NavBar = () => {
  const { t } = useTranslation();

  return (
    <nav className="shadow-lg">
      <div className="mx-autoz">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              {/* <!-- Website Logo --> */}
              <a href="#" className="flex items-center py-4">
                <img src={logo} alt="Logo" className="h-8 w-[120px] mt-2" />
                {/* <div className="logo" style={style}>
                </div> */}
              </a>
            </div>
            {/* <!-- Primary Navbar items --> */}
            <div className="hidden md:flex items-center space-x-1 header__menu">
              <ul className="flex items-center">
                <li className="px-[10px] cursor-pointer">
                  <Link to="nft/list">{t("navbar.nftNavbar")}</Link>
                </li>
                <li className="px-[10px] cursor-pointer">
                  <Link to="market">{t("navbar.marketplaceNavbar")}</Link>
                </li>
                <li className="px-[10px] cursor-pointer">
                  <Link to="gift">{t("navbar.giftCardNavbar")}</Link>
                </li>
                <li className="px-[10px] cursor-pointer">
                  <Link to="wallet">{t("navbar.walletNavbar")}</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
