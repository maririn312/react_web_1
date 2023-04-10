import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Gift from "../../../pages/gift/gift";

i18n.init();

describe('Gift test', () => {
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

  test('render Gift', () => {
      store = mockStore(initialGiftState);
      render(
        <Provider store={store}>
            <Gift/>
        </Provider>,
        {wrapper: BrowserRouter}
      );
  })
});