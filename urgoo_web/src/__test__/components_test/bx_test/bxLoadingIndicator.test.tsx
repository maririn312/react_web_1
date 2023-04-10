import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import { BxLoadingIndicator } from "../../../components/bx/BxLoadingIndicator";

i18n.init();

describe('Bx Loading Indicator component test', () => {

  test('render Bx Loading Indicator component', () => {
    render(
      <BxLoadingIndicator/>
    );
  })
});