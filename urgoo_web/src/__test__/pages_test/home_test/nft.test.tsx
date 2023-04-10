import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import NftPage from "../../../pages/home/nft";

i18n.init();

describe('Nft test', () => {
  const initialGiftState = {
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

  test('render Nft', () => {
      store = mockStore(initialGiftState);
      render(
        <Provider store={store}>
            <NftPage/>
        </Provider>,
        {wrapper: BrowserRouter}
      );
  })
});