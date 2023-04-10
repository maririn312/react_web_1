import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import StringUtility from "../../utility/StringUtility";
import { BxLoadingIndicator } from "./BxLoadingIndicator";

interface BxSelecetProp {
  id?: string | undefined;
  name?: string | undefined;
  error?: string | undefined;
  isLoading?: boolean,
  selectedValue?: string | undefined;
  data?: Map<string, string>;
  onChange?: React.ChangeEventHandler<HTMLSelectElement> | undefined;
}

export function BxSelect(props:BxSelecetProp) {
  let bxSelect:ReactElement = <></>;
  let items = Array<ReactElement>();
  const { t } = useTranslation();

  if(props.isLoading) {
    items.push(
      <option disabled selected><BxLoadingIndicator color="red"/></option>
    );
    items.push(
      <BxLoadingIndicator color="red"/>
    );
  } else {
    if(props.selectedValue === undefined) {
      items.push(<option disabled selected>{t('label.choice')}</option>);
      props.data?.forEach((name, code) => {
        items.push(<option value={code}>{name}</option>);
      });
    } else {
      props.data?.forEach((name, code) => {
        const attr = {value:code};
        if(props.selectedValue === code) {
          attr['selected'] = true;
        }
        items.push(<option {...attr}>{name}</option>);
      });
    }
  }
  
  bxSelect = <select 
    className="select w-full select-primary text-md px-2 h-10"
    onChange={props.onChange}
  >
    {items.map((item, index) => {
      return item;
    })}
  </select>

  if(StringUtility.isValidText(props.error ? props.error : '')) {
    return <label className="input-group input-group-vertical">
      {bxSelect}
      <span className="text-error text-sm">{props.error}</span>
    </label>
  } 
  
  return bxSelect;
}