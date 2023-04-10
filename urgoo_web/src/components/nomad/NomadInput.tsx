import { onChange } from "@material-tailwind/react/types/components/select";
import React, {
  ChangeEventHandler,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Input } from "@material-tailwind/react";

export enum InputType {
  primary,
  secondary,
  search,
}
const faPropIcon = faFacebook as IconProp;

class InputProp {
  id?: string | undefined;
  name?: string | undefined;
  placeholder?: string | undefined;
  error?: string | "";
  readonly?: boolean | false;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  value?: string | undefined;
  obscureText?: boolean | false;
  type?: InputType;
  autoFocus?: boolean | false;
  dataTestId?: string | undefined;
}

const NomadInput = (props: InputProp) => {
  let classname: string = "";
  // const [value, setValue] = useState(props.value);
  // const handleChange = (e) => {
  //   setValue(e.target.vlaue);
  // };
  // switch (props.type) {
  //   case InputType.primary:
  //     classname +=

  // }

  // useEffect(() => {
  //   handleChange;
  // }, []);
  return (
    <div className="mb-3 bg-white leading-10 border-input-bor rounded-lg min-h-12">
      <Input
        id={props.id}
        placeholder={props.placeholder}
        name={props.name}
        readOnly={props.readonly}
        onChange={props.onChange}
        value={props.value}
        data-testid = {props.dataTestId}
        type={props.obscureText ? "password" : "text"}
        className={`
          ${ props.error ? "text-sm outline-none  bg-white rounded-lg border-input-bor focus:border-sec-green hover:border-sec-green border focus:border focus:outline-none" : "text-sm outline-none text-black font-semibold min-h-12 px-4 w-full leading-10 bg-white rounded-lg border-input-bor focus:border-sec-green hover:border-sec-green border focus:border focus:outline-none"}
        `}
      />
      <p className="text-[#cf304a] text-[13px] mt-[4px]">{props.error}</p>
    </div>
  );
};

export default NomadInput;
