import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import NavBar from "../../../components/navbar/NavBar";

i18n.init();

describe('Navbar component test', () => {
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

  test('render Navbar component', () => {
      store = mockStore(initialHeaderState);
      render(
        <Provider store={store}>
            <NavBar/>
        </Provider>,
        {wrapper: BrowserRouter}
      );
  })
});