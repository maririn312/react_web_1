import { render } from "@testing-library/react";
import i18n from "../../../../i18n/i18nForTests";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Main from "../../../../components/layout/main/main";

i18n.init();

describe('Main component test', () => {
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

  test('render Main component', () => {
      store = mockStore(initialHeaderState);
      render(
          <Provider store={store}>
              <Main><div/></Main>
          </Provider>,
          {wrapper: BrowserRouter}
      );
  })
});