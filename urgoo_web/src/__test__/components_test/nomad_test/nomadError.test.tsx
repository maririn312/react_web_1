import { render } from "@testing-library/react";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import i18n from "../../../i18n/i18nForTests";
import { NomadError } from "../../../components/nomad/NomadError";

i18n.init();

describe('Nomad Error component test', () => {
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

  test('render Nomad Error component', () => {
    store = mockStore(initialHeaderState);
    render(
      <Provider store={store}>
        <NomadError />
      </Provider>,
      {wrapper: BrowserRouter}
    );
  })
});