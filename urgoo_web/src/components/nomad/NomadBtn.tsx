import React from "react";
import NomadLoader from "./NomadLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { BxButtonType } from "../bx/BxButton";

export enum BtnType {
  primary,
  secondary,
  disabled,
  blue,
  white
}

class BtnProp {
  children: React.ReactNode;
  isLoading?: boolean = true;
  type?: BtnType = BtnType.primary;
  icon?: boolean = true;
  width?: string;
  height?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean = true;
}

const NomadBtn = (props: BtnProp) => {
  let child: React.ReactNode;
  let ev: React.MouseEventHandler<HTMLButtonElement> | undefined;
  let classname: string = "";

  if (props.isLoading) {
    ev = undefined;
    child = (
      <div className="relative">
        <div className="absolute inset-0 flex justify-center items-center z-10">
          <NomadLoader color="white" size={16} />
        </div>
        <div className="blur-sm z-20">{props.children}</div>
      </div>
    );
  } else {
    child = props.children;
    ev = props.onClick;
  }

  switch (props.type) {
    case BtnType.primary:
      classname += 
        "text-white items-center flex border-primary-border border font-bold py-2 px-2 rounded-[8px] bg-transparent hover:bg-d-blue";
      break;
    case BtnType.secondary:
      classname += 
        "text-sec-black bg-sec-green flex items-center font-bold py-2 px-2 rounded-[8px] hover:bg-sec-hover-bor";
      break;
    case BtnType.disabled:
      classname += 
        "text-sec-black bg-sec-green flex items-center border-sec-border border font-bold py-2 px-2 rounded-[8px]";
      break;
    case BtnType.blue:
      classname += 
        "text-white bg-custom-blue flex items-center justify-center border border-black font-bold py-2 px-5 rounded-lg hover:bg-prm-hover";
      break;   
    case BtnType.white:
      classname +=
        "text-white items-center flex border-primary-border border font-bold py-2 px-2 rounded-[8px] bg-transparent hover:bg-[#0911261a]"; 
        // "text-sec-black bg-white flex border-sec-border font-bold py-2 px-2 rounded-[8px] hover:bg-[#0911261a]";
      break;
  }

  if (BtnType.secondary && props.disabled) {
    classname += "bg-sec-disabled opacity-70";
  }

  // text style
  classname += " font-bold";
  classname += ` ${props.className}`;

  return (
    <button
      style={{
        width: props.width,
        height: props.height,
      }}
      onClick={ev}
      type="button"
      className={classname}
      disabled={props.disabled}
    >
      {props.icon ? <FontAwesomeIcon icon={faUser} className="mr-2" /> : ""}
      {child}
    </button>
  );
};

export default NomadBtn;
