import { render } from "@testing-library/react";
import NomadCountdown from "../../../components/countdown/countdown";
import i18n from "../../../i18n/i18nForTests";

i18n.init();

describe('countDown component test', () => {
    test('render Countdown compoent', () => {
        render(<NomadCountdown date={new Date()}/>);
    });
});