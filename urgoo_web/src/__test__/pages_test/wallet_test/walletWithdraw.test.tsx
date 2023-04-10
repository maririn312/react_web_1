import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import configureStore from 'redux-mock-store';
import { Provider, shallowEqual } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import WalletWithdraw from "../../../pages/wallet/WalletWithdraw";

i18n.init();

describe('WalletWithdraw test', () => {
  const initialWalletWithdrawState = {
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

  test('render WalletWithDraw', () => {
    store = mockStore(initialWalletWithdrawState);
    const wrapper = shallowEqual(
    <Provider store={store}>
        <WalletWithdraw />
    </Provider>,
    {wrapper: BrowserRouter}
    );
    expect(wrapper).toMatchSnapshot();
  })
});