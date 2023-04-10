import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import WalletGiftCard from "../../../pages/wallet/WalletGiftCard";

i18n.init();

describe('WalletGiftCard test', () => {
  const initialWalletGiftCardState = {
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

  test('render WalletGiftCard', () => {
      store = mockStore(initialWalletGiftCardState);
      render(
        <Provider store={store}>
            <WalletGiftCard/>
        </Provider>,
        {wrapper: BrowserRouter}
      );
  })
});