import React, { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../app/hooks";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { BxBidAction, BxButton, BxButtonType, BxFreightStep, BxLoadingIndicator } from "../../../components";
import { BxCard } from "../../../components/bx/BxCard";
import box from "../../../assets/images/box.svg";
import { Countdown, Divider } from "react-daisyui";
import StringUtility from "../../../utility/StringUtility";
import { BxMessage, BxMessageType } from "../../../components/bx/BxMessage";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { categoryList } from "../../../service/categoryApiClient";
import { CategoryDto } from "../../../models/category/CategoryListResponseDto";
import ErrorManager from "../../../utility/ErrorManager";
import { RESPONSE_ERROR, RESPONSE_SUCCESS, URL_BACKEND_DOWNLOAD } from "../../../app/appConst";
import { AuctionDto } from "../../../models/auction/AuctionDto";
import { auPromotedLiveList, auPromotedSoonList } from "../../../service/auListApiClient";
import AuctionsSection from "../profile/AuctionsSection";
import BxAuCard from "../../../components/bx/BxAuCard";

/* ============================================================================ */
/* ============================================================================ */
const HomePage: FunctionComponent = () => {
  const { t } = useTranslation();

  const [data, setData] = useState<string>('empty');
  const navigate = useNavigate();

  const [centerAuctions, setCenterAuctions] = useState({
    error: '',
    isLoading: false,
    auctions: Array<AuctionDto>()
  });

  const [promotedAuctions, setPromotedAuctions] = useState({
    error: '',
    isLoading: false,
    auctions: Array<AuctionDto>()
  });

  const [promotedSoonAuctions, setPromotedSoonAuctions] = useState({
    error: '',
    isLoading: false,
    auctions: Array<AuctionDto>()
  });

  const [categories, setCategories] = useState({
    error: '',
    isLoading: false,
    categories: Array<CategoryDto>()
  });

  /* ============================================================================ */
  /* ============================================================================ */
  useEffect(() => {
    getCategories();
    auCenterList();
    getPromotedAuctions();
    getPromotedSoonAuctions();
  }, []);

  /* ============================================================================ */
  /* ============================================================================ */
  async function getCategories() {
    setCategories({...categories, isLoading: true, error: ''});
    try {
      const response = await categoryList({page: 0, size: 10});
      if(response.status === RESPONSE_SUCCESS) {
        setCategories({...categories, categories: response.categories});
      } else if(response.status === RESPONSE_ERROR) {
        setCategories({...categories, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setCategories({...categories, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  /* ============================================================================ */
  /* ============================================================================ */
  async function auCenterList() {
    setCenterAuctions({...centerAuctions, isLoading: true, error: ''});
    try {
      const response = await auPromotedLiveList();
      if(response.status === RESPONSE_SUCCESS) {
        setCenterAuctions({...centerAuctions, auctions: response.auctions});
      } else if(response.status === RESPONSE_ERROR) {
        setCenterAuctions({...centerAuctions, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setCenterAuctions({...centerAuctions, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  /* ============================================================================ */
  /* ============================================================================ */
  async function getPromotedAuctions() {
    setPromotedAuctions({...promotedAuctions, isLoading: true, error: ''});
    try {
      const response = await auPromotedLiveList();
      if(response.status === RESPONSE_SUCCESS) {
        setPromotedAuctions({...promotedAuctions, auctions: response.auctions});
      } else if(response.status === RESPONSE_ERROR) {
        setPromotedAuctions({...promotedAuctions, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setPromotedAuctions({...promotedAuctions, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  /* ============================================================================ */
  /* ============================================================================ */
  async function getPromotedSoonAuctions() {
    setPromotedSoonAuctions({...promotedSoonAuctions, isLoading: true, error: ''});
    try {
      const response = await auPromotedSoonList();
      if(response.status === RESPONSE_SUCCESS) {
        setPromotedSoonAuctions({...promotedSoonAuctions, auctions: response.auctions});
      } else if(response.status === RESPONSE_ERROR) {
        setPromotedSoonAuctions({...promotedSoonAuctions, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setPromotedSoonAuctions({...promotedSoonAuctions, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  /* ============================================================================ */
  /* ============================================================================ */
  const Banner = () => {
    return (
      <BxCard className="h-80">
        <figure>
          <img className="auction-img" src="https://www.intel.com/content/dam/www/central-libraries/us/en/images/2022-07/arc-pro-group-with-portal.png.rendition.intel.web.1280.720.png" />
          <div className="auction-top-badge">
            <span className="badge badge-secondary font-semibold text-white">sponsored</span>
          </div>
        </figure>
      </BxCard>
    );
  }

  /* ============================================================================ */
  /* ============================================================================ */
  const Categories = () => {
    if(categories.isLoading) {
      return <div>
        <BxLoadingIndicator size={10}/>
      </div>;
    }

    if(categories.error) {
      return <BxMessage
        type={BxMessageType.error}
        message={categories.error}
      />
    }

    return (
      <div className="flex flex-wrap">
        {categories.categories.map((category, index) => {
          return (
            <div className="flex flex-col flex-wrap grid justify-items-center content-start text-center w-20 mr-2 ml-2">
              <BxButton 
              onClick={() => { 
                navigate(`/category/${category.id}`);
              }} 
              type={BxButtonType.gradientIcon} 
              className="w-20 h-20">
                <img className="icon-color-invert w-10 h-10" alt={category.name} src={`${URL_BACKEND_DOWNLOAD}/${category.icon}`} />
              </BxButton>
              <span className="text-sm">{category.name}</span>
            </div>
          );
        })}
      </div>
    );
  }
  
  /* ============================================================================ */
  /* ============================================================================ */
  return (
    <div>
      {/* <div className="mb-4">
        <BxMessage
          type={BxMessageType.warning}
          message={data}
        />
      </div> */}
      <section className="mb-7">
        {Categories()}
      </section>
      <section>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
          {promotedAuctions.auctions.map((auction, index) => {
            return (
              <BxAuCard auction={auction} isPaid={true}/>
            );
          })}
        </div>
      </section>
      <div className="my-4">
        <Banner/>
      </div>
      <section className="mb-4">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
          {centerAuctions.auctions.map((auction, index) => {
            return (
              <BxAuCard auction={auction} isPaid={false}/>
            );
          })}
        </div>
      </section>
      <section>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
          {promotedSoonAuctions.auctions.map((auction, index) => {
            return (
              <BxAuCard auction={auction} isPaid={true}/>
            );
          })}
        </div>
      </section>
      <Divider/>
      <section>
        <div className="grid grid-cols-2 gap-4">
          <BxCard className="lg:card-side">
            <figure><img src="https://placeimg.com/400/400/arch" alt="Album"/></figure>
            <div className="card-body">
              <h2 className="card-title">New album is released!</h2>
              <p>Click the button to listen on Spotiwhy app.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Listen</button>
              </div>
            </div>
          </BxCard>
          <BxCard className="lg:card-side">
            <figure><img src="https://placeimg.com/400/400/arch" alt="Album"/></figure>
            <div className="card-body">
              <h2 className="card-title">New album is released!</h2>
              <p>Click the button to listen on Spotiwhy app.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Listen</button>
              </div>
            </div>
          </BxCard>
        </div>
      </section>
      <Divider/>
    </div>
  );
};

export default HomePage;
