import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ProfileInfo from "../../../pages/profile/ProfileInfo";

i18n.init();

describe('Profile Info test', () => {
  const initialProfileInfoState = {
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

  test('render Profile Info', () => {
      store = mockStore(initialProfileInfoState);
      render(
        <Provider store={store}>
            <ProfileInfo/>
        </Provider>,
        {wrapper: BrowserRouter}
      );
  })
});