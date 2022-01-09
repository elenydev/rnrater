import { put, takeLatest, ForkEffect, select } from "redux-saga/effects";

import { ResponseStatus } from "../../../infrastructure/api/enums";
import { successToast, errorToast } from "../../../services/toast";

import * as CategoriesStoreActions from "./actions";

import {
  getCategoriesList,
  GetCategoriesListActionResult,
} from "../../../api/categories/get";
import { getPaging } from "./selectors";
import { Paging } from "../../../infrastructure/api/interfaces";

function* getCategoriesListCall() {
  const paging: Paging = yield select(getPaging);
  try {
    const response: GetCategoriesListActionResult = yield getCategoriesList(
      paging
    );

    if (response.responseStatus === ResponseStatus.Success) {
      yield put(CategoriesStoreActions.getCategoriesListSuccess(response));
      return successToast(response.message);
    }
    errorToast(response.message);
  } catch (error) {
    yield put(CategoriesStoreActions.getCategoriesListFailure());
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
}
