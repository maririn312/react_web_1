import { BxLoadingIndicator } from "./BxLoadingIndicator";

export enum BxButtonType {
  primary,
  secondary,
  disabled,
}

class ButtonProp {
  children: React.ReactNode;
  isLoading?: boolean = true;
  type?: BxButtonType = BxButtonType.primary;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const BxButton = (props: ButtonProp) => {
  let child: React.ReactNode;
  let ev: React.MouseEventHandler<HTMLButtonElement> | undefined;

  if (props.isLoading) {
    ev = undefined;
    child = (
      <div className="relative">
        <div className="absolute inset-0 flex justify-center items-center z-10">
          <BxLoadingIndicator color="white" size={22} />
        </div>
        <div className="blur-sm z-20">{props.children}</div>
      </div>
    );
  } else {
    child = props.children;
    ev = props.onClick;
  }

  if (props.type === BxButtonType.primary) {
    return (
      <button
        onClick={ev}
        type="button"
        className="
                    text-white font-bold py-2 px-4 rounded 
                    bg-blue-500 
                    hover:bg-blue-700 
                    focus:outline-none 
                    focus:shadow-outline 
                "
      >
        {child}
      </button>
    );
  } else if (props.type === BxButtonType.secondary) {
    return <button className="min-w-full">{child}</button>;
  } else if (props.type === BxButtonType.disabled) {
    return <button className="min-w-full">{child}</button>;
  }

  return <button>{props.children}</button>;
};
