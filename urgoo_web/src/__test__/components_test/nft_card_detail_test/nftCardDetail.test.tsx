import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import NftCardDetail from "../../../components/nft-card-detail/NftCardDetail";

i18n.init();

describe('Nft Card Detail component test', () => {
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

    test('render Nft Card Detail component', () => {
        store = mockStore(initialHeaderState);
        render(
            <Provider store={store}>
                <NftCardDetail
                  smartContract={store.smartContract}
                  name={store.name}
                  photo={store.photo}
                  type={store.photo}
                  type_name={store.type_name}
                  seen={store.seen}
                  bsId={store.bsId}
                  key={store.key}
                  code={store.key}
                  likes={store.likes}
                  shares={store.shares}
                  creator={store.creator}
                  prices={store.prices}
                  unavailable={store.unavailable}
                  available={store.available}
                  total={store.total}
                  description={store.description}
                  collection_name={store.collection_name}
                  collection_id={store.collection_id}
                />
            </Provider>,
            {wrapper: BrowserRouter}
        );
    })
});