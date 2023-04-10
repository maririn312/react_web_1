import { render } from "@testing-library/react";
import Footer from "../../../../components/layout/footer/footer";
import i18n from "../../../../i18n/i18nForTests";

i18n.init();

describe('Footer Component test', () => {
    test('render Footer Component', () => {
        render(<Footer/>);
    });
});