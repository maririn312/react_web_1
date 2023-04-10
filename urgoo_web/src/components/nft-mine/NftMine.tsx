import React from "react";
import { useTranslation } from "react-i18next";
import { URL_IMG_ROOT } from "../../app/appConst";
import { CreatorDto, MineDto } from "../../models/nft/NftMine";
import likeIcon from "./../../assets/img/like_icon.753bd7d8b39156d7ca21.svg";
import shareIcon from "./../../assets/img/share_icon.cc698a48b9a89426a0b6.svg";


class MineProp {
  status?: number;
  statusText?: string;
  photo?: string;
  name?: string;
  type?: string;
  code?: string;
  likes?: number;
  shares?: number;
  creator?: CreatorDto;
  bsId?: number;
  token_id?: number;
  smart_contract_address?: string;
  bought_date?: Date;
}

const NftMine = (props: MineProp) => {
  const { t } = useTranslation();
  return (
    <div className="relative flex flex-col p-[10px] bg-white shadow-nomad rounded-md cursor-pointer z-10 text-card hover:-translate-y-[5px] hover:shadow-hover">
      <div className="card__header relative overflow-hidden">
        <div className="card__img h-[100%] box-border rounded-lg overflow-hidden">
          <div
            className="card__img-content relative w-[100%] pt-[100%] box-border bg-cover bg-50%"
            style={{
              backgroundImage: `url(${URL_IMG_ROOT + props.photo})`,
            }}
          ></div>
        </div>
      </div>
      <div className="card__description pt-4 p-3">
        <h2 className="card__title text-card-title text-base font-normal pb-4">
          {props.name}
        </h2>
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
          <label className="text-price">{t("nft.creator")} </label>
          <div className="author flex items-center">
            <div className="img__round h-5 w-5 mr-1">
              <img
                className=" rounded-full"
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
  );
};

export default NftMine;
