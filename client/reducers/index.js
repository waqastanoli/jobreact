import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import profileReducer from "./profileReducer";
import cartReducer from "./cartReducer";
import checkoutReducer from "./checkoutReducer";
import userReducer from "./userReducer";
import authReducer from "./authReducer";
import topicReducer from "./topicReducer";
import productDetailReducer from "./productDetailReducer";
import positionsReducer from "./positionsReducer";
const rootReducer = history =>
  combineReducers({
    // profile: profileReducer,
    // cartItems: cartReducer,
    // checkout: checkoutReducer,
    // account: userReducer,
    // auth: authReducer,
    // productDetail: productDetailReducer,
    // topic: topicReducer,
    positions: positionsReducer,
    router: connectRouter(history)
  });

export default rootReducer;
