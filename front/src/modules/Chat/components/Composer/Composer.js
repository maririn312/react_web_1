import React from 'react';
import {TextArea} from '../../../../components/Form';
import Button from '../../../../components/Button';
import './Composer.scss';

const Composer = (props) => {
    return (
        <div className="chat-composer">
            <TextArea pholder="Чаат бичих"/>
            <Button name="ИЛГЭЭХ" onClick={props.sendMessage}/>
        </div>
    );
}

Composer.defaultProps  = {
    sendMessage: () => {console.log('handle function not')}
};

export { Composer };
