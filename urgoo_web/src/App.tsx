import React, { FunctionComponent, useEffect } from "react";
import "./i18n/config";
import { Outlet } from "react-router-dom";
import Header from "./components/layout/header/header";
import Footer from "./components/layout/footer/footer";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { checkUser, userState } from "./redux/user/userSlice";
import { getBalanceState } from "./redux/Wallet/balanceSlice";

const App: FunctionComponent = () => {
  const user = useAppSelector(userState);
  const dispatch = useAppDispatch();
  const balance = useAppSelector(getBalanceState);
  useEffect(() => {
    dispatch(checkUser());
  }, []);

  return (
    <div className="bg-bx-color" data-testid = "urgoo-test">
      <Header />
      <div className="h-[100vh-80px] mt-20">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default App;
