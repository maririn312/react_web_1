import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ProfilePage from "../../../pages/profile/ProfilePage";

i18n.init();

describe('Profile Page test', () => {
  const initialProfilePageState = {
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

  test('render Profile Page', () => {
      store = mockStore(initialProfilePageState);
      render(
        <Provider store={store}>
            <ProfilePage/>
        </Provider>,
        {wrapper: BrowserRouter}
      );
  })
});