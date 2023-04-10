import { ChangeEvent, EventHandler, FunctionComponent, useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import NomadBtn, { BtnType } from "./NomadBtn";

interface NomadFileInputProps {
  name?: string,
  onUpload?: (file:File | undefined | null, name:string) => void
  isLoading?:boolean
}

const NomadFileInput = (props:NomadFileInputProps) => {;

  // ================================================================== //
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.item(0);

    if(props.onUpload !== undefined) { 
      props.onUpload(selectedFile, event.target.name);
    } 
  };

  // ================================================================== //
  return (
    <div className="">
      <input 
        name={props.name} 
        className="absolute top-0 w-full h-full bg-cover cursor-pointer -indent-[99em] z-10"
        type="file" 
        accept="image/*" 
        onChange={handleChange} 
      /> 
    </div>
  );
};

export default NomadFileInput;
