import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import GiftDetailPage from "../../../pages/gift-detail/GiftDetailPage";

i18n.init();

describe('Gift Detail test', () => {
  const initialGiftState = {
      user:{
          username: 'khatnaa'
      },
      addWallet: {
          wallet:{
              id: 'wallet1'
          }
      },
      getBalance: {
        status: "loaded",
        balances: []
      }
  };

  const mockStore = configureStore();
  let store;

  test('render Gift Detail', () => {
      store = mockStore(initialGiftState);
      render(
        <Provider store={store}>
            <GiftDetailPage/>
        </Provider>,
        {wrapper: BrowserRouter}
      );
  })
});