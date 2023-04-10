import React from 'react';
import './Input.scss';

const Input = (props) => {
    return (
        <div class="control">
            <input class="input is-info"
                type ={props.type}
                value = {props.value}
                placeholder ={props.pholder}
                onChange = {props.onChange}
            />
        </div>
    );
}

Input.defaultProps = {
    size: "", // is-small normal is-medium is-large
    type: "text",
    readOnly: false, // readonly
    pholder: "my input",
    value: "",
    onChange: (e) => { console.log('onclick function not pass', e)}
}

export { Input }
