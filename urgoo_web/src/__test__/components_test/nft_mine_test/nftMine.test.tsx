import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import NftMine from "../../../components/nft-mine/NftMine";

i18n.init();

describe('Nft Mine component test', () => {
  const initialHeaderState = {
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

  test('render Nft Mine component', () => {
    store = mockStore(initialHeaderState);
    render(
      <Provider store={store}>
          <NftMine/>
      </Provider>,
      {wrapper: BrowserRouter}
    );
  })
});