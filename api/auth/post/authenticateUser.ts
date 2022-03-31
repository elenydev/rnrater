import { API_URL } from "../../../utils/api";
import { post } from "../../../factories/Post";
import { AuthenticateUserParams } from "./interfaces";
import { PostItemActionResult } from "../../../factories/interfaces/post";
import { User } from "../../../infrastructure/models/User";
import { BaseRequestResponse } from "../../../infrastructure/api/interfaces";

export interface PostAuthenticateUserResult {
  user: User,
  accessToken: string;
}

export const postAuthenticateUser = async (
  authenticateUserParams: AuthenticateUserParams
): Promise<PostItemActionResult<PostAuthenticateUserResult> | BaseRequestResponse> => {
  return await post<User>(
    API_URL.AUTH.AUTHENTICATE_USER,
    authenticateUserParams
  );
};
