import { Transition } from "@headlessui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RESPONSE_ERROR, RESPONSE_SUCCESS, URL_IMG_ROOT } from "../../app/appConst";
import NomadBtn, { BtnType } from "../nomad/NomadBtn";
import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";
import TabItems from "../tab-items/TabItems";
import { NftCardDetailPriceDto } from "../../models/nft/NftCardDetailPrice";
import { NftCardDetailCreatorDto } from "../../models/nft/NftCardDetailCreator";
import NomadCountdown from "../countdown/countdown";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../app/hooks";
import { useDispatch } from "react-redux";
import { getBalanceEvent, getBalanceState } from "../../redux/Wallet/balanceSlice";
import StringUtility from "../../utility/StringUtility";
import NomadToast, { ToastAlert, ToastType } from "../nomad/NomadToast";
import { buyNft } from "../../service/cardApiClient";
import ErrorManager from "../../utility/ErrorManager";
import URGLike from "../logo/urg-like";
import URGShare from "../logo/urg-share";
import URGView from "../logo/urg-view";
import NftBuyDialog from "../../pages/dialog/NftBuyDialog";

interface DetailProp {
  smartContract?: string;
  photo: string;
  name: string;
  type: string;
  seen: number;
  bsId: number;
  code: string;
  likes: number;
  shares: number;
  unavailable: number;
  creator?: NftCardDetailCreatorDto;
  available: number;
  total: number;
  description: string;
  prices?: NftCardDetailPriceDto[];
  type_name: string;
  start_date?: Date;
  end_date?: Date;
  collection_name: string;
  collection_id: number;
}

