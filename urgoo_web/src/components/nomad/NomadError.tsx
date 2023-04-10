interface ErrorProp {
  message?: string,
}
  
export function NomadError(props: ErrorProp) {
  return (
    <span className="text-red-500 font-semibold text-sm">{props.message}</span>
  );
}