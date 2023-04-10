import React from 'react';

const TextArea = (props) => {
    return (
        <div class="control">
            <textarea class="textarea" placeholder={props.pholder}></textarea>
        </div>
    )
}

TextArea.defaultProps = {
    pholder: "My TextArea"
}

export {TextArea}
