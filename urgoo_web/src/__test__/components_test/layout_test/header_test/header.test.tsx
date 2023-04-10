import { render } from "@testing-library/react";
import Header from "../../../../components/layout/header/header";
import i18n from "../../../../i18n/i18nForTests";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

i18n.init();

describe('Header component test', () => {
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

    test('render Header component', () => {
        store = mockStore(initialHeaderState);
        render(
            <Provider store={store}>
                <Header/>
            </Provider>,
            {wrapper: BrowserRouter}
        );
    })
});