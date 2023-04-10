import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import configureStore from 'redux-mock-store';
import { Provider, shallowEqual } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import WalletIncome from "../../../pages/wallet/WalletIncome";

i18n.init();

describe('WalletIncome test', () => {
  const initialWalletIncomeState = {
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

  test('render WalletIncome Detail', () => {
    store = mockStore(initialWalletIncomeState);
    const wrapper = shallowEqual(
        <Provider store={store}>
            <WalletIncome />
        </Provider>,
        {wrapper: BrowserRouter}
    );
    expect(wrapper).toMatchSnapshot();
  })
});