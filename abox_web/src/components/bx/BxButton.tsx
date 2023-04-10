import { ReactElement } from "react";
import { BxLoadingIndicator } from "./BxLoadingIndicator";
import clsx from 'clsx';

export enum BxButtonType {
  gradient,
  bordered,
  gradientIcon,
  borderedIcon,
}

class ButtonProp {
  children: React.ReactNode;
  isLoading?: boolean = true;
  type?: BxButtonType = BxButtonType.gradient;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  width?: number;
  height?: number;
}

export function BxButton(props: ButtonProp) {
  let child: React.ReactNode;
  let ev: React.MouseEventHandler<HTMLButtonElement> | undefined;
  let classname:string = "btn no-animation ";
  
  if (props.isLoading) {
    ev = undefined;
    child = (
      <div className="relative">
        <div className="absolute inset-0 flex justify-center items-center z-10">
          <BxLoadingIndicator color="white" size={22} />
        </div>
        <div className="blur-sm z-20 flex items-center">
          {props.children}
        </div>
      </div>
    );
  } else {
    child = props.children;
    ev = props.onClick;
  }

  switch(props.type) {
    case BxButtonType.gradient:
      classname += "btn-primary text-white bg-gradient-to-br from-secondary to-primary ";
      break;
    case BxButtonType.bordered:
      classname += "btn-ghost bg-transparent border-solid border-base-200 border";
      break;
    case BxButtonType.borderedIcon:
      break;
    case BxButtonType.gradientIcon:
      classname += "btn-primary text-white btn-square bg-gradient-to-br from-secondary to-primary ";
      break;
  }

  return (
    <button 
      style={{
        "width": props.width,
        "height": props.height,
      }}
      onClick={ev}
      type="button"
      className={clsx(classname, 'font-bold', props.className)}
    >
      {child}
    </button>
  );
}
