import clsx from "clsx";
import CurrencyInput from 'react-currency-input-field';
import { ChangeEvent, ChangeEventHandler, ReactElement, useState } from "react";
import Datetime from 'react-datetime';
import StringUtility from "../../utility/StringUtility";
import "react-datetime/css/react-datetime.css";
import DateTimePicker from 'react-datetime-picker';

export enum BxInputType {
  primary,
  secondary,
  search
}

export enum BxKeyboardType {
  text,
  currency
}

interface InputProp {
  id?: string | undefined;
  name?: string | undefined;
  key?: string;
  placeholder?: string | undefined;
  error?: string | '';
  readonly?: boolean | false;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  value?: string | undefined;
  obscureText?: boolean | false;
  type?: BxInputType;
  inputType?: BxKeyboardType;
  className?: string | undefined;
}

export function BxInput(props: InputProp) {
  let bxInput:ReactElement = <></>;
  let clss = '';
  
  if(props.type === BxInputType.secondary) {
    clss = '';
  } else if(props.type === BxInputType.search) {
    clss = 'input input-primary w-full border-2 text-md px-2 h-10';
  } else {
    clss = 'input input-primary w-full';
  }

  if(props.readonly) {
    clss += ' bg-base-200 focus:border-0';
  }

  if(props.inputType === undefined || props.inputType === BxKeyboardType.text) {
    bxInput = <input
      id={props.id}
      key={props.key}
      placeholder={props.placeholder}
      name={props.name}
      className={clsx(props.className, clss)}
      readOnly={props.readonly} 
      onChange={props.onChange} 
      value={props.value} 
      type={props.obscureText ? 'password' : 'text'}
    />;
  } else if(props.inputType === BxKeyboardType.currency) {
    bxInput = <CurrencyInput 
      id={props.id} 
      key={props.key} 
      placeholder={props.placeholder}
      name={props.name}
      className={clsx(props.className, clss)}
      defaultValue={0} 
      decimalsLimit={2} 
      prefix='₮' 
      onValueChange={(value, name) => {
        const event = {
          target: {
            name: name,
            value: value,
          },
        } as ChangeEvent<HTMLInputElement>;
        props.onChange?.call('1', event);
      }}
      value={props.value} 
      type={props.obscureText ? 'password' : 'text'}
    />;
  }

  if(StringUtility.isValidText(props.error ? props.error : '')) {
    return <label className="input-group input-group-vertical">
      {bxInput}
      <span className="text-error text-sm">{props.error}</span>
    </label>
  } 
  
  return bxInput;
}
