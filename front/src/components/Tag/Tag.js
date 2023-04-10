import React from 'react';

const Tag = (props) => {
    return (
        <span class={"tag is-" + props.color + " is-" + props.size}>
            {props.name}
            {props.delete ? <button class="delete is-small"></button> : ''}
        </span>
    )
}

Tag.defaultProps = {
    color: "info", //dark, light, white, primary, link, success, warning, danger
    size: "medium",
    name: "my tag"
}

export { Tag };
