import {
  BaseRequestResponse,
  Paging,
} from "../../../infrastructure/api/interfaces";
import { ForkEffect, put, select, takeLatest } from "redux-saga/effects";
import * as actions from "./actions";
import { getCategoryPostsPaging } from "./selectors";
import { errorToast, successToast } from "../../../services/toast";
import {
  GetCategoryPostImageResult,
  getCategoryPostItemsList,
  getCategoryPostsImages,
} from "../../../api/categoryPost/get";
import {
  GetCategoryPostsImagesParams,
  GetCategoryPostsListParams,
} from "./interfaces";
import { Action } from "redux-actions";
import { GetCategoryPostsListActionResult } from "../../../api/categoryPost/get/interfaces";
import { ResponseStatus } from "../../../infrastructure/api/enums";
import { CategoryPostWithImage } from "../../../infrastructure/models/CategoryPost";
import { PostCategoryPostParams } from "api/categoryPost/post/interfaces";
import { createCategoryPost } from "../../../api/categoryPost/post";
import FormManager from "../../../managers/FormManager/FormManager";
import { getFormManager } from "../../../managers/FormManager/selectors";
import { FormInstanceName } from "../../../managers/FormManager/enums";

function* getCategoryPostsList(action: Action<GetCategoryPostsListParams>) {
  const paging: Paging = yield select(getCategoryPostsPaging);
  const { categoryId } = action.payload;

  try {
    const response: GetCategoryPostsListActionResult =
      yield getCategoryPostItemsList({
        paging,
        categoryId,
      });

    if (response.responseStatus === ResponseStatus.Success) {
      yield put(actions.getCategoryPostsSuccess(response));

      yield put(
        actions.getCategoryPostsImagesTrigger({
          categoryPosts: response.results!,
        })
      );
    }
  } catch (error) {
    yield put(actions.getCategoryPostsFailure());
    errorToast(error.message);
  }
}

function* getCategoryPostsImagesCall(
  action: Action<GetCategoryPostsImagesParams>
) {
  const { categoryPosts } = action.payload;
  try {
    const response: GetCategoryPostImageResult[] = yield getCategoryPostsImages(
      { categoryPosts }
    );

    if (
      response.every((item) => item.responseStatus === ResponseStatus.Success)
    ) {
      const categoryPostsWithImages: CategoryPostWithImage[] =
        categoryPosts.map((el, index) => ({
          ...el,
          image: response[index].result as Blob,
        }));

      yield put(actions.getCategoryPostsImagesSuccess(categoryPostsWithImages));

      return;
    }

    errorToast("Failed to load images for category posts");
  } catch (error) {
    yield put(actions.getCategoryPostsImagesFailure());
    errorToast(error);
  }
}

function* createCategoryPostCall(action: Action<PostCategoryPostParams>) {
  try {
    const response: BaseRequestResponse = yield createCategoryPost(
      action.payload
    );
    const formManager: FormManager = yield select(getFormManager);
    if (response.responseStatus === ResponseStatus.Success) {
      yield put(actions.postCategoryPostSuccess);
      formManager.clearCurrentForm(FormInstanceName.CreateCategory);
      return successToast(response.message);
    }

    errorToast(response.message);
  } catch (error) {
    yield put(actions.postCategoryPostFailure());
    errorToast(error);
  }
}

export default function* categoryPostsSagas(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(actions.getCategoryPostsTrigger, getCategoryPostsList);
  yield takeLatest(
    actions.getCategoryPostsImagesTrigger,
    getCategoryPostsImagesCall
  );
  yield takeLatest(actions.postCategoryPostTrigger, createCategoryPostCall);
}
