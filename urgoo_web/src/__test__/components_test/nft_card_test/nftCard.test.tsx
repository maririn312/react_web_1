import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import NftCard from "../../../components/nft-card/NftCard";

i18n.init();

describe('NftCard component test', () => {
    const initialHeaderState = {
        user:{
            username: 'khatnaa'
        },
        addWallet: {
            wallet:{
                id: 'wallet1'
            }
        },
    };

    const mockStore = configureStore();
    let store;

    test('render NftCard component', () => {
        store = mockStore(initialHeaderState);
        render(
            <Provider store={store}>
                <NftCard
                    photo={store.photo}
                    name={store.name}
                    prices={store.prices}
                    shares={store.shares}
                    collection={store.collection}
                    creator={store.creator}
                />
            </Provider>,
            {wrapper: BrowserRouter}
        );
    })
});