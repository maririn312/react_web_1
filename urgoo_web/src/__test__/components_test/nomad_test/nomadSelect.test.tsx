import { render } from "@testing-library/react";
import i18n from "../../../i18n/i18nForTests";
import NomadSelect from "../../../components/nomad/NomadSelect";
import { Select } from "@material-tailwind/react";

i18n.init();

describe('Nomad Select component test', () => {

  test('render Nomad Select component', () => {
    render(
      <Select defaultValue={"Default"}>
        <NomadSelect name="income" key="income" />
      </Select>
    );
  })
});