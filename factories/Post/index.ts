import { getErrorResponse } from "../../utils/getErrorResponse";
import { AuthKeys, ResponseStatus } from "../../infrastructure/api/enums";
import { BaseRequestResponse } from "../../infrastructure/api/interfaces";
import { getAuthValue } from "../../services/auth";
import { PostItemActionResult } from "../interfaces/post";

export const post = async <ReturnItemType extends {}>(
  path: string,
  body: Object,
  requireAuth = false,
  includeFile = false,
  queryParams: { [key: string]: unknown } = {}
): Promise<PostItemActionResult<ReturnItemType> | BaseRequestResponse> => {
  try {
    const token = await getAuthValue(AuthKeys.Token);
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

    const request = await fetch(
      `${path}${params.length ? "?" + params.join("&") : ""}`,
      {
        method: "POST",
        headers: {
          ...contentTypeHeader,
          ...authorizationHeader,
        },
        body: (includeFile ? body : JSON.stringify(body)) as BodyInit_,
      }
    );
    const response = await request.json();
    return databaseResponse<ReturnItemType>(request.ok, response);
  } catch (error) {
    return Promise.reject(getErrorResponse(error.message));
  }
};

export const databaseResponse = <ReturnItemType>(
  isSuccesfullResponse: boolean,
  response: PostItemActionResult<ReturnItemType> | BaseRequestResponse
): Promise<PostItemActionResult<ReturnItemType> | BaseRequestResponse> => {
  if (isSuccesfullResponse) {
    if (isResultTypeIncluded(response)) {
      return Promise.resolve({
        responseStatus: ResponseStatus.Success,
        message: response.message,
        result: response.result,
      });
    }

    return Promise.resolve({
      responseStatus: ResponseStatus.Success,
      message: response.message,
    });
  }
  return Promise.reject(getErrorResponse(response.message));
};

const isResultTypeIncluded = <ReturnItemType>(
  response: PostItemActionResult<ReturnItemType> | BaseRequestResponse
): response is PostItemActionResult<ReturnItemType> => {
  return !!(response as PostItemActionResult<ReturnItemType>).result;
};
