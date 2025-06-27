import { applyMiddleware, combineReducers, createStore } from "redux";

import createSagaMiddleware from "redux-saga";
import { productReducer } from "./reducers/productReducers";
import { rootSaga } from "./saga/productSaga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  products: productReducer,
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
