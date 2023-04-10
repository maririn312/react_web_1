class CardProp {
  children: React.ReactNode;
}

export const BxCard = (props: CardProp) => {
  return <div className="container">{props.children}</div>;
};
