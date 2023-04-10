import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import MyNftCreated from "../../../pages/my-nft/MyNftCreated";

i18n.init();

describe('My Nft Created test', () => {
  const initialMyNftCreatedState = {
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
      store = mockStore(initialMyNftCreatedState);
      render(
        <Provider store={store}>
            <MyNftCreated/>
        </Provider>,
        {wrapper: BrowserRouter}
      );
  })
});