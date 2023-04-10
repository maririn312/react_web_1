import React, { useState } from 'react';
import './Pagination.css';

const Pagination = (props) => {
    const [selectInd, changeIndex] = useState(0);
    const { entireCnt, pager } = props;
    const count = parseInt(entireCnt/pager);

    let pages =[];
    for(let i = 0; i < count; i++ ) {
        pages.push(i);
    }

    const handleClick = (ind) => {
        changeIndex(ind - 1);
        if(typeof props.onClick ==='function')
            props.onClick(ind);
    }

    const handleLastFirstClick = (mode) => {
        if(mode ==='next')  changeIndex(selectInd+1);
        else changeIndex(selectInd-1);
        // this.props.onClick(ind);
    }

    return (
        <div className="pagination">
            <div className="first" onClick={e => handleLastFirstClick('prev')}>Prev</div>
            {
                pages.map((page, ind) => {
                    let selClass = ind === selectInd ? 'selected' : '';
                    return <div onClick={e => handleClick(ind)} key={ind} className={`page " + ${selClass}`} >{++ind}</div>;
                })
            }
            <div className="last" onClick={e => handleLastFirstClick('next')}>Next</div>
        </div>
    );
};

export { Pagination };
