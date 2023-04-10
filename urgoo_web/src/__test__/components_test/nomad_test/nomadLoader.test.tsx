import { render } from "@testing-library/react";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import i18n from "../../../i18n/i18nForTests";
import NomadLoader from "../../../components/nomad/NomadLoader";

i18n.init();

describe('Nomad Loader component test', () => {
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

  test('render Nomad Loader component', () => {
    store = mockStore(initialHeaderState);
    render(
      <Provider store={store}>
        <NomadLoader />
      </Provider>,
      {wrapper: BrowserRouter}
    );
  })
});