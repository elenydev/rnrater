import { API_URL } from '../../../utils/api';
import { post } from '../../../factories/Post';
import { CreateUserParams } from './interfaces';
import { BaseRequestResponse } from '../../../infrastructure/api/interfaces';

export const createUser = async (
  user: CreateUserParams
): Promise<BaseRequestResponse> => {
  const { firstName, lastName, email, password, avatar, nickName, policy } =
    user;
  const newUser = new FormData();
  const avatarObj = {
    ...avatar,
    type: `image/${avatar.type}`
  };
  newUser.append('firstName', firstName);
  newUser.append('lastName', lastName);
  newUser.append('nickName', nickName);
  newUser.append('email', email);
  newUser.append('password', password);
  newUser.append('avatar', avatarObj);
  newUser.append('policy', policy);

  return await post(API_URL.AUTH.CREATE_USER, newUser, false, true);
};
