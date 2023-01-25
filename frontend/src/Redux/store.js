import { combineReducers, legacy_createStore,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { authReducer } from './auth/auth.reducer';
import {adminProductReducer} from "./admin/product/product.reducer"
import { adminCustomerReducer } from './admin/customer/customer.reducer';

const rootReducer = combineReducers({
    auth:authReducer,
    admin:adminProductReducer,
    customer:adminCustomerReducer
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))