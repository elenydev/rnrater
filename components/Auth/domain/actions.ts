import { createAction } from '@reduxjs/toolkit';
import { createActionWithPayload } from '../../../utils/redux/actions';
import { CreateUserParams, AuthenticateUserParams } from '../../../api/auth/post/interfaces';
import { User } from '../../../infrastructure/models/User';

import { GetUserAvatarParams } from '../../../api/user/get/intefaces';

export enum UserStoreActions {
  AuthenticateUserTrigger = 'userStore/authenticateUserTrigger',
  AuthenticateUserSuccess = 'userStore/authenticateUserSuccess',
  AuthenticateUserFailure = 'userStore/authenticateUserFailure',
  GetUserAvatarTrigger = 'userStore/getUserAvatarTrigger',
  GetUserAvatarSuccess = 'userStore/getUserAvatarSuccess',
  GetUserAvatarFailure = 'userStore/getUserAvatarFailure',
  CreateUserTrigger = 'userStore/createUserTrigger',
  CreateUserSuccess = 'userStore/createUserSuccess',
  CreateUserFailure = 'userStore/createUserFailure',
  GetCurrentUserTrigger = 'userStore/getCurrentUserTrigger',
  GetCurrentUserSuccess = 'userStore/getCurrentUserSuccess',
  GetCurrentUserFailure = 'userStore/getCurrentUserFailure',
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

export const getUserAvatarTrigger = createActionWithPayload<GetUserAvatarParams>(
  UserStoreActions.GetUserAvatarTrigger
);

export const getUserAvatarFailure = createAction(
  UserStoreActions.GetUserAvatarFailure
);

export const getUserAvatarSuccess = createActionWithPayload<Blob>(
  UserStoreActions.GetUserAvatarSuccess
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
