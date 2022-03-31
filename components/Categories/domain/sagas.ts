import { put, takeLatest, ForkEffect, select } from "redux-saga/effects";

import { ResponseStatus } from "../../../infrastructure/api/enums";
import { successToast, errorToast } from "../../../services/toast";
import { Action } from "redux-actions";

import * as CategoriesStoreActions from "./actions";
import {
  getCategoriesList,
  GetCategoriesListActionResult,
} from "../../../api/categories/get";
import { getPaging } from "./selectors";
import {
  BaseRequestResponse,
  Paging,
} from "../../../infrastructure/api/interfaces";
import { createCategory } from "../../../api/categories/post";
import { CreateCategoryParams } from "../../../api/categories/post/interfaces";

function* getCategoriesListCall() {
  const paging: Paging = yield select(getPaging);
  try {
    const response: GetCategoriesListActionResult = yield getCategoriesList(
      paging
    );

    if (response.responseStatus === ResponseStatus.Success) {
      yield put(CategoriesStoreActions.getCategoriesListSuccess(response));
    }
  } catch (error) {
    yield put(CategoriesStoreActions.getCategoriesListFailure());
    errorToast(error.message);
  }
}

function* createCategoryCall(action: Action<CreateCategoryParams>) {
  try {
    const response: BaseRequestResponse = yield createCategory(action.payload);

    if (response.responseStatus === ResponseStatus.Success) {
      yield put(CategoriesStoreActions.createCategorySuccess());
      return successToast(response.message);
    }

    errorToast(response.message);
  } catch (error) {
    yield put(CategoriesStoreActions.createCategoryFailure());
    errorToast(error.message);
  }
}

export default function* categoriesSagas(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(
    CategoriesStoreActions.getCategoriesListTrigger,
    getCategoriesListCall
  );
  yield takeLatest(
    CategoriesStoreActions.createCategoryTrigger,
    createCategoryCall
  );
}
