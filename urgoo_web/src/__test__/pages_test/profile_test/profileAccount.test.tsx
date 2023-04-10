import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ProfileAccount from "../../../pages/profile/ProfileAccount";

i18n.init();

describe('Profile Account test', () => {
  const initialProfileAccountState = {
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

  test('render ProfileAccount', () => {
      store = mockStore(initialProfileAccountState);
      render(
        <Provider store={store}>
            <ProfileAccount/>
        </Provider>,
        {wrapper: BrowserRouter}
      );
  })
});