// BACKEND
// export const URL_BACKEND_ROOT = `https://ns6.checkin.mn`; // TEST
export const URL_BACKEND_ROOT = `https://ns1.checkin.mn`; // PROD

export const URL_BACKEND_AUTH = `${URL_BACKEND_ROOT}/uaa/oauth/token`;
export const URL_BACKEND_REGISTER = `${URL_BACKEND_ROOT}/app/v1/user/register`;
export const URL_BACKEND_CONFIRM = `${URL_BACKEND_ROOT}/app/v1/user/register-confirm`;
export const URL_BACKEND_GET_TAN = `${URL_BACKEND_ROOT}/app/v1/user/register-tan-again`;
export const URL_BACKEND_FORGOT = `${URL_BACKEND_ROOT}/app/v1/user/forgot-pwd`;
export const URL_BACKEND_ME = `${URL_BACKEND_ROOT}/app/v1/user/me`;
export const URL_BACKEND_PROFILE_BY_NICKNAME = `${URL_BACKEND_ROOT}/app/v1/user/profile`;
export const URL_IMG_ROOT = `${URL_BACKEND_ROOT}/file/v1/d/`;
export const URL_BACKEND_NFT_CATEGORIES = `${URL_BACKEND_ROOT}/app/v2/nft/public-categories`;
export const URL_BACKEND_NFT_LIST = `${URL_BACKEND_ROOT}/app/v2/nft/list`;
export const URL_BACKEND_GIFT_LIST = `${URL_BACKEND_ROOT}/app/v2/e-commerce/gift-cards`;
export const URL_BACKEND_GIFT_CARD_DETAIL = `${URL_BACKEND_ROOT}/app/v2/e-commerce/gift-card`;
export const URL_BACKEND_GIFT_SEND = `${URL_BACKEND_ROOT}T/app/v2/e-commerce/gift-cards/mine/send`;
export const URL_BACKEND_GIFT_USE = `${URL_BACKEND_ROOT}/app/v2/e-commerce/gift-cards/mine/use`;
export const URL_BACKEND_GIFT_USER = `${URL_BACKEND_ROOT}/app/v2/e-commerce/gift-cards/mine`;
export const URL_BACKEND_GIFT_PAYMENT_MINE = `${URL_BACKEND_ROOT}/app/v2/user/allowed-for-payment`;
export const URL_BACKEND_GIFT_RECEIVED = `${URL_BACKEND_ROOT}/app/v2/e-commerce/gift-cards/mine/received`;
export const URL_BACKEND_GIFT_CARD_INFO = `${URL_BACKEND_ROOT}/app/v2/e-commerce/gift-card-item'`;
export const URL_BACKEND_GIFT_BUY = `${URL_BACKEND_ROOT}/app/v2/e-commerce/request/buy-new`;
export const URL_BACKEND_NFT_CARD_DETAIL = `${URL_BACKEND_ROOT}/app/v2/nft`;
export const URL_BACKEND_NFT_MINE = `${URL_BACKEND_ROOT}/app/v2/nft/mine`;
export const URL_BACKEND_NFT_BUY = `${URL_BACKEND_ROOT}/blockchain/v1/erc20/nft/buy`;
export const URL_DAX_GRAPHQL = "https://api.dax.mn/v1/graphql";
export const URL_BACKEND_FIAT_MINE = `${URL_BACKEND_ROOT}/fiat/v1/balance/mine`;
export const URL_BACKEND_NFT_COLLECTION = `${URL_BACKEND_ROOT}/app/v2/nft/list-by-collection`;
export const URL_BACKEND_USER_UPDATE_PROFILE = `${URL_BACKEND_ROOT}/app/v2/user/update-nft-profile`;
export const URL_BACKEND_CREATOR_BY_NICKNAME = `${URL_BACKEND_ROOT}/app/v2/user/profile`;
export const URL_BACKEND_COLLECTED_BY_NICKNAME = `${URL_BACKEND_ROOT}/app/v2/nft/by-nickname`;
export const URL_BACKEND_CREATED_BY_NICKNAME = `${URL_BACKEND_ROOT}/app/v2/nft/list-by-creator`;
export const URL_BACKEND_CHANGE_USER_PASSWORD = `${URL_BACKEND_ROOT}/app/v1/user/change-pwd`;
export const URL_BACKEND_UPLOAD_PROFILE = `${URL_BACKEND_ROOT}/file/v1/user/upload-profile-photo`;
export const URL_BACKEND_UPLOAD_COVER = `${URL_BACKEND_ROOT}/file/v1/user/upload-cover-photo`;
export const URL_BACLEND_UPLOAD_KYC_SELFIE = `${URL_BACKEND_ROOT}/file/v1/user/upload-selfie-with-id`;
export const URL_BACLEND_UPLOAD_KYC_FRONT = `${URL_BACKEND_ROOT}/file/v1/user/upload-id-front`;
export const URL_BACLEND_UPLOAD_KYC_BACK = `${URL_BACKEND_ROOT}/file/v1/user/upload-id-back`;
export const URL_BACKEND_CHANGE_INFO = `${URL_BACKEND_ROOT}/app/v1/user/change-info`;
// WALLET
export const URL_BACKEND_WALLET_BANK_LIST = `${URL_BACKEND_ROOT}/app/v2/finance/banks`;
export const URL_BACKEND_BALANCE_HISTORY = `${URL_BACKEND_ROOT}/fiat/v1/balance/history`;
export const URL_BACKEND_WALLET_ADD_ACCOUNT = `${URL_BACKEND_ROOT}/app/v2/finance/account/add`;
export const URL_BACKEND_WALLET_MY_BANK_ACCOUNTS = `${URL_BACKEND_ROOT}/app/v2/finance/account/mine`;
export const URL_BACKEND_WALLET_ACTIVE_FIAT_LIST = `${URL_BACKEND_ROOT}/app/v2/finance/fiats`;
export const URL_BACKEND_REMOVE_BANK_ACCOUNT = `${URL_BACKEND_ROOT}/app/v2/finance/account/remove`;
export const URL_BACKEND_GIFT_CARDS_MINE = `${URL_BACKEND_ROOT}/app/v2/e-commerce/gift-cards/mine`;
export const URL_BACKEND_GET_BALANCE = `${URL_BACKEND_ROOT}/blockchain/v1/erc20/balance`;
export const URL_BACKEND_BALANCE_CHARGE = `${URL_BACKEND_ROOT}/fiat/v1/balance/charge`;
export const URL_BACKEND_BALANCE_DISCHARGE = `${URL_BACKEND_ROOT}/fiat/v1/balance/discharge`;
export const URL_BACKEND_TOKEN_TRANSFER = `${URL_BACKEND_ROOT}/blockchain/v1/erc20/transfer`;
export const URL_BACKEND_TOKEN_HISTORY = `${URL_BACKEND_ROOT}/blockchain/v1/erc20/transfers/URGX`;

