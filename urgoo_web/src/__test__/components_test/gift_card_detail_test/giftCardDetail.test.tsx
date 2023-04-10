import { render } from "@testing-library/react";
import GiftCardDetail from "../../../components/gift-card-detail/GiftCardDetail";
import configureStore from 'redux-mock-store';
import i18n from "../../../i18n/i18nForTests";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

i18n.init();

describe('Gift Card Detail component test', () => {
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

    test('render Gift Card Detail component', () => {
        store = mockStore(initialGiftState);
        render(
          <Provider store={store}>
              <GiftCardDetail/>
          </Provider>,
          {wrapper: BrowserRouter}
        );
    })
});