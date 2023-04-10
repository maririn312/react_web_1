
// URLS
export const URL_BACKEND_ROOT = `http://ns9.checkin.mn`;
export const URL_BACKEND_AUTH = `${URL_BACKEND_ROOT}/uaa/oauth/token`;
export const URL_BACKEND_REGISTER = `${URL_BACKEND_ROOT}/app/v1/user/register`;
export const URL_BACKEND_CONFIRM = `${URL_BACKEND_ROOT}/app/v1/user/register-confirm`;
export const URL_BACKEND_KYC = `${URL_BACKEND_ROOT}/app/v1/user/kyc`;
export const URL_BACKEND_UPDATE_BASIC_INFO = `${URL_BACKEND_ROOT}/app/v1/user/update-basic-info`;
export const URL_BACKEND_PROFILE_BY_NICKNAME = `${URL_BACKEND_ROOT}/app/v1/user/profile`;
export const URL_BACKEND_USER_UPDATE_DESC = `${URL_BACKEND_ROOT}/app/v1/user/update-description`;
export const URL_BACKEND_DOWNLOAD = `${URL_BACKEND_ROOT}/file/v1/d`;
export const URL_BACKEND_UPLOAD = `${URL_BACKEND_ROOT}/file/v1/upload`;
export const URL_BACKEND_USER_UPLOAD_ID_FRONT = `${URL_BACKEND_ROOT}/file/v1/user/upload-id-front`;
export const URL_BACKEND_USER_UPLOAD_ID_BACK = `${URL_BACKEND_ROOT}/file/v1/user/upload-id-back`;
export const URL_BACKEND_USER_UPLOAD_PROFILE = `${URL_BACKEND_ROOT}/file/v1/user/upload-profile-picture`;
export const URL_BACKEND_FEEDBACK = `${URL_BACKEND_ROOT}/feedback/v1/user/feedbacks`;
export const URL_BACKEND_WALLET_BANK_LIST = `${URL_BACKEND_ROOT}/wallet/v1/bank`;
export const URL_BACKEND_WALLET_ADD_ACCOUNT = `${URL_BACKEND_ROOT}/wallet/v1/account/add`;
export const URL_BACKEND_WALLET_MY_BANK_ACCOUNTS = `${URL_BACKEND_ROOT}/wallet/v1/account/mine`;
export const URL_BACKEND_WALLET_ACTIVE_FIAT_LIST = `${URL_BACKEND_ROOT}/wallet/v1/bank/fiat`;
export const URL_BACKEND_WALLET_MY_BALANCE = `${URL_BACKEND_ROOT}/wallet/v1/balance`;
export const URL_BACKEND_GIVE_FEEDBACK = `${URL_BACKEND_ROOT}/feedback/v1/user/give-feedback`;
export const URL_BACKEND_ALLOW_FEEDBACK = `${URL_BACKEND_ROOT}/feedback/v1/user/allow-feedback`;
export const URL_BACKEND_NOTIF_DETAIL = `${URL_BACKEND_ROOT}/notification/v1/device/notification`;
export const URL_BACKEND_NOTIF_LIST = `${URL_BACKEND_ROOT}/notification/v1/device/notifications`;
export const URL_BACKEND_NOTIF_DISCONNECT = `${URL_BACKEND_ROOT}/notification/v1/device/disconnect`;
export const URL_BACKEND_CATEGORY_LIST = `${URL_BACKEND_ROOT}/app/v1/e-commerce/category`;
export const URL_BACKEND_FACTORY_LIST = `${URL_BACKEND_ROOT}/app/v1/e-commerce/factory`;
export const URL_BACKEND_PRODUCT_LIST = `${URL_BACKEND_ROOT}/app/v1/e-commerce/product`;
export const URL_BACKEND_CONDITION_LIST = `${URL_BACKEND_ROOT}/auction/v1/conditions`;
export const URL_BACKEND_ASK_AUCTION_FEE = `${URL_BACKEND_ROOT}/auction/v1/ask-auction-fee`;
export const URL_BACKEND_CREATE_AUCTION = `${URL_BACKEND_ROOT}/auction/v1/create-auction`;
export const URL_BACKEND_CREATE_AUCTION_DATA = `${URL_BACKEND_ROOT}/auction/v1/create-auction-data`;
export const URL_BACKEND_AUCTION_UPLOAD_IMAGE = `${URL_BACKEND_ROOT}/file/v1/auction/upload-image`;
export const URL_BACKEND_AUCTION_SWITCH_IMAGE = `${URL_BACKEND_ROOT}/file/v1/auction/switch-images`;
export const URL_BACKEND_AUCTION_REMOVE_IMAGE = `${URL_BACKEND_ROOT}/file/v1/auction/remove-image`;
export const URL_BACKEND_AUCTION_ADD_CONDITION = `${URL_BACKEND_ROOT}/auction/v1/add-condition`;
export const URL_BACKEND_AUCTION_SWITCH_CONDITION = `${URL_BACKEND_ROOT}/auction/v1/switch-conditions`;
export const URL_BACKEND_AUCTION_REMOVE_CONDITION = `${URL_BACKEND_ROOT}/auction/v1/remove-condition`;
export const URL_BACKEND_AUCTION_MY_CREATED = `${URL_BACKEND_ROOT}/auction/v1/user/my-created`;
export const URL_BACKEND_AUCTION_MY_SUBSCRIBED = `${URL_BACKEND_ROOT}/auction/v1/user/my-subscribed`;
export const URL_BACKEND_AUCTION_MY_PARTICIPATING = `${URL_BACKEND_ROOT}/auction/v1/user/my-participating`;
export const URL_BACKEND_AUCTION_MY_WON = `${URL_BACKEND_ROOT}/auction/v1/user/my-won`;
export const URL_BACKEND_AUCTION_MY_DETAIL = `${URL_BACKEND_ROOT}/auction/v1/user/auction`;
export const URL_BACKEND_AUCTION_DETAIL = `${URL_BACKEND_ROOT}/auction/v1/an/auction-detail`;
export const URL_BACKEND_AUCTION_LIST_ACTIVE = `${URL_BACKEND_ROOT}/auction/v1/center-button`;
export const URL_BACKEND_AUCTION_BY_NICKNAME = `${URL_BACKEND_ROOT}/app/v1/user/auctions-by-nickname`;
export const URL_BACKEND_UPDATE_AUCTION_INFO = `${URL_BACKEND_ROOT}/auction/v1/update-auction-info`;
export const URL_BACKEND_CONFIRM_AUCTION = `${URL_BACKEND_ROOT}/auction/v1/create-auction-confirm`;
export const URL_BACKEND_SUBSCRIBE_AUCTION = `${URL_BACKEND_ROOT}/auction/v1/an/auction-subscription`;
export const URL_BACKEND_PROMOTED_AUCTION = `${URL_BACKEND_ROOT}/auction/v1/an/promoted-live`;
export const URL_BACKEND_INCREASE_DEPOSIT = `${URL_BACKEND_ROOT}/auction/v1/user/put-deposit`;
export const URL_BACKEND_FIAT_HISTORY = `${URL_BACKEND_ROOT}/wallet/v1/history`;
export const URL_BACKEND_WALLET_DEPOSIT = `${URL_BACKEND_ROOT}/wallet/v1/deposit`;
export const URL_BACKEND_WALLET_WITHDRAW = `${URL_BACKEND_ROOT}/wallet/v1/withdraw`;
export const URL_BACKEND_BID = `${URL_BACKEND_ROOT}/auction/v1/an/bid`;
export const URL_BACKEND_BID_ALLOWANCE = `${URL_BACKEND_ROOT}/auction/v1/an/allowance`;
export const URL_BACKEND_MY_HISTORY = `${URL_BACKEND_ROOT}/auction/v1/an/my-history`;
export const URL_BACKEND_AUCTION_CURRENT_STATUS = `${URL_BACKEND_ROOT}/auction/v1/an/auction-current-statistic`;
export const URL_BACKEND_POST_AUTH = `${URL_BACKEND_ROOT}/app/v1/user/post-authentication`;
export const URL_BACKEND_PROMOTED_SOON = `${URL_BACKEND_ROOT}/auction/v1/an/promoted-soon`;
export const URL_BACKEND_CATEGORY_PRODUCT_LIST = `${URL_BACKEND_ROOT}/auction/v1/product-list`;
export const URL_BACKEND_CATEGORY_AUCTION_LIST = `${URL_BACKEND_ROOT}/auction/v1/auction-list`;
export const URL_BACKEND_USER_CAN_FOLLOW = `${URL_BACKEND_ROOT}/feedback/v1/user/following/ask`;
export const URL_BACKEND_USER_FOLLOW = `${URL_BACKEND_ROOT}/feedback/v1/user/following`;
export const URL_BACKEND_MY_FOLLOWING = `${URL_BACKEND_ROOT}/feedback/v1/user/following/mine`;
export const URL_BACKEND_AUCTION_POLICY = `${URL_BACKEND_ROOT}/auction/v1/creation-policy`;
export const URL_BACKEND_PAY_INVOICE = `${URL_BACKEND_ROOT}/wallet/v1/invoice/pay`;
export const URL_BACKEND_SEND_FREIGHT_ADDR = `${URL_BACKEND_ROOT}/app/v1/freight/send-booking-address`;
export const URL_BACKEND_AUCTION_FREIGHT_STATUS = `${URL_BACKEND_ROOT}/app/v1/freight/status`;
export const URL_BACKEND_DRIVER_MY_FREIGHTS = `${URL_BACKEND_ROOT}/app/v1/driver/my-freights`;
export const URL_BACKEND_FREIGHT_CONFIRM = `${URL_BACKEND_ROOT}/app/v1/freight/confirm`;
export const URL_BACKEND_FREIGHT_IMG_UPLOAD = `${URL_BACKEND_ROOT}/file/v1/freight/upload-pickup-image`;