// AUTH/
export const BASIC_USERNAME = "web";
export const BASIC_PASSWORD = "QwGg^u/'N9-fS!-M";

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
export const FREIGHT_CURRENT = "CURRENT";
export const FRIEGHT_OLD = "OLD";

// FREIGHT STATUS
export const FREIGHT_STATUS_ADDRESS = 0;
export const FREIGHT_STATUS_PAYMENT = 1;
export const FREIGHT_STATUS_PICKUP = 2;
export const FREIGHT_STATUS_DELIVERY = 3;
export const FREIGHT_STATUS_DONE = 4;

// FREIGHT ACTION
export const FREIGHT_ACTION_DELIVERY = "DELIVERY_CONFIRM";
export const FREIGHT_ACTION_PICKUP = "PICKUP_CONFIRM";

// USER ACTION
export const USER_FOLLOW = "FOLLOW";
export const USER_UNFOLLOW = "UNFOLLOW";

// AUCTION UPDATE FIELDS
export const FIELD_NAME = "NAME";
export const FIELD_DESCRIPTION = "DESCRIPTION";
export const FIELD_CONDITION = "CONDITION";
export const FIELD_INITIAL_PRICE = "INITIAL_PRICE";
export const FIELD_START_DATE = "START_DATE";
export const FIELD_END_DATE = "END_DATE";
export const FIELD_BUY_IT_NOW_PRICE = "BUY_IT_NOW_PRICE";
export const FIELD_PERMISSION = "PERMISSION";
export const FIELD_PRODUCT = "PRODUCT";
export const FIELD_FREIGHT = "FREIGHT";

// MONGOL BANK CODE
export const BANK_MONGOLBANK = "010000";
export const BANK_KHAAN = "010000";
export const BANK_GOLOMT = "050000";
export const BANK_ANOD = "250000";
export const BANK_ARIG = "210000";
export const BANK_BOGD = "380000";
export const BANK_KHAS = "320000";
export const BANK_CHINGGIS = "330000";
export const BANK_TDB = "040000";
export const BANK_STATE = "340000";
export const BANK_NATIONAL_INVESTMENT = "290000";

// LOGISTICS
export const LOCATION_ULAANBAATAR_LAT = 47.92123;
export const LOCATION_ULAANBAATAR_LNG = 106.918556;

// BID TYPE
export const BID_TYPE_BID = "BID";
export const BID_TYPE_BUY = "DIRECT_BUY";

// KYC STATUS
export const KYC_IMAGE_DEFAULT = "DEFAULT";
export const KYC_IMAGE_CONFIRMED = 2;

// NOTIF STATUS
export const NOTIF_GENERAL = "GENERAL";
export const NOTIF_AUCTION_DATA = "NOTIFICATION_DATA_AUCTION_DETAIL";

// USER TYPE
// export const USER_INDIVIDUAL = "INDIVIDUAL";
// export const USER_CORPORATE = "CORPORATE";
export const USER_IMG_DEFAULT = "DEFAULT";

// AUCTION TYPE
export const AUCTION_PRIVATE = "PRIVATE";
export const AUCTION_PUBLIC = "PUBLIC";

export const REFRESH_TOKEN_MAX_ITERATE = 5;

// PROD PORT = 80
