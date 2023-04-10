import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import MyNft from "../../../pages/my-nft/MyNft";

i18n.init();

describe('MyNft test', () => {
  const initialMyNftState = {
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

  test('render MyNft', () => {
      store = mockStore(initialMyNftState);
      render(
        <Provider store={store}>
            <MyNft/>
        </Provider>,
        {wrapper: BrowserRouter}
      );
  })
});