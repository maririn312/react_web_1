import { ReactElement } from "react";
import StringUtility from "../../utility/StringUtility";
import clsx from "clsx";

export enum BxMessageType {
  success,
  warning,
  error,
  info
}

interface BxMessageProp {
  type?: BxMessageType,
  message?: string,
  className?: string
}

export function BxMessage(props: BxMessageProp) {
  if(!StringUtility.isValidText(props.message ? props.message : '')) {
    return <></>;
  } 

  let icon:ReactElement = <></>;
  let classname:string = '';

  switch(props.type) {
    case BxMessageType.warning:
      classname = "alert-warning";
      icon = <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
      break;
    case BxMessageType.success:
      classname = "alert-success";
      icon = <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
      break;
    case BxMessageType.error:
      classname = "alert-error";
      icon = <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
      break;
    default:
      icon = <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;
      classname = "alert-info";
  }

  return (
    <div className={clsx('alert', classname, props.className, 'shadow-md mt-2 px-1 py-1 rounded')}>
      <div>
        {icon}
        <span className="font-semibold text-sm">{props.message}</span>
      </div>
    </div>
  );
  
}