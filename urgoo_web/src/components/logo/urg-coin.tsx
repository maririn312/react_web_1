import clsx from "clsx";
import { FunctionComponent } from "react"

interface URGCoinProp {
  size?: number,
}
 
const URGCoin:FunctionComponent<URGCoinProp> = (props:URGCoinProp) => {
  return (
    <span 
      className={clsx(props.size ? `h-[${props.size}] w-[${props.size}]` : "h-7 w-7")}
      style={{
        backgroundImage:"url(/img/urg_coin.webp)",
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
      }}
    ></span>
  );
}

export default URGCoin;