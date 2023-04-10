import React from "react";

const CheckBox = (props) => {
    return (
        <label class="checkbox">
            <input type="checkbox" />
            {props.name}
        </label>
    );
}

CheckBox.defaultProps = {
    name: "My Button",
    onCheck: () => {
        console.log('onclick function not pass')
    }
}

export { CheckBox };
