import React from "react";

type MainProps = {
  children: React.ReactNode;
};
const Main = (props: MainProps) => {
  return (
    <div className="relative grid grid-cols-1 gap-0 mx-auto w-[86vw] max-w-7xl">
      <div className="grid grid-cols-1 gap-0">{props.children}</div>
    </div>
  );
};

export default Main;
