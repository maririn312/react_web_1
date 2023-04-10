import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import MyNftSection from "../../../pages/my-nft/MyNftSection";

i18n.init();

describe('My Nft Section test', () => {
  const initialMyNftSectionState = {
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

  test('render My Nft Section', () => {
      store = mockStore(initialMyNftSectionState);
      render(
        <Provider store={store}>
            <MyNftSection activeNftMenu={store.activeNftMenu}/>
        </Provider>,
        {wrapper: BrowserRouter}
      );
  })
});