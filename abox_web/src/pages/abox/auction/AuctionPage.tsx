import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { BxBidAction, BxButton, BxButtonType, BxCountdown, BxFreightStep, BxLoadingIndicator } from "../../../components";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../../assets/css/carousel.css";
import { Button, Checkbox, Divider, Toggle } from "react-daisyui";
import { useTranslation } from "react-i18next";
import { AuctionDetailResponseDto, PendingPaymentDto } from "../../../models/auction/AuctionDetailResponseDto";
import { auctionDetail, auctionMyHistory, auctionSubscribe } from "../../../service/auctionApiClient";
import ErrorManager from "../../../utility/ErrorManager";
import { Link, useParams } from "react-router-dom";
import { BxMessage, BxMessageType } from "../../../components/bx/BxMessage";
import { LOCATION_ULAANBAATAR_LAT, LOCATION_ULAANBAATAR_LNG, RESPONSE_ERROR, RESPONSE_SUCCESS, URL_BACKEND_DOWNLOAD } from "../../../app/appConst";
import StringUtility from "../../../utility/StringUtility";
import { Transition } from "@headlessui/react";
import { BidDialog } from "../../dialog/BidDialog";
import { InvoicePaymentDialog } from "../../dialog/InvoicePaymentDialog";
import { BxCard } from "../../../components/bx/BxCard";
import { FaUserClock } from "react-icons/fa"
import 'leaflet/dist/leaflet.css';
import { Circle, LayerGroup, LayersControl, MapContainer, TileLayer } from "react-leaflet";
import { useAppSelector } from "../../../app/hooks";
import { userState } from "../../../redux/user/userSlice";
import { MyHistoryDto } from "../../../models/auction/AuctionMyHistoryResponseDto";
import clsx from "clsx";
import { getHeapStatistics } from "v8";
import { currentStats } from "../../../service/bidApiClient";
import { DenchinDialog } from "../../dialog/DenchinDialog";

interface AuctionState {
  isLoading: boolean;
  error?: string;
  detail?: AuctionDetailResponseDto;
}

interface MyStatsState {
  winningPrice?: number;
  myLastBiddingPrice?: number;
  youAreCurrentlyWinner?: boolean;
  error?: string;
  isLoading: boolean;
}