const NftCardDetail = (props: DetailProp) => {
  const [priceId, setPriceId] = useState<number>(0);
  const [isOpenNftDialog, setOpenNftDialog] = useState<boolean>(false);
  const { t } = useTranslation();
  const balance = useAppSelector(getBalanceState);
  const dispatch = useDispatch<any>();

  const [buyStatus, setBuyStatus] = useState({
    error: '',
    isLoading: false,
  });

  // ================================================================== //
  const onChange = (e: RadioChangeEvent) => {
    setPriceId(e.target.value);
  };

  // ================================================================== //
  async function buy(pincode:string) {
    setBuyStatus({...buyStatus, isLoading: true});
    try {
      const response = await buyNft({
        inquireId: StringUtility.generateInquireId(),
        nftCode: props.code,
        count: 1,
        pinCode: pincode,
        priceId: priceId,
      });
      if(response.status === RESPONSE_SUCCESS) {
        setBuyStatus({...buyStatus, isLoading: false});
        ToastAlert(response.msg, ToastType.SUCCESS);
        dispatch(getBalanceEvent());
      } else if(response.status === RESPONSE_ERROR) {
        ToastAlert(response.msg, ToastType.ERROR);
        setBuyStatus({...buyStatus, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      ToastAlert(ErrorManager.handleRequestError(ex), ToastType.ERROR);
      setBuyStatus({...buyStatus, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  // ================================================================== //
  function validateForm() {
    if(priceId !== undefined) {
      return true;
    }
    return false;
  }

  // ================================================================== //
  const countdownTime = () => {
    let text = t('label.tillEnd');
    const date = new Date();
    let cntDate:Date = new Date();

    if(props.start_date) {
      if(props.start_date > date) {
        text = t('label.tillStart');
        cntDate = props.start_date;
      }
    }

    if(props.end_date) {
      if(props.end_date < date) {
        text = t('label.tillEnd');
        cntDate = props.end_date;
      }
    }
    
    return (
      <>
        <h4 className="text-status-detail text-base uppercase font-normal mb-2 opacity-60">
          <b>{text}</b>
        </h4>
        <NomadCountdown theme="darkblue" date={cntDate}/>
      </>
    );
  }

  // ================================================================== //
  const actionBtn = () => {
    let text:string = t('label.buy');
    let hasAction:boolean = true;
    const now = new Date();

    if(props.start_date) {
      if(now < props.start_date) {
        hasAction = false;
        text = t('label.giftcardNotStarted');
      }
    } 
    
    if(props.end_date) {
      if(now > props.end_date) {
        hasAction = false;
        text = t('label.giftcardEnded');
      }
    }

    return (
      <NomadBtn 
        type={BtnType.blue}
        className="w-full bg-custom-blue text-white font-bold flex 
        items-center justify-center h-11 px-5 rounded-lg hover:bg-prm-hover"
        isLoading={buyStatus.isLoading}
        onClick={() => {
          if(hasAction) {
            if(validateForm()) {
              setOpenNftDialog(true);
            }
          }
        }}
      >
        {text}
      </NomadBtn>
    );
  }

  // ================================================================== //
  const priceRadio = () => {
    return (props.prices ?? []).map((price, ind) => {
      return (
        <label className="text-price font-light text-sm relative flex items-start justify-start text-left p-0 w-full">
          <label className="radio-label text-white text-2xl font-medium pt-4 px-4 pb-3 bg-creator border border-dashed border-creator-b rounded-lg w-full">
            <Radio.Group onChange={onChange} value={priceId}>
              <Radio value={ind}>
                <span className="mx-1"></span>
                <b>{price.unitPrice}</b>
                <span className="text-status-detail text-xs font-bold ml-1 uppercase">
                  {price.symbol}
                </span>
              </Radio>
            </Radio.Group>
          </label>
        </label>
      );
    });
  };

  // ================================================================== //
  return (
    <div className="grid gap-10 lg:grid-cols-2 md:grid-cols-1">
      <div className="detail-l">
        <div className="detail-img relative p-px bg-detail overflow-hidden">
          <Transition
            appear={true}
            show={true}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <span className="trans absolute content-[''] h-12 w-12 bg-white blur-lg rounded-full"></span>
          </Transition>
          <div className="flex items-center justify-center h-full w-full bg-sec-black relative overflow-hidden p-0">
            <div className="img-content flex items-center justify-center h-full w-full">
              <img
                className="relative h-full w-full min-h-[280px]"
                src={props.photo ? `${URL_IMG_ROOT + props.photo}` : undefined}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="detail-r">
        <div className="detail-content relative">
          <div className="detail-header">
            <h1 className="text-white text-3xl font-bold pb-4 mb-4 ">
              {props.name}
            </h1>
            <div className="price md:mb-2 text-left text-white text-base min-w-[180px] ">
              <div className="back__btn flex mb-4">
                <Link replace to="/" className="text-white">
                  {t('action.back')}
                </Link>
              </div>
              <div className="flex items-center justify-between">
                <div className="status limited text-base font-bold text-status-detail">
                  <span className="bg-gradient-to-r from-custom-green to-custom-purple text-white text-[15px] mr-2 px-[10px] py-1 rounded-[20px]">
                    {props.available}/{props.total}
                  </span>
                  {props.type_name}
                </div>
                <div className="like__share__view flex text-status-detail m-0 items-center text-sm">
                  <div className="like flex place-items-center hover:transition-all hover:ease-in hover:duration-150 cursor-pointer">
                    <URGLike/>
                    <div className="like-count font-bold">{props.likes}</div>
                  </div>
                  <div className="view flex place-items-center ml-4 hover:transition-all hover:ease-in hover:duration-150 cursor-pointer">
                    <URGView/>
                    <div className="share-count font-bold">{props.seen}</div>
                  </div>
                  <div className="share flex place-items-center ml-4 hover:transition-all hover:ease-in hover:duration-150 cursor-pointer">
                    <URGShare/>
                    <div className="share-count font-bold">{props.shares}</div>
                  </div>
                </div>
              </div>
              <div className="content__user grid sm:grid-cols-2 grid-cols-1 sm:gap-4">
                <Link
                  to={`/creator/${props.creator?.nickname}`}
                  className="grid items-center grid-cols-34px gap-2 p-[10px] mt-5 bg-creator border border-dashed border-creator-b rounded-lg cursor-pointer"
                >
                  <div className="creater__img h-[34px] w-[34px] rounded overflow-hidden">
                    <img
                      src={
                        props.creator?.picture !== undefined
                          ? `${URL_IMG_ROOT}${props.creator?.picture}`
                          : ""
                      }
                      alt=""
                    />
                  </div>
                  <div className="creator__desc">
                    <p className="text-xs text-creater-desc font-bold">{t('label.creator')}</p>
                    <h4 className="text-white text-sm font-bold mt-1">
                      {props.creator?.nickname}
                    </h4>
                  </div>
                </Link>
                <Link
                  to={`/collection/${props.collection_id}`}
                  className="grid items-center grid-cols-34px gap-2 p-[10px] mt-5 bg-creator border border-dashed border-creator-b rounded-lg cursor-pointer"
                >
                  <div className="creater__img h-[34px] w-[34px] rounded overflow-hidden">
                    <img
                      src={props.photo ? `${URL_IMG_ROOT + props.photo}` : undefined}
                      alt=""
                    />
                  </div>
                  <div className="creator__desc">
                    <p className="text-xs text-creater-desc font-bold">{t('label.collection')}</p>
                    <h4 className="text-white text-sm font-bold mt-1">
                      {props.collection_name}
                    </h4>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          {/* MAIN */}
          <div className="detail-main p-0 m-0">
            <div className="description-content mt-5 ">
              <p className="text-custom-gray text-sm">{props.description}</p>
            </div>
            <div className="box__price mt-5 flex flex-col text-base">
              <label className="text-white text-sm mb-[6px] font-bold">
                {t('label.price')}
              </label>
            </div>
            <div className="grid grid-cols-1 gap-4">{priceRadio()}</div>
            <div className="count__down mt-6">
              {countdownTime()}
            </div>
            <div className="mt-7">
              {actionBtn()}
            </div>
            <div className="mt-7 flex flex-col">
              {/* <div className="tab__head flex items-center w-full">
                <div className="tab__item text-status-detail flex text-base font-normal py-3 px-[10px] border-b-2 border-black cursor-pointer">
                  Эзэмшигч
                </div>
                <div className="tab__item">Түүх</div>
              </div> */}
              <TabItems
                smartContract={props.smartContract}
                bsId={props.bsId}
                code={props.code}
              ></TabItems>
              <NomadToast/>
              <NftBuyDialog
                isOpen={isOpenNftDialog}
                setIsOpen={setOpenNftDialog}
                action={(password:string) => {
                  buy(password);
                  setOpenNftDialog(false);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftCardDetail;
