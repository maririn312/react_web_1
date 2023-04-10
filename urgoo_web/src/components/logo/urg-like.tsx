import clsx from "clsx";
import { FunctionComponent } from "react"

interface URGLikeProp {
  size?: number,
}
 
const URGLike:FunctionComponent<URGLikeProp> = (props:URGLikeProp) => {
  return (
    <span 
      className={clsx(props.size ? `h-[${props.size}] w-[${props.size}]` : "h-8 w-8")}
      style={{
        backgroundImage:"url(/img/like-icon.svg)",
        backgroundSize: "200% 100%",
        backgroundRepeat: "no-repeat",
      }}
    ></span>
  );
}

export default URGLike;