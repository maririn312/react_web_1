import clsx from "clsx";
import React, { ReactElement } from "react";
import StringUtility from "../../utility/StringUtility";

export enum NomadMessageType {
  success,
  warning,
  error,
  info,
}

interface NomadMessageProp {
  type?: NomadMessageType;
  message?: string;
}

const NomadMessage = (props: NomadMessageProp) => {
  if (!StringUtility.isValidText(props.message ? props.message : "")) {
    return <></>;
  }
  
  let classname:string = '';

  switch(props.type) {
    case NomadMessageType.success:
      classname = '';
      break;
    case NomadMessageType.warning:
      classname = '';
      break;
    case NomadMessageType.error:
      classname = 'border-[#ebc3c1] bg-[#ff00001a]';
      break;
    case NomadMessageType.info:
      classname = '';
      break;
    default:
  }
  
  return <div className={clsx("p-4 text-xs font-bold rounded-md border",classname)}>
    {props.message}
  </div>;
}

export default NomadMessage;
