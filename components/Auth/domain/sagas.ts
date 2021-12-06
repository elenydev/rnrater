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
import {
  getUserAvatar as getUserAvatarCall,
  GetUserAvatarActionResult,
} from "../../../api/user/get/userAvatar";
import { AuthenticateUserParams } from "../../../api/auth/interfaces";
import { GetUserAvatarParams } from "../../../api/user/get/intefaces";
import { postCreateUser } from "../../../api/auth/postCreateUser";
import { CreateUserParams } from "../../../api/auth/interfaces";

import { Action } from "redux-actions";
import * as UserStoreActions from "./actions";

import { PostItemActionResult } from "../../../factories/interfaces/post";
import { BaseRequestResponse } from "../../../infrastructure/api/interfaces";
import { SecureKeys } from "../../../infrastructure/secure/enums";
import { FormInstanceName } from "../../../managers/FormManager/enums";

import { getHistoryManager } from "../../../managers/HistoryManager/selectors";
import {
  AuthStackRoutes,
  RootScreenTabs,
  RootStackRoutes,
} from "../../../infrastructure/router/enums";
import HistoryManager from "../../../managers/HistoryManager/HistoryManager";

function* authenticateUser(action: Action<AuthenticateUserParams>) {
  const user = action.payload;
  const formManager: FormManager = yield select(getFormManager);
  const historyManager: HistoryManager = yield select(getHistoryManager);
  try {
    const response: PostItemActionResult<PostAuthenticateUserResult> =
      yield postAuthenticateUser(user);

    if (response.responseStatus === ResponseStatus.Success) {
      yield put(UserStoreActions.authenticateUserSuccess(response.result.user));
      setSecureItem(SecureKeys.Token, response.result?.accessToken);
      setSecureItem(SecureKeys.Email, response.result.user.email);
      setSecureItem(SecureKeys.UserId, response.result.user.userId);
      formManager.clearCurrentForm(FormInstanceName.AuthorizeUser);
      yield put(
        UserStoreActions.getUserAvatarTrigger({
          userId: response.result.user.userId,
        })
      );

      historyManager.navigateNestedRoute(
        RootStackRoutes.Root,
        RootScreenTabs.Categories
      );
      return successToast(response.message);
    }
    errorToast(response.message);
  } catch (error) {
    yield put(UserStoreActions.authenticateUserFailure());
    errorToast(error.message);
  }
}

function* createUser(action: Action<CreateUserParams>) {
  const user = action.payload;
  const formManager: FormManager = yield select(getFormManager);
  const historyManager: HistoryManager = yield select(getHistoryManager);
  try {
    const response: BaseRequestResponse = yield postCreateUser(user);
    if (response.responseStatus === ResponseStatus.Success) {
      formManager.clearCurrentForm(FormInstanceName.CreateUser);
      yield put(UserStoreActions.createUserSuccess());
      historyManager.navigate(AuthStackRoutes.SignIn);

      return successToast(response.message);
    }
    errorToast(response.message);
  } catch (error) {
    yield put(UserStoreActions.createUserFailure());
    errorToast(error.message);
  }
}

function* getUserAvatar(action: Action<GetUserAvatarParams>) {
  const userId = action.payload;
  try {
    const response: GetUserAvatarActionResult = yield getUserAvatarCall(userId);
    if (response.responseStatus === ResponseStatus.Success) {
    }
  } catch (error) {
    yield put(UserStoreActions.getUserAvatarFailure());
    errorToast(error.message);
  }
}

export default function* userSagas(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(UserStoreActions.authenticateUserTrigger, authenticateUser);
  yield takeLatest(UserStoreActions.createUserTrigger, createUser);
  yield takeLatest(UserStoreActions.getUserAvatarTrigger, getUserAvatar);
}
