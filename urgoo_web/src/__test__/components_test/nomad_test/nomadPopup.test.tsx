import { render } from "@testing-library/react";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import i18n from "../../../i18n/i18nForTests";
import NomadPopup from "../../../components/nomad/NomadPopup";

i18n.init();

describe('Nomad Popup component test', () => {
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

  test('render Nomad Popup Indicator component', () => {
    store = mockStore(initialHeaderState);
    render(
      <Provider store={store}>
        <NomadPopup />
      </Provider>,
      {wrapper: BrowserRouter}
    );
  })
});