import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import MyNftCollected from "../../../pages/my-nft/MyNftCollected";

i18n.init();

describe('MyNftCollected test', () => {
  const initialMyNftCollectedState = {
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
      store = mockStore(initialMyNftCollectedState);
      render(
        <Provider store={store}>
            <MyNftCollected/>
        </Provider>,
        {wrapper: BrowserRouter}
      );
  })
});