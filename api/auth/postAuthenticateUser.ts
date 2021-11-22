import { API_URL } from "../../utils/api";
import { post } from "../../factories/Post";
import { AuthenticateUserParams } from "./interfaces";
import { BaseRequestResponse } from "../../infrastructure/api/interfaces";

export const postAuthenticateUser = async (
  authenticateUserParams: AuthenticateUserParams
): Promise<BaseRequestResponse> => {
  return await post(API_URL.AUTH.AUTHENTICATE_USER, authenticateUserParams);
};
