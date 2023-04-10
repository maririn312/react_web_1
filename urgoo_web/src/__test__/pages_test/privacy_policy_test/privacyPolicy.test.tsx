import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import PrivacyPolicy from "../../../pages/privacy-policy/PrivacyPolicy";

i18n.init();

describe('Privacy Policy test', () => {
  const initialPrivacyPolicyState = {
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

  test('render PrivacyPolicy', () => {
      store = mockStore(initialPrivacyPolicyState);
      render(
        <Provider store={store}>
            <PrivacyPolicy/>
        </Provider>,
        {wrapper: BrowserRouter}
      );
  })
});