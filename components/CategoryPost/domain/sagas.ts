import {
  BaseRequestResponse,
  Paging
} from '../../../infrastructure/api/interfaces';
import { ForkEffect, put, select, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import { getCategoryPostsPaging } from './selectors';
import { errorToast, successToast } from '../../../services/toast';
import {
  getCategoryPostImage,
  GetCategoryPostImageResult,
  getCategoryPostItem,
  getCategoryPostItemsList,
  getCategoryPostsImages
} from '../../../api/categoryPost/get';
import {
  GetCategoryPostImageActionParams,
  GetCategoryPostParams,
  GetCategoryPostsImagesParams,
  GetCategoryPostsListParams
} from './interfaces';
import { Action } from 'redux-actions';
import {
  GetCategoryPostsListActionResult,
  GetCategoryPostActionResult
} from '../../../api/categoryPost/get/interfaces';
import { ResponseStatus } from '../../../infrastructure/api/enums';
import {
  CategoryPost,
  CategoryPostWithImage
} from '../../../infrastructure/models/CategoryPost';
import { PostCategoryPostParams } from 'api/categoryPost/post/interfaces';
import { createCategoryPost } from '../../../api/categoryPost/post';
import FormManager from '../../../managers/FormManager/FormManager';
import { getFormManager } from '../../../managers/FormManager/selectors';
import { FormInstanceName } from '../../../managers/FormManager/enums';

function * getCategoryPostsListCall (action: Action<GetCategoryPostsListParams>) {
  const paging: Paging = yield select(getCategoryPostsPaging);
  const { categoryId, controller } = action.payload;

  try {
    const response: GetCategoryPostsListActionResult =
      yield getCategoryPostItemsList({
        paging,
        categoryId,
        controller
      });

    if (response.responseStatus === ResponseStatus.Success) {
      yield put(actions.getCategoryPostsSuccess(response));

      yield put(
        actions.getCategoryPostsImagesTrigger({
          categoryPosts: response.results!,
          controller
        })
      );
    }
  } catch (error) {
    yield put(actions.getCategoryPostsFailure());
    errorToast(error.message);
  }
}

function * getCategoryPostCall (action: Action<GetCategoryPostParams>) {
  const { categoryPostId, controller } = action.payload;
  try {
    const response: GetCategoryPostActionResult = yield getCategoryPostItem({
      categoryPostId,
      controller
    });

    if (response.responseStatus === ResponseStatus.Success) {
      yield put(actions.getCategoryPostSuccess(response.result!));
    }
  } catch (error) {
    yield put(actions.getCategoryPostFailure());
    errorToast(error.message);
  }
}

function * getCategoryPostImageCall (action: Action<GetCategoryPostImageActionParams>) {
  const { categoryPost, controller } = action.payload;
  try {
    const response: GetCategoryPostImageResult = yield getCategoryPostImage({
      categoryPostId: categoryPost.id,
      controller
    });

    if (response.responseStatus === ResponseStatus.Success) {
      yield put(
        actions.getCategoryPostImageSuccess({
          ...categoryPost,
          image: response.result!
        })
      );
    }
  } catch (error) {
    yield put(actions.getCategoryPostImageFailure());
    errorToast(error.message);
  }
}

function * getCategoryPostsImagesCall (
  action: Action<GetCategoryPostsImagesParams>
) {
  const { categoryPosts, controller } = action.payload;
  try {
    const response: GetCategoryPostImageResult[] = yield getCategoryPostsImages(
      { categoryPosts, controller }
    );

    if (
      response.every((item) => item.responseStatus === ResponseStatus.Success)
    ) {
      const categoryPostsWithImages: CategoryPostWithImage[] =
        categoryPosts.map((el, index) => ({
          ...el,
          image: response[index].result as Blob
        }));

      yield put(actions.getCategoryPostsImagesSuccess(categoryPostsWithImages));

      return;
    }

    errorToast('Failed to load images for category posts');
  } catch (error) {
    yield put(actions.getCategoryPostsImagesFailure());
    errorToast(error.message);
  }
}

function * createCategoryPostCall (action: Action<PostCategoryPostParams>) {
  try {
    const response: BaseRequestResponse = yield createCategoryPost(
      action.payload
    );
    const formManager: FormManager = yield select(getFormManager);
    if (response.responseStatus === ResponseStatus.Success) {
      yield put(actions.postCategoryPostSuccess());
      formManager.clearCurrentForm(FormInstanceName.CreateCategoryPost);
      return successToast(response.message);
    }

    errorToast(response.message);
  } catch (error) {
    yield put(actions.postCategoryPostFailure());
    errorToast(error.message);
  }
}

export default function * categoryPostsSagas (): Generator<
ForkEffect<never>,
void,
unknown
> {
  yield takeLatest(actions.getCategoryPostsTrigger, getCategoryPostsListCall);
  yield takeLatest(
    actions.getCategoryPostsImagesTrigger,
    getCategoryPostsImagesCall
  );
  yield takeLatest(actions.postCategoryPostTrigger, createCategoryPostCall);
  yield takeLatest(actions.getCategoryPostTrigger, getCategoryPostCall);
  yield takeLatest(
    actions.getCategoryPostImageTrigger,
    getCategoryPostImageCall
  );
}
