import { BaseRequestResponse } from "../../../infrastructure/api/interfaces";
import { ForkEffect, put, select, takeLatest } from "redux-saga/effects";
import * as actions from "./actions";
import { errorToast, successToast } from "../../../services/toast";
import { Action } from "redux-actions";
import { ResponseStatus } from "../../../infrastructure/api/enums";
import FormManager from "../../../managers/FormManager/FormManager";
import { getFormManager } from "../../../managers/FormManager/selectors";
import { FormInstanceName } from "../../../managers/FormManager/enums";
import { createComment } from "../../../api/comments/post/createComment";
import { CreateCommentParams } from "../../../api/comments/intefaces";

function* createCommentCall(action: Action<CreateCommentParams>) {
  try {
    const response: BaseRequestResponse = yield createComment(action.payload);
    const formManager: FormManager = yield select(getFormManager);
    if (response.responseStatus === ResponseStatus.Success) {
      yield put(actions.postCommentSuccess());
      formManager.clearCurrentForm(FormInstanceName.CreateComment);
      return successToast(response.message);
    }

    errorToast(response.message);
  } catch (error) {
    yield put(actions.postCommentFailure());
    errorToast(error.message);
  }
}

export default function* commentSagas(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(actions.postCommentTrigger, createCommentCall);
}
