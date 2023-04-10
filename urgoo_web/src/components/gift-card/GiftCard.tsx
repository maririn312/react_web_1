import React from "react";
import { Transition } from "@headlessui/react";
import { URL_IMG_ROOT } from "../../app/appConst";
import urgCoin from "../../assets/img/urg_coin.8dd5f506b5972bca03d2.webp";
import itemBottom from "../../assets/img/item_bottom_img.1c56c06dabe642ffd947.png";
import NomadPagination from "../nomad/NomadPagination";
import Countdown from "react-countdown";


class CardProp {
  id?: number;
  name?: string;
  description?: string;
  fiatBalance?: number;
  fiatSymbol?: string;
  photo?: string;
  price?: number;
  symbol?: string;
  onClick?: Function;
}

const GiftCard = (props: CardProp) => {
  return (
    <div className="relative p-[1px] w-full  transition-all bg-[#ffffff26] gift-card-clip-path">
      <div className="p-0 m-0 outline-none border-box ">
        <span  className="absolute content-[' '] h-14 w-14 bg-white blur-lg animate-giftLine"/>
        <div className="bg-gift-color gift-card-clip-path p-0 m-0 outline-none border-box border-white">
          <div className="gift__card-img h-full w-full relative overflow-hidden">
            <div className="img-box relative h-full w-full flex items-center justify-center">
              <div className="flex items-end justify-end flex-col right-4 bottom-4 z-[3] absolute">
                <div className="flex align-center"> <Countdown /> </div>
              </div>
              <div className="relative h-full w-full">
                <img
                  className="relative h-full w-full"
                  src={`${URL_IMG_ROOT + props.photo}`}
                  alt=""
                />          
              </div>
            </div>
          </div>
          <div 
            className="relative p-5 bg-no-repeat"                     
            style={{
              backgroundImage: `url(${itemBottom})` ,
            }}>
            <h3 className="text-lg font-medium mb-2 text-white">{props.name}</h3>
            <ul>
              <li className="__dg __g1 __gap1_6 grid items-start gap-4 grid-cols-1">
                <p className="__c_price_content __hider price-content overflow-hidden text-ellipsis text-custom-gray min-h-[60px] h-[60px] font-normal">
                  {props.description}                
                </p>
                <div className="__c_price gift__price-container text-white text-base font-medium min-w-[180px]">
                  <div _ngcontent-mmr-c62="" className="__dfc flex items-center">
                    <span
                      className="price-icon flex h-7 w-7 mr-2 bg-100%"
                      style={{
                        backgroundImage: `url(${urgCoin})`,
                      }}
                    ></span>
                    <div className="price">
                      <div className="price-urg">
                        {props.price} {props.symbol}
                      </div>
                      <div className="price-mnt text-custom-gray mr-6 font-normal text-sm">
                        ≈ {props.fiatBalance} {props.fiatSymbol}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCard;
