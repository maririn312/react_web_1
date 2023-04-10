import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import WalletSection from "../../../pages/wallet/WalletSection";

i18n.init();

describe('WalletSection test', () => {
  const initialWalletSectionState = {
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

  test('render WalletSection', () => {
      store = mockStore(initialWalletSectionState);
      render(
        <Provider store={store}>
            <WalletSection/>
        </Provider>,
        {wrapper: BrowserRouter}
      );
  })
});