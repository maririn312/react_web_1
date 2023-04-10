import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import TabItems from "../../../components/wallet-tabs/WalletTab";

i18n.init();

describe("Wallet Tabcomponent test", () => {
  const initialHeaderState = {
    user: {
      username: "khatnaa",
    },
    addWallet: {
      wallet: {
        id: "wallet1",
      },
    },
  };

  const mockStore = configureStore();
  let store;

  test("render Wallet Tab component", () => {
    store = mockStore(initialHeaderState);
    render(
      <Provider store={store}>
        <TabItems selected="" />
      </Provider>,
      { wrapper: BrowserRouter }
    );
  });
});
