import { TailSpin } from "react-loader-spinner";

class LoaderProps {
  color?: string = "white";
  size?: number = 16;
}

const NomadLoader = (props: LoaderProps) => {
  return (
    <TailSpin height={props.size} width={props.size} color={props.color} />
  );
};
export default NomadLoader;
