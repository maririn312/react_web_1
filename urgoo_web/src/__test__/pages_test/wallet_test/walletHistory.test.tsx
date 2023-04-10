import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import WalletHistory from "../../../pages/wallet/WalletHistory";

i18n.init();

describe('Wallet History test', () => {
  const initialWalletHistoryState = {
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

  test('render WalletHistory', () => {
      store = mockStore(initialWalletHistoryState);
      render(
        <Provider store={store}>
            <WalletHistory/>
        </Provider>,
        {wrapper: BrowserRouter}
      );
  })
});