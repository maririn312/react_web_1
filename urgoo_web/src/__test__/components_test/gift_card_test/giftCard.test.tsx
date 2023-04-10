import { render } from "@testing-library/react";
import GiftCard from "../../../components/gift-card/GiftCard";


describe('Gift Card component test', () => {
    test('render Gift Card component', () => {
        render(<GiftCard/>);
    });
});