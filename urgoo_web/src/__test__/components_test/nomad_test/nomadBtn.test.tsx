import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import NomadBtn from "../../../components/nomad/NomadBtn";

i18n.init();

describe('Nomad Button component test', () => {
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

  test('render Nomad Button component', () => {
    store = mockStore(initialHeaderState);
    render(
      <Provider store={store}>
          <NomadBtn 
            width="100%"
            height="44px"
            isLoading={store.isLoading}
            onClick={ () => store}
            type={store.type}
            className={store.className}
          >
            tovch
          </NomadBtn>
      </Provider>,
      {wrapper: BrowserRouter}
    );
  })
});