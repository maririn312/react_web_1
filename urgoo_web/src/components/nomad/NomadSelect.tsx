import React, {
  ChangeEvent,
  ChangeEventHandler,
  ReactElement,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import StringUtility from "../../utility/StringUtility";
import { NomadLoadingIndicator } from "./NomadLoadingIndicator";

interface NomadSelectProp {
  id?: string | undefined;
  name?: string | undefined;
  error?: string | undefined;
  isLoading?: boolean;
  selectedValue?: string | undefined;
  data?: Map<string, string>;
  chooseDef?: string | undefined;
  selectChange?: ChangeEventHandler<HTMLSelectElement> | undefined;
}

const NomadSelect = (props: NomadSelectProp) => {
  let nomadSelect: ReactElement = <></>;
  let items = Array<ReactElement>();
  const { t } = useTranslation();

  if (props.isLoading) {
    items.push(
      <option disabled selected>
        <NomadLoadingIndicator color="red" />
      </option>
    );
    items.push(<NomadLoadingIndicator color="red" />);
  } else {
    items.push(
      <option selected value="default" defaultValue="default">
        {props.chooseDef}
      </option>
    );
    props.data?.forEach((name, code) => {
      items.push(<option value={code}>{name}</option>);
    });
  }

  nomadSelect = (
    <>
      <select
        defaultValue={"Default"}
        className="select w-full focus:outline-none border bg-white border-input-bor hover:border-sec-green text-md px-2 h-10"
        onChange={props.selectChange}
      >
        {items.map((item, index) => {
          return item;
        })}
      </select>
    </>
  );

  if (StringUtility.isValidText(props.error ? props.error : "")) {
    return (
      <label className="input-group input-group-vertical">
        {nomadSelect}
        <span className="text-error text-sm">{props.error}</span>
      </label>
    );
  }

  return nomadSelect;
};

export default NomadSelect;
