import { TailSpin } from  'react-loader-spinner'

class IndicatorProp {
    color?: string = 'white';
    size?: number = 22;
}

export function BxLoadingIndicator(props: IndicatorProp) {
    return(
        <TailSpin height={props.size} width={props.size} color={props.color}/>
    );
}