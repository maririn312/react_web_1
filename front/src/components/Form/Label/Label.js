import React from 'react';

const Label = (props) => {
    return (
        <label class="label">{props.name}</label>
    );
}

Label.defaultProps = {
    name: "my label",
    size: "" //is-large is-medium is-small
};

export { Label }