// AUTH
export const BASIC_USERNAME = 'app-service';
export const BASIC_PASSWORD = 'Dgfsd4s@ds';

// RESPONSE
export const RESPONSE_SUCCESS = 0;
export const RESPONSE_ERROR = 1;

// AUCTION STATUS
export const AUCTION_INITIATED = 0;
export const AUCTION_PENDING = 1;
export const AUCTION_REVIEWED = 2;
export const AUCTION_CONFIRMED = 3;
export const AUCTION_PAID = 4;
export const AUCTION_LIVE = 5;
export const AUCTION_FINISHED = 6;
export const AUCTION_BOOKED = 7;
export const AUCTION_SHIPPING = 8;
export const AUCTION_SHIPPED = 9;

// FREIGHT
export const FREIGHT_CURRENT = 'CURRENT';
export const FRIEGHT_OLD = 'OLD';

// FREIGHT STATUS
export const FREIGHT_STATUS_ADDRESS = 0;
export const FREIGHT_STATUS_PAYMENT = 1;
export const FREIGHT_STATUS_PICKUP = 2;
export const FREIGHT_STATUS_DELIVERY = 3;
export const FREIGHT_STATUS_DONE = 4;

// FREIGHT ACTION
export const FREIGHT_ACTION_DELIVERY = 'DELIVERY_CONFIRM';
export const FREIGHT_ACTION_PICKUP = 'PICKUP_CONFIRM';

