import React, {FunctionComponent, useEffect} from 'react';
import './i18n/config';
import { Outlet } from 'react-router-dom';
import PageLayout from './components/layout/PageLayout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from './pages/abox/dashboard/DashboardPage';
import ProfilePage from './pages/abox/profile/ProfilePage';
import LoginPage from './pages/abox/login/LoginPage';
import NotFound from './pages/notfound/NotFound';
import MainPage from './pages/abox/MainPage';
import { Theme, useTheme } from 'react-daisyui';
import HomePage from './pages/abox/home/HomePage';
import AuctionPage from './pages/abox/auction/AuctionPage';
import CategoryPage from './pages/abox/category/CategoryPage';
import RegisterPage from './pages/abox/register/RegisterPage';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { checkUser, userState } from './redux/user/userSlice';
import RegisterConfirmPage from './pages/abox/register/RegisterConfirmPage';
import AuctionGroup from './pages/abox/auction/AuctionGroup';
import KycPage from './pages/abox/kyc/KycPage';

const App:FunctionComponent = () => {

  const { theme, setTheme } = useTheme('aboxLight');
  const user = useAppSelector(userState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUser());
  }, [])

  return (
    <Theme dataTheme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route path="" element={<HomePage />}/>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="registerConfirm" element={<RegisterConfirmPage/>} />
            <Route path="kyc" element={<KycPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="user/:nickname" element={<ProfilePage />} />
            <Route path="user/:nickname/:menu" element={<ProfilePage />} />
            <Route path="user/:nickname/:menu/:auctionId" element={<ProfilePage />} />
            <Route path='au/:auctionId' element={<AuctionPage/>} />
            <Route path='list/:auctionType' element={<AuctionGroup/>} />
            <Route path='category/:categoryId/' element={<CategoryPage/>} />
            <Route path='category/:categoryId/:factoryId/' element={<CategoryPage/>} />
            <Route path='category/:categoryId/:factoryId/:productId' element={<CategoryPage/>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Theme>
  );
}

export default App;