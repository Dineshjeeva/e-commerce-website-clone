import { FETCH_PRODUCTS, FETCH_PRODUCT_DETAIL } from "../../types/productTypes";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { fetchAllProducts, fetchProductById } from "../../api/productsApi"; // ✅ API abstraction
import { setProductDetail, setProducts } from "../actions/productActions";

function* fetchProductsSaga() {
  try {
    const products = yield call(fetchAllProducts);
    yield put(setProducts(products));
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
}

function* fetchProductDetailSaga(action) {
  try {
    const product = yield call(() => fetchProductById(action.id));
    yield put(setProductDetail(product));
  } catch (error) {
    console.error(`Failed to fetch product with id ${action.id}:`, error);
  }
}

export function* rootSaga() {
  yield all([
    takeEvery(FETCH_PRODUCTS, fetchProductsSaga),
    takeEvery(FETCH_PRODUCT_DETAIL, fetchProductDetailSaga),
  ]);
}
