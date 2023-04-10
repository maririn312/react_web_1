import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ProfileGeneral from "../../../pages/profile/ProfileGeneral";

i18n.init();

describe('Profile General test', () => {
  const initialProfileGeneralState = {
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

  test('render Profile General', () => {
      store = mockStore(initialProfileGeneralState);
      render(
        <Provider store={store}>
            <ProfileGeneral/>
        </Provider>,
        {wrapper: BrowserRouter}
      );
  })
});