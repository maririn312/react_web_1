import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import { BxButton } from "../../../components/bx/BxButton";

i18n.init();

describe('Bx Button component test', () => {

  test('render Bx Button component', () => {
    render(
      <BxButton 
        children
      />
    );
  })
});