const AuctionPage: FunctionComponent = () => {
  const { t } = useTranslation();
  const { auctionId } = useParams();
  
  const [myStats ,setMyStats] = useState<MyStatsState>();
  const [amICreator, setCreator] = useState<boolean>(false);
  const [auction, setAuction] = useState<AuctionState>();
  const [myHistory, setMyHistory] = useState({
    isLoading: false,
    page: 0,
    size: 20,
    error: '',
    histories: Array<MyHistoryDto>(),
  });

  const loginStatus = useAppSelector(userState);
  const [subscription, setSubscription] = useState({
    subscribed: false,
    isLoading: false,
    error: ''
  });

  const [isDeliveryInfoShowing, setDeliveryInfoShowing] = useState<boolean>(true);
  const [isInvoiceDialogOpen, setInvoiceDialogOpen] = useState<boolean>(false);
  const [isBidDialogOpen, setBidDialogOpen] = useState<boolean>(false);
  const [isDenchinDialogOpen, setDenchinDialogOpen] = useState<boolean>(false);

  /* ============================================================================ */
  /* ============================================================================ */
  useEffect(() => {
    if(auctionId !== undefined) {
      const id = parseInt(auctionId);
      getAuctionDetail(id);
    }
  }, []);

  /* ============================================================================ */
  /* ============================================================================ */
  useEffect(() => {
    if(auctionId !== undefined) {
      if(loginStatus.isLoggedIn) {
        const id = parseInt(auctionId);

        if(auction?.detail?.auction.creator === loginStatus.info?.kyc.nickname) {
          setCreator(true);
        }

        getMyHistories(id);
        getStats(id);
      }
    }
  }, [loginStatus.isLoggedIn]);

  /* ============================================================================ */
  /* ============================================================================ */
  async function getStats(id:number) {
    setMyStats({ ...myStats, isLoading: true });
    try {
      const response = await currentStats(id);
      if(response.status === RESPONSE_SUCCESS) {
        setMyStats({ ...myStats, 
          isLoading: false,
          winningPrice: response.winning_price,
          myLastBiddingPrice: response.my_last_bidding_price,
          youAreCurrentlyWinner: response.you_are_currently_winner,
        });
      } else if(response.status === RESPONSE_ERROR) {
        setMyStats({ ...myStats, isLoading: false, error: response.msg });
      }
    } catch(ex) {
      setMyStats({
        ...myStats,
        isLoading: false,
        error: ErrorManager.handleRequestError(ex),
      });
    }
  }

  /* ============================================================================ */
  /* ============================================================================ */
  async function subscribeAction(id: number, action:'ON'|'OFF') {
    setSubscription({ ...subscription, isLoading: true });
    try {
      const response = await auctionSubscribe(id, action);
      if(response.status === RESPONSE_SUCCESS) {
        setSubscription({ ...subscription, isLoading: false, subscribed: action === 'ON'});
      } else if(response.status === RESPONSE_ERROR) {
        setSubscription({ ...subscription, isLoading: false, error: response.msg });
      }
    } catch(ex) {
      setSubscription({
        ...subscription,
        isLoading: false,
        error: ErrorManager.handleRequestError(ex),
      });
    }
  }

  /* ============================================================================ */
  /* ============================================================================ */
  async function getMyHistories(id: number) {
    setMyHistory({ ...myHistory, isLoading: true });
    try {
      const response = await auctionMyHistory(id);
      if(response.status === RESPONSE_SUCCESS) {
        setMyHistory({ ...myHistory, isLoading: false, histories: response.histories});
      } else if(response.status === RESPONSE_ERROR) {
        setMyHistory({ ...myHistory, isLoading: false, error: response.msg });
      }
    } catch(ex) {
      setMyHistory({
        ...myHistory,
        isLoading: false,
        error: ErrorManager.handleRequestError(ex),
      });
    }
  }

  /* ============================================================================ */
  /* ============================================================================ */
  async function getAuctionDetail(id: number) {
    setAuction({ ...auction, isLoading: true });
    try {
      const response = await auctionDetail(id);
      if(response.status === RESPONSE_SUCCESS) {
        setAuction({ ...auction, isLoading: false, detail: response });
        setSubscription({...subscription, subscribed:response.auction.subscribed_flag});
        document.title = auction?.detail?.auction.name ?? "";
      } else if(response.status === RESPONSE_ERROR) {
        setAuction({ ...auction, isLoading: false, error: response.msg });
      }
    } catch (ex) {
      setAuction({
        ...auction,
        isLoading: false,
        error: ErrorManager.handleRequestError(ex),
      });
    }
  }

  /* ============================================================================ */
  /* ============================================================================ */
  const AuthorAndTitle = () => {
    const name = StringUtility.extractNickname(auction?.detail?.auction.creator ?? "");

    return <div>
      <Link className="hover:underline" to={`/user/${auction?.detail?.auction.creator}`}>
        <span className="font-semibold">{name[0]}</span>
        <span className="">@{name[1]}</span>
      </Link>
      <h2 className="leading-tight text-3xl mt-0 mb-2">
        {auction?.detail?.auction.name}
      </h2>
    </div>
  }

  /* ============================================================================ */
  /* ============================================================================ */
  const Invoice = (payments:Array<PendingPaymentDto> | undefined) => {
    if(payments === undefined) {
      return <></>
    }

    return (
      <div>
        {payments.map((item, index) => {
          return <div className="mb-4 stats w-full bg-gradient-to-br from-secondary to-primary">
            <div className="stat">
              <div className="stat-title text-white">{t('label.paymentAmount')}</div>
              <div className="stat-value text-white">{StringUtility.numberToCurrency(item.has_to_pay)}{item.fiat_symbol}</div>
              <div className="stat-actions">
                <BxButton 
                  onClick={() => {
                    setInvoiceDialogOpen(true);
                  }} 
                  className="btn-sm text-white" 
                  type={BxButtonType.bordered}>
                    {t('action.pay')}
                  </BxButton>
              </div>
            </div>
            <div className="stat">
              <div className="stat-title text-white">
                <BxCountdown 
                  type="full"
                  endDate={item.expire_at} 
                  startDate={'2019-01-01'} 
                />
              </div>
              <div className="stat-title text-white wrap">{item.statement}</div>
            </div>
            <InvoicePaymentDialog 
              isOpen={isInvoiceDialogOpen} 
              setIsOpen={setInvoiceDialogOpen} 
              invoiceId={item.invoice_id} 
            />
          </div>;
        })}
      </div>
    );
  }

  /* ============================================================================ */
  /* ============================================================================ */
  const AuctionInfo = () => {
    const items = Array<React.ReactNode>();
    const au = auction?.detail?.auction;

    items.push(renderLabel(t('label.status'), au?.status_text ?? ""));
    items.push(renderLabel(t('label.winnerAmount'), "0"));

    items.push(renderLabel(t('label.startDate'), au?.start_date ?? ""));
    items.push(renderLabel(t('label.endDate'), au?.end_date ?? ""));

    items.push(renderLabel(t('label.factory'), au?.factory.name ?? ""));
    items.push(renderLabel(t('label.model'), au?.product.name ?? ""));

    return (
      <div>
        <div className="grid grid-cols-2">
          {items.map((item, index) => {
            return item;
        })}
        </div>
        <Divider color="#FDA228"/>
        <div className="grid grid-cols-2">
          {au?.conditions.map((item, index) => {
            return renderLabel(item.name, item.value);
          })}
        </div>
      </div>
    );
  }

  /* ============================================================================ */
  /* ============================================================================ */
  const Conditions = () => {
    const au = auction?.detail?.auction;
    
    return (
      <div className="grid grid-cols-2">
        {au?.conditions.map((item, index) => {
          return renderLabel(item.name, item.value);
        })}
      </div>
    );
  }

  /* ============================================================================ */
  /* ============================================================================ */
  const SubscribeAction = () => {
    if(loginStatus.isLoggedIn) {
      return (
        <div className="rounded-lg bg-base-200 p-3 my-2">
          <div className="flex place-content-between">
            <span className="self-start text-lg">{t('label.watch')}</span>
            <div className="h-8">
              {subscription.isLoading 
              ? <BxLoadingIndicator color="#6669f1" size={20}/> 
              : <Toggle className="self-end" size="lg" color="primary" 
                onClick={() => {
                  subscribeAction(Number(auctionId), subscription.subscribed ? 'OFF' : 'ON');
                }}
                defaultChecked={subscription.subscribed}
              />}
            </div>
          </div>
        </div>
      );
    } 
    return <></>
  }

  /* ============================================================================ */
  /* ============================================================================ */
  function renderLabel(label:string, value:string) {
    return <div className="my-2">
      <div className="text-sm text-gray-400">
        {label}
      </div>
      <div className="">
        {value}
      </div>
    </div>
  }

  /* ============================================================================ */
  /* ============================================================================ */
  const MyHistories = () => {
    if(loginStatus.isLoggedIn) {
      return (
        <div>
          <div className="flex gap-1 mb-2 ml-4">
            <FaUserClock size={18}/> <span className="text-md font-semibold">{t('label.myHistory')}</span>
          </div>
          {myHistory.histories.map((item, index) => {
            return (
              <BxCard className="p-3 mb-3" hasHover={false}>
                <div className="text-sm">{item.created_date}</div>
                <div className="font-semibold">{item.type}</div>
                <p>{item.statement}</p>
              </BxCard>
            );
          })}
        </div>
      );
    } 
    return <></>;
  }

  /* ============================================================================ */
  /* ============================================================================ */
  const DeliveryInfo = () => {
    const center = {
      lat:LOCATION_ULAANBAATAR_LAT,  
      lng:LOCATION_ULAANBAATAR_LNG
    }

    return (
      <div>
        <div>
          <BxButton
            type={BxButtonType.bordered}
            onClick={() => {
              setDeliveryInfoShowing(!isDeliveryInfoShowing);
            }}
          >
            {t('action.showMap')}
          </BxButton>
        </div>
        <Transition
          show={isDeliveryInfoShowing}
          as="div"
          enter="transform transition duration-[200ms]"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transform duration-200 transition ease-in-out"
          leaveFrom="opacity-100 scale-100 "
          leaveTo="opacity-0 scale-95 "
        >
          <BxCard>
            <MapContainer className="rounded-lg h-[500px]" center={center} zoom={11} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LayersControl position="topright">
                <LayersControl.Overlay checked name={t('label.region')}>
                  <LayerGroup>
                    {auction?.detail?.logistics_info.delivery_section.areas.map((item, index) => {
                      return <Circle
                        center={[
                          Number(item.circle_y),
                          Number(item.circle_x)
                        ]}
                        pathOptions={{
                          fillColor: item.color,
                          stroke: true,
                          weight: 1,
                          color: item.color
                        }}
                        radius={Number(item.circle_r)}
                      />
                    })}
                  </LayerGroup>
                </LayersControl.Overlay>
              </LayersControl>
            </MapContainer>
          </BxCard>
        </Transition>
      </div>
    );
  }

  /* ============================================================================ */
  /* ============================================================================ */
  const ReportButton = () => {
    return (
      <div>REPORT</div>
    );
  }

  /* ============================================================================ */
  /* ============================================================================ */
  if(auction?.isLoading) {
    return (
      <div></div>
    )
  }

  if(auction?.error) {
    return (
      <div>
        <BxMessage type={BxMessageType.error} message={auction.error}/>
      </div>
    )
  }

  if(auction?.detail !== undefined) {
    const imgs = auction.detail.auction.images;
    
    return(
      <div>
        <section>
          <div className="grid lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3">
              <Carousel 
                showStatus={false} 
                // renderIndicator={(clickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void, isSelected: boolean, index: number, label: string)=>{
                //   return <div>1</div>
                // }}
              >
                {imgs.map((image, index) => {
                  return (<div>
                    <img className="auction-img-lg" src={`${URL_BACKEND_DOWNLOAD}/${image.image_lg}`} alt={`${auction.detail?.auction.name} ${index}`} />
                  </div>);
                })}
              </Carousel>
              {MyHistories()}
            </div>
            <div className="lg:col-span-2">
              <div className="mb-3">
                {AuthorAndTitle()}
              </div>
              
              <div className="mb-2">
                {Invoice(auction.detail.pending_payments)}
                <BxBidAction 
                  bidAmount={0}
                  stakeAmount={0}
                  onBid={() => { setBidDialogOpen(true); }}
                  onStake={() => { setDenchinDialogOpen(true); }}
                />
                {SubscribeAction()}
              </div>
              <div className="mb-2">
                <BxCountdown 
                  type="full"
                  className="text-2xl" 
                  endDate={auction.detail.auction.end_date} 
                  startDate={auction.detail.auction.start_date} 
                />
              </div>
              <div className="mb-2">
                <p>
                  {auction.detail.auction.description}
                </p>
              </div>
              <div>
                {AuctionInfo()}
                <Divider/>
                {DeliveryInfo()}
              </div>
              <div className="mt-4 mb-4"></div>
            </div>
          </div>
          <BidDialog isOpen={isBidDialogOpen} setIsOpen={setBidDialogOpen} />
          <DenchinDialog isOpen={isDenchinDialogOpen} setIsOpen={setDenchinDialogOpen} />
        </section>
      </div>
    );
  }

  return (
    <div></div>
  );
};

export default AuctionPage;
