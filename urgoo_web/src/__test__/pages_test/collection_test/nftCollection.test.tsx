import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import NftCollectionPage from "../../../pages/collection/NftCollectionPage";

i18n.init();

describe('nft collection', ()=> {
    test('nft collection', () => {
        render(<NftCollectionPage />);
    });
});