import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import WalletPage from "../../../pages/wallet/WalletPage";

i18n.init();

describe('WalletPage test', () => {
  const initialWalletPageState = {
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

  test('render WalletPage', () => {
      store = mockStore(initialWalletPageState);
      render(
        <Provider store={store}>
            <WalletPage/>
        </Provider>,
        {wrapper: BrowserRouter}
      );
  })
});