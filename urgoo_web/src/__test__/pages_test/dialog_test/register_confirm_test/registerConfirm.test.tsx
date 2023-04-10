import { render } from "@testing-library/react";
import i18n from "../../../../i18n/i18nForTests";
import configureStore from 'redux-mock-store';

import RegisterConfirm from "../../../../pages/dialog/register-confirm/RegisterConfirm";
import { Provider } from "react-redux";

i18n.init();

describe('register Confirm', ()=> {
  const initialRegisterState = {
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
  test('render register Confirm', () => {
    store = mockStore(initialRegisterState);
    render(
      <Provider store={store}>
        <RegisterConfirm visible={store.visible} onClose={store.onClose} phoneNo={store.phoneNo} />
      </Provider>
    );
  });
});