import { put, takeLatest, ForkEffect, select } from "redux-saga/effects";
import { setSecureItem } from "../../../services/secureStore/index";
import FormManager from "managers/FormManager/FormManager";
import { getFormManager } from "../../../managers/FormManager/selectors";

import { ResponseStatus } from "../../../infrastructure/api/enums";
import { successToast, errorToast } from "../../../services/toast";
import {
  postAuthenticateUser,
  PostAuthenticateUserResult,
} from "../../../api/auth/postAuthenticateUser";
import { AuthenticateUserParams } from "../../../api/auth/interfaces";
import { postCreateUser } from "../../../api/auth/postCreateUser";
import { CreateUserParams } from "../../../api/auth/interfaces";

import { Action } from "redux-actions";
import * as UserStoreActions from "./actions";

import { PostItemActionResult } from "../../../factories/interfaces/post";
import { BaseRequestResponse } from "../../../infrastructure/api/interfaces";
import { SecureKeys } from "../../../infrastructure/secure/enums";
import { FormInstanceName } from "../../../managers/FormManager/enums";

function* authenticateUser(action: Action<AuthenticateUserParams>) {
  const user = action.payload;
  const formManager: FormManager = yield select(getFormManager);
  try {
    const response: PostItemActionResult<PostAuthenticateUserResult> =
      yield postAuthenticateUser(user);
    if (response.responseStatus === ResponseStatus.Success) {
      yield put(UserStoreActions.authenticateUserSuccess(response.result.user));
      setSecureItem(SecureKeys.Token, response.result?.accessToken);
      setSecureItem(SecureKeys.Email, response.result.user.email);
      setSecureItem(SecureKeys.UserId, response.result.user.userId);
      formManager.clearCurrentForm(FormInstanceName.AuthorizeUser);
      successToast(response.message);
      // return Router.replace(ROUTES.USER.HOME);
    }
    errorToast(response.message);
  } catch (errorMessage) {
    yield put(UserStoreActions.authenticateUserFailure());
    errorToast(errorMessage);
  }
}

function* createUser(action: Action<CreateUserParams>) {
  const user = action.payload;
  const formManager: FormManager = yield select(getFormManager);
  try {
    const response: BaseRequestResponse = yield postCreateUser(user);
    if (response.responseStatus === ResponseStatus.Success) {
      successToast(response.message);
      formManager.clearCurrentForm(FormInstanceName.CreateUser);
      yield put(UserStoreActions.createUserSuccess);
      // return Router.replace(ROUTES.AUTH.SIGN_IN);
    }
    errorToast(response.message);
  } catch (errorMessage) {
    yield put(UserStoreActions.createUserFailure());
    errorToast(errorMessage);
  }
}

export default function* userSagas(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(UserStoreActions.authenticateUserTrigger, authenticateUser);
  yield takeLatest(UserStoreActions.createUserTrigger, createUser);
}
