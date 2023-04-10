import toast, { Toaster } from 'react-hot-toast';
import Translation from "../../i18n/mn/translation.json";

export enum ToastType {
  SUCCESS = "success",
  ALERT = "alert",
  WARNING = "warning",
  ERROR = "error"
}
// ======================================================= //
// ======================================================= //
export const ToastAlert = (alertMessage: string, props: ToastType) => {
  let toastContainer: string = "";
  let subContainer: string = "";
  let toastIcon: string = "";
  let toastTitle: string = "";
  let toastTitleContainer: string = "";
  let toastSvg: string = "";
  let svg: string = "";

  switch(props) {
    case ToastType.SUCCESS:
      toastContainer += "w-96  outline-0 opacity-100 bg-[#c8e6c9] border-x-[#439446] border-y-[#439446] border-solid border-l-[6px] border-[#224a23] mb-4 shadow-xl rounded-[3px] overflow-hidden box-border text-base font-normal";
      subContainer += "p-4 items-start flex box-border m-0 outline-0  text-base font-normal";
      toastIcon += "inline-block outline-0 p-0 m-0 text-[#224a23] box-border text-4xl font-normal";
      toastTitle += "box-border font-bold outline-0 text-[#224a23] text-base";
      toastTitleContainer += "mt-2 box-border outline-0 text-[#224a23] text-base font-normal ";
      toastSvg += "box-border text-[#224a23] text-[1rem] outline-0 cursor-pointer text-left";
      svg += "M4.5 12.75l6 6 9-13.5";
      break;
    case ToastType.ALERT:
      toastContainer += "w-96  outline-0 opacity-100 bg-[#eee2ae] border-x-[#f1d555] border-y-[#f1d555] border-solid border-l-[6px] border-[#f4cb10] mb-4 shadow-xl rounded-[3px] overflow-hidden box-border text-base font-normal";
      subContainer += "p-4 items-start flex box-border m-0 outline-0  text-base font-normal";
      toastIcon += "inline-block outline-0 p-0 m-0 text-[#f4cb10] box-border text-4xl font-normal";
      toastTitle += "box-border font-bold outline-0 text-[#f4cb10] text-base";
      toastTitleContainer += "mt-2 box-border outline-0 text-[#f4cb10] text-base font-normal";
      toastSvg += "box-border text-[#f4cb10] text-[1rem] outline-0 cursor-pointer text-left";
      svg += "M6 18L18 6M6 6l12 12";
      break;
    case ToastType.ERROR:
      toastContainer += "w-96  outline-0 opacity-100 bg-[#f8bdbd] border-x-[#f63e3e] border-y-[#f63e3e] border-solid border-l-[6px] border-[#df1111] mb-4 shadow-xl rounded-[3px] overflow-hidden box-border text-base font-normal";
      subContainer += "p-4 items-start flex box-border m-0 outline-0  text-base font-normal";
      toastIcon += "inline-block outline-0 p-0 m-0 text-[#df1111] box-border text-4xl font-normal";
      toastTitle += "box-border font-bold outline-0 text-[#df1111] text-base";
      toastTitleContainer += "mt-2 box-border outline-0 text-[#df1111] text-base font-normal";
      toastSvg += "box-border text-[#df1111] text-[1rem] outline-0 cursor-pointer text-left";
      svg += "M6 18L18 6M6 6l12 12";
      break;
    case ToastType.WARNING:
      toastContainer += "w-96  outline-0 opacity-100 bg-[#b3e5fc] border-x-[#0891cf] border-y-[#0891cf] border-solid border-l-[6px] border-[#044868] mb-4 shadow-xl rounded-[3px] overflow-hidden box-border text-base font-normal";
      subContainer += "p-4 items-start flex box-border m-0 outline-0  text-base font-normal";
      toastIcon += "inline-block outline-0 p-0 m-0 text-[#044868] box-border text-4xl font-normal";
      toastTitle += "box-border font-bold outline-0 text-[#044868] text-base";
      toastTitleContainer += "mt-2 box-border outline-0 text-[#044868] text-base font-normal";
      toastSvg += "box-border text-[#044868] text-[1rem] outline-0 cursor-pointer text-left";
      svg += "M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1 5h2v10h-2v-10zm1 14.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z";
      break;
  }

  toast.custom((t) => (
    <div className={`${t.visible ? 'animate-enter' : 'animate-leave'}  ${toastContainer}`}>
      <div className={`${subContainer}`} role="alert" aria-live="assertive" aria-atomic="true" >
        <span className={`${toastIcon}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28" stroke-width="1.5" stroke="currentColor" className="w-12 h-12">
            <path stroke-linecap="round" stroke-linejoin="round" d= {svg}/>
          </svg>
        </span>
        <div className=" ml-4 flex-auto box-border  p-0 outline-0  text-4xl font-normal">
          <div className={`${toastTitle}`}>
            {Translation.label.alertToast}
          </div>
          <div className={`${toastTitleContainer}`}>{alertMessage}</div>                    
        </div>
        <button className="w-[2rem] h-[2rem] rounded-[50%] duration-100 ease-in delay-[0] cursor-pointer items-center flex justify-center overflow-hidden relative text-left text-[1rem] font-normal outline-0" type="button"
          onClick= { () => toast.dismiss(t.id) }
        >
          <span className={`${toastSvg}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        </button> 
      </div>
    </div>
  ),{
    duration: 2000,
    position: "top-right",
  });
}

const NomadToast = () => {
  return (
    <div data-testid="nomad_toast">
      <Toaster gutter={4} />
    </div>
  );
}

export default NomadToast;