import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ProfileConfig from "../../../pages/profile/ProfileConfig";

i18n.init();

describe('ProfileConfig test', () => {
  const initialProfileConfigState = {
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

  test('render ProfileConfig', () => {
      store = mockStore(initialProfileConfigState);
      render(
        <Provider store={store}>
            <ProfileConfig/>
        </Provider>,
        {wrapper: BrowserRouter}
      );
  })
});