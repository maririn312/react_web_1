import React from "react";

const Combo = (props) => {
    const handleSelect = () => {
        props.onSelect();
    }

    return (
        <div class="field">
            <div class="control">
                <div class="select is-info">
                    <select onChange = {handleSelect} >
                        {
                            props.items.map(item => {
                                return <option>{item.name}</option>
                            })
                        }
                    </select>
                </div>
            </div>
        </div>
    );
}

Combo.defaultProps = {
    items: [
        {
            id: 1,
            name: "option1"
        },
        {
            id: 2,
            name: "option2"
        }
    ],
    onSelect: () => {
        console.log('onclick function not pass')
    }
}

export { Combo };
