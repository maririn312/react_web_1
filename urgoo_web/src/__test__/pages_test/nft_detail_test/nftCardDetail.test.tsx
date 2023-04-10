import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import NftCardDetailPage from "../../../pages/nft-detail/NftCardDetailPage";

i18n.init();

describe('Nft Card Detail test', () => {
  const initialNftCardDetailState = {
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

  test('render Nft Card Detail', () => {
      store = mockStore(initialNftCardDetailState);
      render(
        <Provider store={store}>
            <NftCardDetailPage/>
        </Provider>,
        {wrapper: BrowserRouter}
      );
  })
});