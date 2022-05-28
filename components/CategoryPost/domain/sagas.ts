import { Paging } from "../../../infrastructure/api/interfaces";
import { ForkEffect, put, select, takeLatest } from "redux-saga/effects";
import * as actions from "./actions";
import { getCategoryPostsPaging } from "./selectors";
import { errorToast } from "../../../services/toast";
import { getCategoryPostItemsList } from "../../../api/CategoryPost/get";
import { GetCategoryPostsListParams } from "./interfaces";
import { Action } from "redux-actions";
import { GetCategoryPostsListActionResult } from "../../../api/categoryPost/get/interfaces";
import { ResponseStatus } from "../../../infrastructure/api/enums";

function* getCategoryPostsList(action: Action<GetCategoryPostsListParams>) {
  const paging: Paging = yield select(getCategoryPostsPaging);
  const { categoryId } = action.payload;

  try {
    const response: GetCategoryPostsListActionResult =
      yield getCategoryPostItemsList({
        paging,
        categoryId,
      });


    if(response.responseStatus === ResponseStatus.Success) {
      yield put(actions.getCategoryPostsSuccess(response));

      yield put()

    }
  } catch (error) {
    yield put(actions.getCategoryPostsFailure());
    errorToast(error.message);
  }
}

export default function* categoryPostsSagas(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(actions.getCategoryPostsTrigger, getCategoryPostsList);
}
