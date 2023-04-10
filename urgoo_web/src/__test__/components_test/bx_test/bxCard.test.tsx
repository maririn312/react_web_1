import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import { BxCard } from "../../../components/bx/BxCard";

i18n.init();

describe('Bx Card component test', () => {

  test('render Bx Card component', () => {
    render(
      <BxCard 
        children
      />
    );
  })
});