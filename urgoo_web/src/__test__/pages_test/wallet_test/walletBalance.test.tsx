import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import configureStore from 'redux-mock-store';
import { Provider, shallowEqual } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import WalletBalance from "../../../pages/wallet/WalletBalance";

i18n.init();

describe('WalletBalance test', () => {
  const initialWalletBalanceState = {
      user:{
          username: 'khatnaa'
      },
      addWallet: {
          wallet:{
              id: 'wallet1'
          }
      },
      status: {
        loading: "loading",
        error: "error",
        loaded: "loaded"
      }
  };

  const mockStore = configureStore();
  let store;

  test('render Nft Card Detail', () => {
      store = mockStore(initialWalletBalanceState);
      const wrapper = shallowEqual(
        <Provider store={store}>
          <WalletBalance />
        </Provider>,
        {wrapper: BrowserRouter}
      );
      expect(wrapper).toMatchSnapshot();
  })
});