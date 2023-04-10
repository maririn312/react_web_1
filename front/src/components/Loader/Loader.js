import React from "react";

const Loader = (props) => {
    const style = {
        height: props.height,
        overflow: "hidden"
    }

    return (
        <div className="progressBar" style ={style}>
            <progress class="progress is-small is-info" max="100">5%</progress>
        </div>
    );
}

Loader.defaultProps = {
    size: "small",
    height: "5px"
}

export { Loader };
