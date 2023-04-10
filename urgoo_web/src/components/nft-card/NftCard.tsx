import axios from "axios";
import { t } from "i18next";
import React, { Children, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { URL_BACKEND_ROOT } from "../../app/appConst";
import { URL_IMG_ROOT } from "../../app/appConst";
import { NftCardDetailPriceDto } from "../../models/nft/NftCardDetailPrice";
import { NftCreatorDto } from "../../models/nft/NftCreator";
import { NftPriceDto } from "../../models/nft/NftPrice";
import likeIcon from "./../../assets/img/like_icon.753bd7d8b39156d7ca21.svg";
import shareIcon from "./../../assets/img/share_icon.cc698a48b9a89426a0b6.svg";

interface CardProp {
  id?: string;
  photo?: string;
  name?: string;
  likes?: number;
  shares?: number;
  creator?: NftCreatorDto;
  collection?: boolean;
  prices?: NftPriceDto[];
  key?: number;
  dataTestId?: string | undefined;
}

const NftCard = (props: CardProp) => {

  const { t } = useTranslation();

  const price = () => {
    return (
      <div>
        {props.prices?.map((price, ind) => {
          return (
            <>
              <span key={ind} className="price text-black text-lg font-medium">
                {price.price}
                <i className="text-card-title text-xs font-light pl-1">
                  {price.symbol}
                </i>
              </span>
              <br />
            </>
          );
        })}
      </div>
    );
  };
  return (
    <div
      className="relative flex flex-col p-[10px] bg-white shadow-nomad hover:transition-all hover:ease-in hover:duration-150 rounded-md cursor-pointer z-10 text-card hover:-translate-y-[5px] hover:shadow-hover rounded-t-2xl rounded-b-lg max-w-full mb-4 "
      id={props.id}
      key={props.key}
      data-testid={props.dataTestId}
    >
      <div className="card__header relative overflow-hidden">
        <div className="card__status relative">
          {props.collection === false ? (
            <div className="box-status top-2/4 left-2/4 text-center bg-status -translate-x-2/4 -translate-y-2/4 text-white absolute right-3 p-2 rounded-lg z-[4]">
              {t("action.closed")}
            </div>
          ) : (
            <div className="text-[#fff] text-[13px] absolute leading-none top-[10px] right-[10px] py-[7px] px-[8px] bg-[#ffffffe6] rounded-[8px] z-[4]">
              {t("action.closed")}
            </div>
          )}
          <div className="card__img h-[100%] box-border rounded-lg overflow-hidden">
            <div
              className="card__img-content relative w-[100%] pt-[100%] box-border bg-cover bg-50%"
              style={{
                backgroundImage: `url(${URL_IMG_ROOT + props.photo})`,
              }}
            ></div>
          </div>
        </div>
        <div
          className={`${
            props.prices?.length === 2 ? "" : "mb-7"
          } card__description pt-4 p-3`}
        >
          <h2 className="card__title text-card-title text-base font-normal pb-4">
            {props.name}
          </h2>
          <div className="card__price flex flex-col text-base mb-2">
            <label className="text-price text-sm font-normal">{t("action.price")}</label>
            {price()}
          </div>
          <div className="card__social flex items-center">
            <div className="like flex items-end hover:transition-all hover:ease-in hover:duration-150 cursor-pointer">
              <div
                className="like-icon flex relative h-6 w-6 mr-1 hover:bg-right"
                style={{
                  backgroundImage: `url(${likeIcon})`,
                  backgroundRepeat: `no-repeat`,
                  backgroundSize: `200% 100%`,
                }}
              ></div>
              <div className="like-count">{props.likes}</div>
            </div>
            <div className="share flex items-end ml-4 hover:transition-all hover:ease-in hover:duration-150 cursor-pointer">
              <span
                className="share-icon flex relative h-6 w-6 mr-1 hover:bg-right"
                style={{
                  backgroundImage: `url(${shareIcon})`,
                  backgroundRepeat: `no-repeat`,
                  backgroundSize: `200% 100%`,
                }}
              ></span>
              <div className="share-count">{props.shares}</div>
            </div>
          </div>
          <div className="author-container relative mt-3 flex justify-between items-center">
            <label className="text-price">{t("nft.creator")}</label>
            <div className="author flex items-center">
              <div className="img__round h-5 w-5 mr-1">
                <img
                  className="rounded-full"
                  src={URL_IMG_ROOT + props.creator?.picture}
                  alt=""
                />
              </div>
              <div className="author-name font-medium">
                {props.creator?.nickname}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
