import clsx from "clsx";
import { FunctionComponent } from "react"

interface URGShareProp {
  size?: number,
}
 
const URGShare:FunctionComponent<URGShareProp> = (props:URGShareProp) => {
  return (
    <span 
      className={clsx(props.size ? `h-[${props.size}] w-[${props.size}]` : "h-8 w-8")}
      style={{
        backgroundImage:"url(/img/share-icon.svg)",
        backgroundSize: "200% 100%",
        backgroundRepeat: "no-repeat",
      }}
    ></span>
  );
}

export default URGShare;