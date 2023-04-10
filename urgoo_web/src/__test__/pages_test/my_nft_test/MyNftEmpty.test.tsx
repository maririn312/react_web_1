import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import MyNftEmpty from "../../../pages/my-nft/MyNftEmpty";

i18n.init();

describe('My Nft Empty test', () => {
  const initialMyNftEmptyState = {
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
      store = mockStore(initialMyNftEmptyState);
      render(
        <Provider store={store}>
            <MyNftEmpty/>
        </Provider>,
        {wrapper: BrowserRouter}
      );
  })
});