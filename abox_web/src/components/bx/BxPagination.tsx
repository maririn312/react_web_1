import React from "react";
import clsx from "clsx";

interface BxPaginationProp {
  totalPage:number,
  currentPage:number,
  onClick?:Function,
}

export function BxPagination(props: BxPaginationProp) {
  
  const items = Array<React.ReactNode>();

  // ================================================================== //
  const Button = (pageNumber:number) => {
      if(pageNumber === -1) {
        return <button 
          className={clsx('btn btn-accent')}
        >
          ...
        </button>
    }

    return (
      <button 
        className={clsx('btn btn-accent', pageNumber === props.currentPage ? 'btn-active' : '')}
      >
        {pageNumber}
      </button>
    );
  }

  // ================================================================== //
  function init() {
    if(props.totalPage <= 6) {
      for(let i = 1; i <= props.totalPage; i++) {
        items.push(Button(i));
      }
    } else {
      if(isExistInRange(props.currentPage, 1, 5)) {
        const size = isExistInRange(props.currentPage, 1, 3) ?  3 : props.currentPage + 1;
        for(let i = 1; i <= size && i <= props.totalPage; i++) {
          items.push(Button(i));
        }
      } else {
        items.push(Button(1));
        items.push(Button(2));
        items.push(Button(3));
        items.push(Button(-1));
      }
      
      if(isExistInRange(props.currentPage, 6, props.totalPage-5)) {
        items.push(Button(props.currentPage-1));
        items.push(Button(props.currentPage));
        items.push(Button(props.currentPage+1));
      }
  
      if(isExistInRange(props.currentPage, props.totalPage-4, props.totalPage)) {
        const size = isExistInRange(props.currentPage, props.totalPage-1, props.totalPage) ? props.totalPage - 2 : props.currentPage - 1;
        for(let i = size; i <= props.totalPage; i++) {
          items.push(Button(i));
        }
      } else {
        items.push(Button(-1));
        items.push(Button(props.totalPage - 2));
        items.push(Button(props.totalPage - 1));
        items.push(Button(props.totalPage));
      }
    }
  }

  // ================================================================== //
  function isExistInRange(i:number, l:number, r:number) {
    return l <= i && r >= i;
  }

  init();
  
  // ================================================================== //
  return (
    <div className="btn-group">
      {items.map((item, index) => {
        return item;
      })}
    </div>
  );

}