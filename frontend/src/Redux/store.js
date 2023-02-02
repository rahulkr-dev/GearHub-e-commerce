import { combineReducers, legacy_createStore,applyMiddleware,compose } from "redux";
import thunk from "redux-thunk";
import { authReducer } from './auth/auth.reducer';
import {adminProductReducer} from "./admin/product/product.reducer"
import { adminCustomerReducer } from './admin/customer/customer.reducer';
import { landingPageProduct } from './products/product.reducer';
import {cartReducer} from "./cart/cart.reducer"
import { orderReducer } from './order/order.reducer';

const rootReducer = combineReducers({
    auth:authReducer,
    admin:adminProductReducer,
    customer:adminCustomerReducer,
    product:landingPageProduct,
    cart:cartReducer,
    order:orderReducer
});

const createCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = legacy_createStore(rootReducer,createCompose(applyMiddleware(thunk)))