// USER ACTION
export const USER_FOLLOW = 'FOLLOW';
export const USER_UNFOLLOW = 'UNFOLLOW';

// AUCTION UPDATE FIELDS
export const FIELD_NAME = 'NAME';
export const FIELD_DESCRIPTION = 'DESCRIPTION';
export const FIELD_CONDITION = 'CONDITION';
export const FIELD_INITIAL_PRICE = 'INITIAL_PRICE';
export const FIELD_START_DATE = 'START_DATE';
export const FIELD_END_DATE = 'END_DATE';
export const FIELD_BUY_IT_NOW_PRICE = 'BUY_IT_NOW_PRICE';
export const FIELD_PERMISSION = 'PERMISSION';
export const FIELD_PRODUCT = 'PRODUCT';
export const FIELD_FREIGHT = 'FREIGHT';

// MONGOL BANK CODE
export const BANK_MONGOLBANK = "010000";
export const BANK_KHAAN = "010000";
export const BANK_GOLOMT = "050000";
export const BANK_ANOD = "250000";
export const BANK_ARIG = "210000";
export const BANK_BOGD = "380000";
export const BANK_KHAS = "320000";
export const BANK_CHINGGIS = "330000";
export const BANK_TDB ="040000";
export const BANK_STATE = "340000";
export const BANK_NATIONAL_INVESTMENT = "290000";

// TRANSACTION TYPE
export const TRANSACTION_IN = 'IN';
export const TRANSACTION_OUT = 'OUT';

// LOGISTICS
export const LOCATION_ULAANBAATAR_LAT = 47.921230;
export const LOCATION_ULAANBAATAR_LNG = 106.918556;

// BID TYPE
export const BID_TYPE_BID = 'BID';
export const BID_TYPE_BUY = 'DIRECT_BUY';

// KYC STATUS
export const KYC_IMAGE_DEFAULT = 'DEFAULT';
export const KYC_IMAGE_CONFIRMED = 2;

// NOTIF STATUS
export const NOTIF_GENERAL = 'GENERAL';
export const NOTIF_AUCTION_DATA = 'NOTIFICATION_DATA_AUCTION_DETAIL';

// USER TYPE
export const USER_INDIVIDUAL = 'INDIVIDUAL';
export const USER_CORPORATE = 'CORPORATE';
export const USER_IMG_DEFAULT = 'DEFAULT';

// AUCTION TYPE
export const AUCTION_PRIVATE = 'PRIVATE';
export const AUCTION_PUBLIC = 'PUBLIC';

export const REFRESH_TOKEN_MAX_ITERATE = 5;