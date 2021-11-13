import { getErrorResponse } from "../../utils/getErrorResponse";
import { AuthKeys, ResponseStatus } from "../../infrastructure/api/enums";
import { BaseRequestResponse } from "../../infrastructure/api/interfaces";
import {
  PostItemActionResult,
  PostItemsActionResult,
} from "../interfaces/post";
import { getAuthValue } from "../../services/auth";

export const post = async <ReturnItemType>(
  path: string,
  body: Object,
  requireAuth = false,
  includeFile = false,
  queryParams: { [key: string]: unknown } = {}
): Promise<PostItemActionResult<ReturnItemType> | BaseRequestResponse> => {
  try {
    const token = getAuthValue(AuthKeys.Token);
    const params = Object.keys(queryParams).reduce(
      (allParams: string[], currentParam) => {
        allParams.push(`${currentParam}=${queryParams[currentParam]}`);
        return allParams;
      },
      []
    );

    const authorizationHeader = requireAuth && {
      Authorization: `Bearer ${token}`,
    };

    const contentTypeHeader = !includeFile && {
      "Content-Type": "application/json",
    };

    const request = await fetch(`${path}?${params.join("&")}`, {
      method: "POST",
      headers: {
        ...contentTypeHeader,
        ...authorizationHeader,
      },
      body: (includeFile ? body : JSON.stringify(body)) as BodyInit_,
    });
    const response = await request.json();
    return Promise.resolve(
      databaseResponse<ReturnItemType>(request.ok, response, false)
    );
  } catch (error) {
    return Promise.reject(getErrorResponse(error.message));
  }
};

export const databaseResponse = <ReturnItemType>(
  isSuccesfullResponse: boolean,
  response:
    | PostItemActionResult<ReturnItemType>
    | PostItemsActionResult<ReturnItemType>,
  multipleResults = false
):
  | PostItemActionResult<ReturnItemType>
  | PostItemsActionResult<ReturnItemType>
  | BaseRequestResponse => {
  const baseResult = multipleResults
    ? { results: (response as PostItemsActionResult<ReturnItemType>).results }
    : { result: (response as PostItemActionResult<ReturnItemType>).result };
  if (isSuccesfullResponse) {
    return {
      ...baseResult,
      responseStatus: ResponseStatus.Success,
      message: response.message,
    };
  }
  return getErrorResponse(response.message);
};
