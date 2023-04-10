import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import NotFound from "../../../pages/notfound/NotFound";

i18n.init();

describe('Notfound test', () => {
  const initialNotfoundState = {
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

  test('render Notfound', () => {
      store = mockStore(initialNotfoundState);
      render(
        <Provider store={store}>
            <NotFound/>
        </Provider>,
        {wrapper: BrowserRouter}
      );
  })
});