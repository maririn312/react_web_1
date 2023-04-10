
class CardProp {
  children: React.ReactNode;
  className?: string
  hasHover?: boolean
}

export function BxCard(props: CardProp) {
  const hover = props.hasHover === undefined ? true : false;

  const classNm = hover ? 
      'card bg-white rounded-lg transition ease-in-out shadow-md hover:shadow-2xl duration-300' 
      : 'card bg-white shadow-md rounded-lg';

  return(
    <div className={`${classNm} ${props.className}`}>
      {props.children} 
    </div>
  );
}