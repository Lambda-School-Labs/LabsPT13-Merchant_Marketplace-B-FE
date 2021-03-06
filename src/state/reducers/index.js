import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userInfo from './userInfo';
import products from './products';
import selectedProduct from './selectedProduct';
import carts from './carts';
import marketplaceSearch from './marketplaceSearch';
import sellerInfo from './sellerInfo';
import selectedSeller from './selectedSeller';
import sellerInventory from './sellerInventory';
import sellerReviews from './sellerReviews';
import wishlist from './wishlist';
import purchaseHistory from './purchaseHistory';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userInfo', 'selectedProduct', 'selectedSeller'],
};

const rootReducer = combineReducers({
  userInfo,
  products,
  selectedProduct,
  marketplaceSearch,
  selectedSeller,
  sellerInfo,
  sellerInventory,
  sellerReviews,
  carts,
  wishlist,
  purchaseHistory,
});

export default persistReducer(persistConfig, rootReducer);
