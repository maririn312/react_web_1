import { Fragment, FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AUCTION_PENDING, AUCTION_REVIEWED, FIELD_BUY_IT_NOW_PRICE, FIELD_CONDITION, FIELD_DESCRIPTION, FIELD_END_DATE, FIELD_FREIGHT, FIELD_NAME, FIELD_START_DATE, LOCATION_ULAANBAATAR_LAT, LOCATION_ULAANBAATAR_LNG, RESPONSE_ERROR, RESPONSE_SUCCESS, URL_BACKEND_DOWNLOAD } from "../../../app/appConst";
import { BxButton, BxButtonType, BxDatePicker, BxImageUpload, BxInput, BxLoadingIndicator } from "../../../components";
import { BxCard } from "../../../components/bx/BxCard";
import { BxMessage, BxMessageType } from "../../../components/bx/BxMessage";
import { BxSelect } from "../../../components/bx/BxSelect";
import { auctionCreate, auctionCreateData, auctionDetail, auctionRemoveImage, auctionUpdateInfo, auctionUploadImage, getNewConditions } from "../../../service/auctionApiClient";
import { categoryList, factoryList, productList } from "../../../service/categoryApiClient";
import ErrorManager from "../../../utility/ErrorManager";
import StringUtility from "../../../utility/StringUtility";
import { IoMdAddCircle, IoMdRemoveCircle } from "react-icons/io"
import { AddConditionDialog } from "../../dialog/AddConditionDialog";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addConditionEvent, conditionState, insertCondition, removeConditionEvent, resetConditions } from "../../../redux/newAuction/conditionsSlice";
import { MapContainer, TileLayer, LayersControl, LayerGroup, Circle } from "react-leaflet";
import clsx from "clsx";
import { Checkbox, Divider, Toggle } from "react-daisyui";
import { FiatDto } from "../../../models/wallet/FiatListResponseDto";
import { walletListActiveFiat } from "../../../service/walletApiClient";
import 'leaflet/dist/leaflet.css';
import { useNavigate, useParams } from "react-router-dom";
import { AuctionDetailResponseDto } from "../../../models/auction/AuctionDetailResponseDto";
import { BxKeyboardType } from "../../../components/bx/BxInput";
import { NewCondition } from "../../../models/auction/ConditionListResponseDto";
import { userState } from "../../../redux/user/userSlice";
import { CategoryDialog } from "../../dialog/CategoryDialog";
import { AuctionLogisticsInfo } from "../../../models/auction/AuctionLogisticsInfo";
import { AuctionUpdateInfoRequestDto } from "../../../models/auction/AuctionUpdateInfoRequestDto";

interface NewAuctionsSectionProps {
  
}

interface NewAuctionFormState {
  isLoading?: boolean,
  formError?: string,
  inquireId?: string,
  auctionId?: number,
  name?: string,
  nameError?: string,
  desc?: string,
  descError?: string,
  startingAmount?: number,
  startingAmountError?: string,
  finalAmount?: number,
  finalAmountError?: string,
  startDate?: Date,
  startDateError?: string,
  endDate?: Date,
  endDateError?: string,
  selectedFiat?: string,
  selectedFiatError?: string,
  selectedCondition?: string,
  selectedConditionError?: string,
  category?: number[],
  categoryText?: string,
  categoryError?: string,
  factory?: number,
  factoryText?: string, 
  factoryError?: string,
  model?: number,
  modelText?: string,
  modelError?: string,
  logisticsInfo?: AuctionLogisticsInfo,
  whoPaysFee?: string,
  whoPaysFreeError?: string,
  agreeTerms?: boolean,
  agreeTermsError?: string,
  error?: string,
}

interface AuctionState {
  isLoading: boolean;
  error?: string;
  detail?: AuctionDetailResponseDto;
}

interface AuctionImageState {
  id: number,
  image: string,
}

