import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import NftPage from "../../../pages/market/MarketPage";

i18n.init();

describe('MarketPage test', () => {
  const initialMarketPageState = {
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

  test('render Market Page', () => {
      store = mockStore(initialMarketPageState);
      render(
        <Provider store={store}>
            <NftPage/>
        </Provider>,
        {wrapper: BrowserRouter}
      );
  })
});