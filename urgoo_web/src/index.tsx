import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NftPage from "./pages/home/nft";
import LoginPage from "./pages/login/LoginPage";
import Gift from "./pages/gift/gift";
import ProfilePage from "./pages/profile/ProfilePage";
import NotFound from "./pages/notfound/NotFound";
import WalletPage from "./pages/wallet/WalletPage";
import GiftDetail from "./pages/gift-detail/GiftDetailPage";
import NftCardDetailPage from "./pages/nft-detail/NftCardDetailPage";
import RegisterPage from "./pages/register/RegisterPage";
import MarketPage from "./pages/market/MarketPage";
import PrivacyPolicy from "./pages/privacy-policy/PrivacyPolicy";
import ForgetPasswordPage from "./pages/forget-password/ForgetPasswoardPage";
import MyNft from "./pages/my-nft/MyNft";
import NftCollectionPage from "./pages/collection/NftCollectionPage";
import TermsOfService from "./pages/terms-of-service/TermsOfService";
import CreatorPage from "./pages/creator/CreatorPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const AppContext = createContext("Unknown");
const appName: string = "Nomad";

root.render(
  <React.StrictMode>
    <AppContext.Provider value={appName}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<App />}>
              <Route path="/" element={<Navigate replace to="nft/list" />} />
              <Route path="nft/list" element={<NftPage />}></Route>
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="forgot" element={<ForgetPasswordPage />} />
              <Route path="termsOfCondition" element={<TermsOfService />} />
              <Route path="privacyPolicy" element={<PrivacyPolicy />} />
              <Route
                path="profile"
                element={<Navigate replace to="/profile/general" />}
              />
              <Route path="profile/:menu" element={<ProfilePage />} />
              <Route path="nft/market/all" element={<MarketPage />} />
              <Route path="gift" element={<Gift />} />
              <Route path="wallet/:menu" element={<WalletPage />} />
              <Route
                path="wallet"
                element={<Navigate replace to="/wallet/balance" />}
              />
              <Route
                path="mynft"
                element={<Navigate replace to="/mynft/collectibles" />}
              />
              <Route path="mynft/:menu" element={<MyNft />} />
              <Route path="gift/detail/:giftId" element={<GiftDetail />} />
              <Route
                path="nft/detail/:nftId/:nftCode"
                element={<NftCardDetailPage />}
              />
              <Route
                path=":collection/:collectionId"
                element={<NftCollectionPage />}
              />
              <Route path="creator/:creatorId" element={<CreatorPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </AppContext.Provider>
  </React.StrictMode>
);