const NewAuctionSection:FunctionComponent<NewAuctionsSectionProps> = (props:NewAuctionsSectionProps) => {

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { menu, auctionId } = useParams();
  const navigate = useNavigate();
  const user = useAppSelector(userState);

  const [feedback, setFeedback] = useState<string>();
  const [newAuction, setNewAuction] = useState<NewAuctionFormState>();
  const [isPrivate, setPrivate] = useState<boolean>(false);
  const [hasFinalPrice, setHasFinalPrice] = useState<boolean>(false);
  const [auction, setAuction] = useState<AuctionState>();
  const condition = useAppSelector(conditionState);

  const [isAddConditionDialogOpen, setAddConditionDialogOpen] = useState<boolean>(false);
  const [isCategoryDialogOpen, setCategoryDialogOpen] = useState<boolean>(false);
  const [isFactoryDialogOpen, setFactoryDialogOpen] = useState<boolean>(false);
  const [isProductDialogOpen, setProductDialogOpen] = useState<boolean>(false);

  const [fiats, setFiats] = useState({
    isLoading: false,
    error: '',
    fiats: Array<FiatDto>()
  });
  const [images, setImages] = useState({
    images: Array<AuctionImageState>(),
    isLoading: false,
    error: '',
  });
  const [newConditions, setNewConditions] = useState({
    conditions: Array<NewCondition>(),
    isLoading: false,
    error: '',
  });

  useEffect(() => { 
    dispatch(resetConditions({}));
    if(isEditOrElseNew()) {
      getAuctionDetail(Number.parseInt(auctionId ?? '0'));
    } else {
      createAuction(StringUtility.generateInquireId());
    }
  },[]);

  useEffect(() => {
    if(StringUtility.isValidText(newAuction?.inquireId)) {
      getFiats();
      getConditions();
    }
  }, [newAuction?.inquireId]);

  /* ============================================================================ */
  /* ============================================================================ */
  function isEditOrElseNew() {
    return menu === 'au' && auctionId !== undefined;
  }

  /* ============================================================================ */
  /* ============================================================================ */
  async function getAuctionDetail(id: number) {
    await getFiats();
    await getConditions();
    setAuction({ ...auction, isLoading: true });
    try {                                                     
      const response = await auctionDetail(id);
      if(response.status === RESPONSE_SUCCESS) {
        setAuction({ ...auction, isLoading: false, detail: response });
        document.title = auction?.detail?.auction.name ?? "";
        setAuctionData(response);
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

  // ================================================================== //
  function setAuctionData(response:AuctionDetailResponseDto) {
    if(response.auction.status === AUCTION_PENDING || response.auction.status === AUCTION_REVIEWED) {
      setFeedback(response.auction.feedback);

      setNewAuction({
        ...newAuction,
        inquireId: response.auction.inquire_id,
        auctionId: response.auction.auction_id,
        name: response.auction.name,
        desc: response.auction.description,
        startingAmount: response.auction.initial_price,
        finalAmount: response.auction.buy_it_now_price,
        selectedFiat: response.auction.fiat_code,
        selectedCondition: response.auction.condition.code,
        startDate: new Date(response.auction.start_date),
        endDate: new Date(response.auction.end_date),
        whoPaysFee: response.auction.who_pays_the_freight,
        categoryText: response.auction.categories.at(-1)?.name,
        category: response.auction.categories.map((item, index) => item.id),
        factoryText: response.auction.factory.name,
        factory: response.auction.factory.id,
        modelText: response.auction.product.name,
        model: response.auction.product.id,
        logisticsInfo: response.logistics_info,
        agreeTerms: true,
      });
      
      setHasFinalPrice(response.auction.has_buy_it_now);

      setImages({
        ...images,
        images: response.auction.images
        .sort((a,b) => {
          return a.arrangement - b.arrangement;
        })
        .map((img) => {
          return {id: img.id, image: `${URL_BACKEND_DOWNLOAD}/${img.image_md}`};
        }),
        isLoading: false,
      });
      
      response.auction.conditions.forEach((item, index) => {
        dispatch(insertCondition({
          id: item.id,
          value: item.value,
          label: item.name
        }));
      }); 
    }
  }

  // ================================================================== //
  async function updateAuction(requests:AuctionUpdateInfoRequestDto[]) {
    setNewAuction({...newAuction, isLoading: true});
    try {
      let error:string | undefined;
      let hasError:boolean = false;

      for await (const request of requests) {
        const response = await auctionUpdateInfo(request);
        if(response.status === RESPONSE_SUCCESS) {
          continue;
        } else if(response.status === RESPONSE_ERROR) {
          hasError = true;
          error = response.msg;
          break;
        }
      }
      
      if(hasError) {
        // TODO: POP ERROR!
        setNewAuction({...newAuction, isLoading: false, error: error});
      } else {
        // TODO: POP SUCCESS!
        setNewAuction({...newAuction, isLoading: false});
      }
    } catch(ex) {
      setNewAuction({...newAuction, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  // ================================================================== //
  function buildUpdateRequests() {
    const requests:AuctionUpdateInfoRequestDto[] = [];

    if(newAuction?.auctionId !== undefined) {
      if(auction?.detail?.auction.name !== newAuction?.name) {
        requests.push({
          auction_id: newAuction.auctionId,
          field: FIELD_NAME,
          value: newAuction?.name ?? '',
        })
      }

      if(auction?.detail?.auction.description !== newAuction?.desc) {
        requests.push({
          auction_id: newAuction.auctionId,
          field: FIELD_DESCRIPTION,
          value: newAuction?.desc ?? '',
        })
      }

      if(auction?.detail?.auction.condition.code !== newAuction?.selectedCondition) {
        requests.push({
          auction_id: newAuction.auctionId,
          field: FIELD_CONDITION,
          value: newAuction?.selectedCondition ?? '',
        })
      }

      // if(auction?.detail?.auction.condition.code !== newAuction?.selectedCondition) {
      //   requests.push({
      //     auction_id: newAuction.auctionId,
      //     field: FIELD_CONDITION,
      //     value: newAuction?.selectedCondition ?? '',
      //   })
      // }

      const startDate = StringUtility.getDateAsLocal(newAuction?.startDate);
      if(auction?.detail?.auction.start_date !== startDate) {
        requests.push({
          auction_id: newAuction.auctionId,
          field: FIELD_START_DATE,
          value: startDate,
        })
      }

      const endDate = StringUtility.getDateAsLocal(newAuction?.endDate);
      if(auction?.detail?.auction.end_date !== endDate) {
        requests.push({
          auction_id: newAuction.auctionId,
          field: FIELD_END_DATE,
          value: endDate,
        })
      }

      if(auction?.detail?.auction.has_buy_it_now !== hasFinalPrice) {
        if(hasFinalPrice) {
          requests.push({
            auction_id: newAuction.auctionId,
            field: FIELD_BUY_IT_NOW_PRICE,
            value: newAuction.finalAmount?.toString() ?? '',
          })
        } else {
          requests.push({
            auction_id: newAuction.auctionId,
            field: FIELD_BUY_IT_NOW_PRICE,
            value: '-1',
          })
        }
      } else {
        if(hasFinalPrice) {
          requests.push({
            auction_id: newAuction.auctionId,
            field: FIELD_BUY_IT_NOW_PRICE,
            value: newAuction.finalAmount?.toString() ?? '',
          })
        }
      }

      if(auction?.detail?.auction.product !== newAuction.model) {
        /// TODO: AuctionUpdateProductRequestDto
      }

      if(auction?.detail?.auction.who_pays_the_freight !== newAuction.whoPaysFee) {
        requests.push({
          auction_id: newAuction.auctionId,
          field: FIELD_FREIGHT,
          value: newAuction.whoPaysFee ?? '',
        })
      }

      return requests;
    }
    return [];
  }

  // ================================================================== //
  const handleUpload = (file:File | undefined | null, name:string) => {
    if(file !== undefined && file !== null) {
      uploadImage(file);
    }
  }

  // ================================================================== //
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewAuction({ ...newAuction, [event.target.name]: event.target.value });
  }

  // ================================================================== //
  const handleChangeArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewAuction({ ...newAuction, [event.target.name]: event.target.value });
  }

  // ================================================================== //
  async function uploadImage(file:File) {
    if(newAuction?.inquireId !== undefined) {
      setImages({...images, isLoading: true, error: ''});
      try {
        const response = await auctionUploadImage(newAuction?.inquireId ,file);
        if(response.status === RESPONSE_SUCCESS) {
          const buffer = images.images;
          buffer.push({
            id: response.id,
            image: URL.createObjectURL(file),
          });

          setImages({...images, images: buffer });
        } else if(response.status === RESPONSE_ERROR) {
          setImages({...images, isLoading: false, error: response.msg});
        }
      } catch(ex) {
        setImages({...images, isLoading: false, error: ErrorManager.handleRequestError(ex)});
      }
    }
  }

  // ================================================================== //
  async function removeImage(imageId:number) {
    if(newAuction?.auctionId !== undefined) {
      setImages({...images, isLoading: true, error: ''});
      try {
        const response = await auctionRemoveImage(newAuction.auctionId, imageId);
        if(response.status === RESPONSE_SUCCESS) {
          const buffer = images.images.filter(obj => obj.id !== imageId);
          setImages({...images, images: buffer });
        } else if(response.status === RESPONSE_ERROR) {
          setImages({...images, isLoading: false, error: response.msg});
        }
      } catch(ex) {
        setImages({...images, isLoading: false, error: ErrorManager.handleRequestError(ex)});
      }
    }
  }

  // ================================================================== //
  async function createAuction(inquireId:string) {
    setNewAuction({...newAuction, isLoading:true});
    try {
      const response = await auctionCreate({
        pin_code: '',
        inquire_id: inquireId,
      });
      
      if(response.status === RESPONSE_SUCCESS) {
        setNewAuction({...newAuction, 
          isLoading:false, 
          inquireId, auctionId: response.id,
          logisticsInfo: response.logistics_info,
        });
      } else {
        setNewAuction({...newAuction, isLoading:false, formError: response.msg});
      }
    } catch(ex) {
      setNewAuction({...newAuction, isLoading:false, formError: ErrorManager.handleRequestError(ex)});
    }
  }

  // ================================================================== //
  async function getFiats() { 
    setFiats({...fiats, isLoading: true, error: ''});
    try {
      const response = await walletListActiveFiat();
      if(response.status === RESPONSE_SUCCESS) {
        setFiats({...fiats, isLoading: false, fiats: response.fiats});
      } else {
        setFiats({...fiats, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setFiats({...fiats, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  // ================================================================== //
  async function getConditions() { 
    setNewConditions({...newConditions, isLoading: true, error: ''});
    try {
      const response = await getNewConditions();
      if(response.status === RESPONSE_SUCCESS) {
        setNewConditions({...newConditions, isLoading: false, conditions: response.conditions});
      } else {
        setNewConditions({...newConditions, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setNewConditions({...newConditions, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  // ================================================================== //
  async function createAuctionData() {
    if(newAuction !== undefined) {
      setNewAuction({...newAuction, isLoading:true});
      try {
        const response = await auctionCreateData({
          inquire_id: newAuction.inquireId ?? '',
          description: newAuction.desc ?? '',
          categories: newAuction.category ?? [],
          product_id: newAuction.model ?? 0,
          factory_id: newAuction.factory ?? 0,
          condition: newAuction.selectedCondition ?? '',
          name: newAuction.name ?? '',
          selling_details: {
            initial_price: newAuction.startingAmount ?? 0,
            start_date: StringUtility.getDateAsLocal(newAuction.startDate),
            end_date: StringUtility.getDateAsLocal(newAuction.endDate),
            has_buy_it_now: hasFinalPrice,
            buy_it_now_price: newAuction.finalAmount ?? 0,
            fiat_code: newAuction.selectedFiat ?? '',
          },
          freight_details: {
            who_pays_delivery: newAuction.whoPaysFee ?? '',
          },
        });
        if(response.status === RESPONSE_SUCCESS) {
          navigate(`/user/${user.info?.kyc.nickname}/createdAuctions`);
        } else {
          setNewAuction({...newAuction, isLoading:false, formError: response.msg});
        }
      } catch(ex) {
        setNewAuction({...newAuction, isLoading:false, formError: ErrorManager.handleRequestError(ex)});
      }
    }
  }

  // ================================================================== //
  function validateForm() {
    let hasError = false;
    let nameError = '';
    let descError = '';
    let startingAmountError = '';
    let finalAmountError = '';
    let startDateError = '';
    let endDateError = '';
    let categoryError = '';
    let factoryError = '';
    let productError = '';
    let fiatError = '';
    let imageError = '';
    let conditionError = '';
    let payFeeError = '';
    let termsError = '';

    if(!StringUtility.isValidText(newAuction?.name)) {
      hasError = true;
      nameError = t('error.errorField');
    }

    if(!StringUtility.isValidText(newAuction?.desc)) {
      hasError = true;
      descError = t('error.errorField');
    }

    if(StringUtility.isListEmpty(newAuction?.category ?? [])) {
      hasError = true;
      categoryError = t('error.errorSelect');
    }

    if(!StringUtility.isValidText(newAuction?.factory)) {
      hasError = true;
      factoryError = t('error.errorSelect');
    }

    if(!StringUtility.isValidText(newAuction?.model)) {
      hasError = true;
      productError = t('error.errorSelect');
    }

    if(!StringUtility.isValidText(newAuction?.startingAmount)) {
      hasError = true;
      startingAmountError = t('error.errorField');
    }

    if(hasFinalPrice) {
      if(!StringUtility.isValidText(newAuction?.finalAmount)) {
        hasError = true;
        finalAmountError = t('error.errorField');
      }
    }

    if(!StringUtility.isValidText(newAuction?.startDate)) {
      hasError = true;
      startDateError = t('error.errorField');
    }

    if(!StringUtility.isValidText(newAuction?.endDate)) {
      hasError = true;
      endDateError = t('error.errorField');
    }

    if(images.images.length < 0) {
      hasError = true;
      imageError = t('error.errorImage');
    }

    if(!StringUtility.isValidText(newAuction?.selectedCondition)) {
      hasError = true;
      conditionError = t('error.errorSelect');
    }

    if(!StringUtility.isValidText(newAuction?.selectedFiat)) {
      hasError = true;
      fiatError = t('error.errorSelect');
    }

    if(!StringUtility.isValidText(newAuction?.whoPaysFee)) {
      hasError = true;
      payFeeError = t('error.errorSelect');
    }

    if(!newAuction?.agreeTerms) {
      hasError = true;
      termsError = t('error.errorTerms');
    }

    setNewAuction({
      ...newAuction,
      nameError: nameError,
      descError: descError,
      startingAmountError: startingAmountError,
      finalAmountError: finalAmountError,
      startDateError: startDateError,
      endDateError: endDateError,
      selectedFiatError: fiatError,
      selectedConditionError: conditionError,
      whoPaysFreeError: payFeeError,
      categoryError: categoryError,
      factoryError: factoryError,
      modelError: productError,
      agreeTermsError: termsError
    });

    setImages({...images, error: imageError});

    return !hasError;
  }

  // ================================================================== //
  const TitleSection = ({title}:{title:string}) => {
    return <div>
      <h2 className="text-xl font-medium">
        {title}
      </h2>
    </div>
  }

  // ================================================================== //
  const FeedbackSection = (feedback:string | undefined) => {
    return <div>
      <BxMessage
        message={feedback}
        type={BxMessageType.warning}
      />
    </div>
  }

  // ================================================================== //
  const ErrorSection = () => {
    if(newAuction?.formError !== undefined) {
      return <div> 
        <BxMessage 
          message={newAuction?.formError} 
          type={BxMessageType.warning} 
        />
      </div>
    }
    return <></>
  }

  // ================================================================== //
  const NameSection = () => {
    return <div>
      <div className="form-control">
        <label className="label">
          <span>{t("label.name")}</span>
        </label>
        <BxInput 
          id='name' 
          key='name'
          name='name' 
          placeholder={t("label.name")}
          error={newAuction?.nameError}
          onChange={handleChange}
          value={newAuction?.name}
        />
      </div>
    </div>
  }

  // ================================================================== //
  const DescDesction = () => {
    return <div>
      <div className="form-control">
        <label className="label">
          <span>{t("label.desc")}</span>
        </label>
        <textarea 
          className="textarea textarea-primary" 
          placeholder={t("label.desc")}
          id='desc'
          name='desc'
          value={newAuction?.desc}
          onChange={handleChangeArea}
        >
        </textarea>
      </div>
    </div>
  }

  // ================================================================== //
  const ImageCard = () => {
    return <div className="grid gap-3">
      <div className="flex flex-wrap gap-3">
        {images.images.map((item, index) => {
          return <BxImageUpload 
            isLoading={images.isLoading} 
            image={item.image}
            onRemove={() => {
              removeImage(item.id);
            }} 
          />
        })}
        <BxImageUpload
          isLoading={images.isLoading}
          onUpload={handleUpload}
        />
      </div>
      <BxMessage
        type={BxMessageType.error}
        message={images.error}
      />
    </div>
  }

  // ================================================================== //
  const CategorySection = () => {
    return <div>
      <div className="form-control">
        <label className="label">
          <span>{t("label.category")}</span>
        </label>
        <div onClick={() => {setCategoryDialogOpen(true)}}>
          <BxInput
            id='category'
            name='category' 
            value={newAuction?.categoryText}
            error={newAuction?.categoryError}
            placeholder={t('label.choice')}
            readonly={true}
          />
        </div>
      </div>
      <CategoryDialog 
        isOpen={isCategoryDialogOpen}
        setIsOpen={setCategoryDialogOpen}
        type="category"
        onSelect={(ids, name) => {
          setNewAuction({...newAuction,
            category: ids,
            categoryText: name,
            factory: undefined,
            factoryText: undefined,
            model: undefined,
            modelText: undefined,
          });
        }}
      />
    </div>
  }

  // ================================================================== //
  const FactorySection = () => {
    return <div>
      <div className="form-control">
        <label className="label">
          <span>{t("label.factory")}</span>
        </label>
        <div onClick={() => {
          if(!StringUtility.isListEmpty(newAuction?.category ?? [])) {
            setFactoryDialogOpen(true);
          }
        }}>
          <BxInput
            id='factory'
            name='factory'
            value={newAuction?.factoryText}
            error={newAuction?.factoryError}
            placeholder={t('label.choice')}
            readonly={true}
          />
        </div>
      </div>
      <CategoryDialog 
        isOpen={isFactoryDialogOpen}
        setIsOpen={setFactoryDialogOpen}
        categoryId={newAuction?.category?.at(-1)}
        type="factory"
        onSelect={(ids, name) => {
          setNewAuction({...newAuction,
            factory: ids[0],
            factoryText: name,
            model: undefined,
            modelText: undefined,
          });
        }}
      />
    </div>
  }

  // ================================================================== //
  const ProductSection = () => {
    return <div>
      <div className="form-control">
        <label className="label">
          <span>{t("label.product")}</span>
        </label>
        <div onClick={() => {
          if(StringUtility.isValidText(newAuction?.factory)) {
            setProductDialogOpen(true);
          }
        }}>
          <BxInput
            id='model'
            name='model'
            value={newAuction?.modelText}
            error={newAuction?.modelError}
            placeholder={t('label.choice')}
            readonly={true}
          />
        </div>
      </div>
      <CategoryDialog 
        isOpen={isProductDialogOpen}
        setIsOpen={setProductDialogOpen}
        factoryId={newAuction?.factory}
        categoryId={newAuction?.category?.at(-1)}
        type="product"
        onSelect={(ids, name) => {
          setNewAuction({...newAuction,
            model: ids[0],
            modelText: name
          });
        }}
      />
    </div>
  }

  // ================================================================== //
  const SelectFiat = () => {
    return <div>
      <div className="form-control">
        <label className="label">
          <span>{t("label.fiat")}</span>
        </label>
        <BxSelect
          id='fiat'
          name='fiat'
          selectedValue={newAuction?.selectedFiat}
          error={newAuction?.selectedFiatError}
          isLoading={fiats.isLoading}
          onChange={(event) => {
            setNewAuction({...newAuction, selectedFiat: event.target.value});
          }}
          data={new Map<string, string>(
            fiats.fiats.map((item, index) => {
              return [item.code, item.name];
            })
          )}
        />
      </div>
    </div>
  }

  // ================================================================== //
  const SelectNewConditions = () => {
    return <div>
      <div className="form-control">
        <label className="label">
          <span>{t("label.condition")}</span>
        </label>
        <BxSelect
          id='newConditions'
          name='newConditions'
          selectedValue={newAuction?.selectedCondition}
          error={newAuction?.selectedConditionError}
          isLoading={newConditions.isLoading}
          onChange={(event) => {
            setNewAuction({...newAuction, selectedCondition: event.target.value});
          }}
          data={new Map<string, string>(
            newConditions.conditions.map((item, index) => {
              return [item.code, item.name];
            })
          )}
        />
      </div>
    </div>
  }

  // ================================================================== //
  const StartFinalAmount = () => {
    return <div className={clsx('grid gap-4', hasFinalPrice && 'grid-cols-2')}>
      <div className="form-control">
        <label className="label">
          <span>{t("label.startingAmount")}</span>
        </label>
        <BxInput 
          id='startingAmount' 
          key='startingAmount'
          name='startingAmount'
          error={newAuction?.startingAmountError}
          inputType={BxKeyboardType.currency}
          placeholder={t("label.startingAmount")}
          onChange={handleChange}
          value={newAuction?.startingAmount?.toString()}
        />
      </div>
      {hasFinalPrice 
      ? <div className="form-control">
          <label className="label">
            <span>{t("label.finalAmount")}</span>
          </label>
          <BxInput 
            id='finalAmount' 
            key='finalAmount'
            name='finalAmount' 
            error={newAuction?.finalAmountError}
            inputType={BxKeyboardType.currency}
            placeholder={t("label.finalAmount")}
            onChange={handleChange}
            value={newAuction?.finalAmount?.toString()}
          />
        </div> 
      : <></>}
    </div>
  }

  // ================================================================== //
  const StartEndDate = () => {
    return <div className="grid gap-4 grid-cols-2">
      <div className="form-control">
        <label className="label">
          <span>{t("label.startDate")}</span>
        </label>
        <BxDatePicker
          name="startDate"
          error={newAuction?.startDateError}
          onChange={(date) => {
            setNewAuction({...newAuction, startDate: date});
          }}
          value={newAuction?.startDate}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span>{t("label.endDate")}</span>
        </label>
        <BxDatePicker
          name="endDate"
          error={newAuction?.endDateError}
          onChange={(date) => {
            setNewAuction({...newAuction, endDate: date});
          }}
          value={newAuction?.endDate}
        />
      </div>
    </div>
  }

  // ================================================================== //
  const LogisticPay = () => {
    return <div>
      <div className="form-control">
        <p>{newAuction?.logisticsInfo?.delivery_section.warning}</p>
        <label className="label">
          <span>{t("label.whoPaysTheFee")}</span>
        </label>
        <BxSelect
          id='whoPaysFee'
          name='whoPaysFee'
          selectedValue={newAuction?.whoPaysFee}
          error={newAuction?.whoPaysFreeError}
          isLoading={fiats.isLoading}
          onChange={(event) => {
            setNewAuction({...newAuction, whoPaysFee: event.target.value});
          }}
          data={new Map<string, string>(
            newAuction?.logisticsInfo?.delivery_section.who_pays_the_fee.map((item, index) => {
              return [item.code, item.text];
            })
          )}
        />

      </div>
    </div>
  }

  // ================================================================== //
  const SwitchPrivate = () => {
    return (
      <div className="flex place-content-between">
        <span className="self-start text-lg">{t('label.isPrivate')}</span>
        <Toggle className="self-end" size="lg" color="primary" 
          onClick={() => {
            setPrivate(!isPrivate);
          }}
          defaultChecked={isPrivate}
        />
      </div>
    );
  }

  // ================================================================== //
  const SwitchHasFinalPrice = () => {
    return (
      <div className="flex place-content-between">
        <span className="self-start text-lg">{t('label.hasFinalAmount')}</span>
        <Toggle className="self-end" size="lg" color="primary" 
          onClick={() => {
            setHasFinalPrice(!hasFinalPrice);
          }}
          defaultChecked={hasFinalPrice}
        />
      </div>
    );
  }

  // ================================================================== //
  const ConditionSection = () => {
    return <div>
      <div className="grid grid-cols-2 gap-3">
        {condition.conditions.map((item, index) => {
          return <Condition id={item.id} value={item.value} label={item.label}/>
        })}
        <div className="col-span-2">
          <BxButton 
            className="w-full btn-sm text-xs text-primary" 
            type={BxButtonType.bordered} 
            isLoading={condition.isLoading}
            onClick={() => {
              setAddConditionDialogOpen(true);
            }}
          >
            <IoMdAddCircle size={20} className="mr-1"/> {t('action.addCondition')}
          </BxButton>
        </div> 
      </div>
      <AddConditionDialog auctionId={newAuction?.auctionId} isOpen={isAddConditionDialogOpen} setIsOpen={setAddConditionDialogOpen} />
    </div>
  }

  // ================================================================== //
  const Condition = ({id, value, label}:{id:number, value:string, label:string}) => {
    return <div className="relative">
      <div className="border-solid border-[#efeff4] bg-[#f9f9f9] border rounded-lg flex flex-col justify-center items-center py-1">
        <div className="text-sm text-[#8a8a8f]">{label}</div>
        <div className="">{value}</div>
      </div>
      <div className="absolute" style={{top:"4px", right: "4px"}}>
        <IoMdRemoveCircle 
          size={20} 
          className="text-error" 
          onClick={() => {
            dispatch(removeConditionEvent({auctionId: newAuction?.auctionId ?? 0, conditionId: id}));
          }} 
        />
      </div>
    </div>
  }

  // ================================================================== //
  const LeafletMap = () => {
    const center = {
      lat:LOCATION_ULAANBAATAR_LAT,  
      lng:LOCATION_ULAANBAATAR_LNG
    }

    return (
      <div className="">
        <MapContainer className="rounded-lg h-[500px]" center={center} zoom={11} scrollWheelZoom={false}>
          <TileLayer 
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LayersControl position="topright">
            <LayersControl.Overlay checked name={t('label.region')}>
              <LayerGroup>
                {newAuction?.logisticsInfo?.delivery_section.areas.map((item, index) => {
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
                  >
                  </Circle>
                })}
              </LayerGroup>
            </LayersControl.Overlay>
          </LayersControl>
        </MapContainer>
      </div>
    );
  }

  // ================================================================== //
  const TermsAndCondition = () => {
    return (
      <div>
        <div className="flex flex-row gap-3">
          <Checkbox 
            size="md" 
            color="primary" 
            indeterminate={newAuction?.agreeTerms}
            onChange={(event) => {
              setNewAuction({
                ...newAuction,
                agreeTerms: event.target.value === 'on'
              });
            }}
          />
          <p>
            {t('description.termsAndConditionAgree')}
          </p>
        </div>
        <BxMessage
          type={BxMessageType.error}
          message={newAuction?.agreeTermsError}
        />
      </div>
    );
  }

  // ================================================================== //
  const ActionButton = () => {
    return (
      <div>
        <BxButton 
          type={BxButtonType.gradient} 
          className="w-full"
          isLoading={newAuction?.isLoading}
          onClick={() => {
            if(validateForm()) {
              if(isEditOrElseNew()) {
                updateAuction(buildUpdateRequests());
              } else {
                createAuctionData();
              }
            }
          }}
        >
          {t('action.ok')}
        </BxButton>
      </div>
    )
  }
  
  // ================================================================== //
  return (
    <div className="w-96 md:mx-10">
      <div className="place-self-center md:w-[450px] lg:w-[700px]"> 
        {ErrorSection()}
        <form>
          {FeedbackSection(feedback)}
          <div className="mb-3"/>
          {ImageCard()}
          <div className="mb-3"/>
          {NameSection()}
          <div className="mb-3"/>
          {DescDesction()}
          <div className="mb-3"/>
          {CategorySection()}
          <div className="mb-3"/>
          {FactorySection()}
          <div className="mb-3"/>
          {ProductSection()}
          <div className="mb-3"/>
          <TitleSection title={t('label.condition')}/>
          <div className="mb-3"/>
          {ConditionSection()}
          <div className="mb-3"/>
          {SelectNewConditions()}
          <div className="mb-3"/>
          {SelectFiat()}
          <div className="mb-6"/>
          {SwitchPrivate()}
          <Divider/>
          {SwitchHasFinalPrice()}
          <div className="mb-3"/>
          {StartFinalAmount()}
          <div className="mb-3"/>
          {StartEndDate()}
          <div className="mb-3"/>
          <TitleSection title={t('label.freigth')}/>
          {LogisticPay()}
          <div className="mb-3"/>
          {LeafletMap()}
          <div className="mb-8"/>
          {TermsAndCondition()}
          <div className="mb-6"/>
          {ActionButton()}
          <div className="mb-6"/>
        </form>
        {/* <BxCard className="p-10" hasHover={false}>
          
        </BxCard> */}
      </div>
    </div>
  );
}

export default NewAuctionSection;