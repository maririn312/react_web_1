import React from "react";

const Button = (props) => {

    const handleClick = () => {
        props.onClick();
    };

    return (
        <button onClick ={handleClick} class="button is-link">
            {props.name}
        </button>
    );
};
// is-loading

Button.defaultProps = {
    name: "My Button",
    onClick: () => {
        console.log('onclick function not pass')
    }
};

export { Button };
