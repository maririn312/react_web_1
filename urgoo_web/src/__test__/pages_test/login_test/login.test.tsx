import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "../../../pages/login/LoginPage";

i18n.init();

describe('Login test', () => {
  const initialLoginState = {
      user:{
          username: 'khatnaa'
      },
      addWallet: {
          wallet:{
              id: 'wallet1'
          }
      }
  };

  const mockStore = configureStore();
  let store;

  test('render Login', () => {
      store = mockStore(initialLoginState);
      render(
        <Provider store={store}>
            <LoginPage/>
        </Provider>,
        {wrapper: BrowserRouter}
      );
  })
});