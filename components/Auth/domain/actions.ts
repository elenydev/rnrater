import { createAction } from "@reduxjs/toolkit";
import {
  GetCurrentUser,
  UserCredentials,
} from "infrastructure/interfaces/User/user";
import { createActionWithPayload } from "../../../utils/redux/actions";
import { CreateUserParams } from "../../../api/auth/interfaces";
import { User } from "../../../infrastructure/models/User";
import { AuthenticateUserParams } from "../../../api/auth/interfaces";

export enum UserStoreActions {
  AuthenticateUserTrigger = "userStore/authenticateUserTrigger",
  AuthenticateUserSuccess = "userStore/authenticateUserSuccess",
  AuthenticateUserFailure = "userStore/authenticateUserFailure",
  CreateUserTrigger = "userStore/createUserTrigger",
  CreateUserSuccess = "userStore/createUserSuccess",
  CreateUserFailure = "userStore/createUserFailure",
  GetCurrentUserTrigger = "userStore/getCurrentUserTrigger",
  GetCurrentUserSuccess = "userStore/getCurrentUserSuccess",
  GetCurrentUserFailure = "userStore/getCurrentUserFailure",
}
export const authenticateUserTrigger =
  createActionWithPayload<AuthenticateUserParams>(
    UserStoreActions.AuthenticateUserTrigger
  );
export const authenticateUserSuccess = createActionWithPayload<User>(
  UserStoreActions.AuthenticateUserSuccess
);
export const authenticateUserFailure = createAction(
  UserStoreActions.AuthenticateUserFailure
);
export const createUserTrigger = createActionWithPayload<CreateUserParams>(
  UserStoreActions.CreateUserTrigger
);
export const createUserSuccess = createAction(
  UserStoreActions.CreateUserSuccess
);
export const createUserFailure = createAction(
  UserStoreActions.CreateUserFailure
);
export const getCurrentUserTrigger = createActionWithPayload<GetCurrentUser>(
  UserStoreActions.GetCurrentUserTrigger
);
export const getCurrentUserSuccess = createActionWithPayload<User>(
  UserStoreActions.GetCurrentUserSuccess
);
export const getCurrentUserFailure = createAction(
  UserStoreActions.GetCurrentUserFailure
);
