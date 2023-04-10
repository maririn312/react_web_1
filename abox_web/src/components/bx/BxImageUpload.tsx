import { FunctionComponent, useRef } from "react";
import { BxLoadingIndicator } from "./BxLoadingIndicator";
import { BiImageAdd } from 'react-icons/bi';
import { URL_BACKEND_DOWNLOAD, URL_BACKEND_UPLOAD } from "../../app/appConst";
import React from "react";
import { IoMdRemoveCircle } from "react-icons/io";
import clsx from "clsx";

interface BxImageUploadProps {
  isLoading?:boolean
  image?:string
  name?:string 
  onUpload?: (file:File | undefined | null, name:string) => void
  onRemove?: () => void
}

export const BxImageUpload:FunctionComponent<BxImageUploadProps> = (props:BxImageUploadProps) => {
  let element;
  let isButton = false;
  const inputRef = useRef<HTMLInputElement>(null);

  if(props.isLoading) {
    element = <div className="relative">
      <div className="absolute inset-0 flex justify-center items-center z-10">
        <BxLoadingIndicator color="white" size={57} />
      </div>
      <div className="blur-sm z-20 flex items-center">
        <img className="rounded-md w-40 h-40 auction-img" src={props.image} alt=""/>
      </div>
    </div>
  } else if(props.image !== undefined && props.image !== '') {
    element = <img className="rounded-md w-40 h-40 auction-img" src={props.image} alt=""/>
  } else {
    isButton = true;
    element = <BiImageAdd size={40} className="place-self-center text-primary"/>
  }

  if(isButton) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.item(0);

      if(props.onUpload !== undefined) {
        props.onUpload(selectedFile, event.target.name);
      }
    };

    return <div className="choose-file">
      <button 
        type="button" 
        className={clsx('rounded-md grid w-40 h-40 bg-white border-dashed border-2 border-bg-300')} 
        onClick={() => {
          inputRef.current?.click();
        }}
      >
        {element}
      </button>
      <input 
        name={props.name} 
        id={props.name} 
        ref={inputRef} 
        type="file" 
        style={{"display": "none"}} 
        onChange={handleChange} 
      />
    </div>
  }

  let remove = <></>;
  if(props.onRemove !== undefined) {
    remove = <div className="absolute" style={{top:"4px", right: "4px"}}>
      <IoMdRemoveCircle 
        size={20} 
        className="text-error drop-shadow-md" 
        onClick={() => {
          if(props.onRemove !== undefined) {
            props.onRemove();
          }
        }} 
      />
    </div>
  }

  return (
    <div className={clsx('rounded w-40 h-40 bg-white', props.onRemove !== undefined && 'relative')}>
      <div>
        {element}
      </div>
      {remove}
    </div>
  );

}