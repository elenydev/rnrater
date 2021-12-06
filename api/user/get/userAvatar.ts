import { GetUserAvatarParams } from "../../../api/user/get/intefaces";
import { API_URL } from "../../../utils/api";
import { getItem } from "../../../factories/Get";
import { GetItemActionResult } from "../../../factories/interfaces/get";
import { BaseRequestResponse } from "../../../infrastructure/api/interfaces";

export type GetUserAvatarActionResult =
  | GetItemActionResult<Blob>
  | BaseRequestResponse;

export const getUserAvatar = async (
  params: GetUserAvatarParams
): Promise<GetUserAvatarActionResult> => {
  return await getItem(
    API_URL.USER.GET_USER_AVATAR,
    true,
    { userId: params.userId },
    true
  );
};
