import { ChangeEventHandler } from "react";

enum BxInputType {
  primary,
  secondary
}

class InputProp {
  id?: string | undefined;
  name?: string | undefined;
  placeholder?: string | undefined;
  error?: string | '';
  readonly?: boolean | false;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  value?: string | undefined;
  obscureText?: boolean | false;
  type?: BxInputType | BxInputType.primary;
}

export const BxInput = (props: InputProp) => {
  if(props.type === BxInputType.primary) {
    
  } else if(props.type === BxInputType.secondary) {
    
  }
  return (
    <div className="mb-3">
      <input
        id={props.id}
        placeholder={props.placeholder}
        name={props.name}
        className={`${
          props.error ? "border-red-500" : ""
        } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        readOnly={props.readonly} 
        onChange={props.onChange} 
        value={props.value} 
        type={props.obscureText ? 'password' : 'text'}
      />
      <p className="text-red-500 text-xs italic">
        {props.error}
      </p>
    </div>
  );
}
