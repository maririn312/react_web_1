import React, { useEffect, useState } from "react";
import clsx from "clsx";

interface NomadPaginationProp {
  totalPage: number;
  currentPage: number;
  onClick: (page: number) => void;
}

const NomadPagination = (props: NomadPaginationProp) => {
  const items = Array<React.ReactNode>();

  const PageButton = (
    value: number | ">" | ">>" | "<" | "<<",
    isActive: boolean
  ) => {
    return (
      <button
        type="button"
        className={clsx("paginator-page", isActive ? "pagination-active" : "")}
        onClick={() => {
          if ("string" === typeof value) {
            switch (value) {
              case ">":
                if (props.currentPage < props.totalPage - 1) {
                  props.onClick(props.currentPage + 1);
                }
                break;
              case ">>":
                if (props.currentPage < props.totalPage - 1) {
                  props.onClick(props.totalPage - 1);
                }
                break;
              case "<":
                if (props.currentPage > 0) {
                  props.onClick(props.currentPage - 1);
                }
                break;
              case "<<":
                if (props.currentPage > 0) {
                  props.onClick(0);
                }
                break;
            }
          } else if ("number" === typeof value) {
            props.onClick(value);
          }
        }}
      >
        {"number" === typeof value ? value + 1 : value}
      </button>
    );
  };

  function init() {
    // add pre buttons
    items.push(PageButton("<<", false));
    items.push(PageButton("<", false));

    // add pages
    if (props.totalPage === 0) {
      items.push(PageButton(props.currentPage, true));
    } else if (props.totalPage <= 5) {
      for (let i = 0; i < props.totalPage; i++) {
        items.push(PageButton(i, i === props.currentPage));
      }
    } else {
      let preBtnCount = 0;
      let postBtnCount = 0;

      if (props.currentPage === 0) {
        preBtnCount = 0;
        postBtnCount = 4;
      } else if (props.currentPage === 1) {
        preBtnCount = 1;
        postBtnCount = 3;
      } else if (props.currentPage === props.totalPage -1) {
        preBtnCount = 4;
        postBtnCount = 0;
      } else if (props.currentPage === props.totalPage - 2) {
        preBtnCount = 3;
        postBtnCount = 1;
      } else {
        preBtnCount = 2;
        postBtnCount = 2;
      }

      for (let i = preBtnCount; i > 0; i--) {
        items.push(PageButton(props.currentPage - i, false));
      }
      items.push(PageButton(props.currentPage, true));
      for (let i = 1; i <= postBtnCount; i++) {
        items.push(PageButton(props.currentPage + i, false));
      }
    }

    // add post buttons
    items.push(PageButton(">", false));
    items.push(PageButton(">>", false));
  }

  init();

  return (
    <div className="flex items-center flex-wrap justify-center box-border py-2 px-4 cursor-pointer">
      {items.map((item, index) => {
        return item;
      })}
    </div>
  );
};
export default NomadPagination;
