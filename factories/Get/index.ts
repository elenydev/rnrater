import { GetItemActionResult, GetListActionResult } from "../interfaces/get";
import { AuthKeys, ResponseStatus } from "../../infrastructure/api/enums";
import { BaseRequestResponse } from "../../infrastructure/api/interfaces";
import { getAuthValue } from "../../services/auth";
import { getErrorResponse } from "../../utils/getErrorResponse";

export const getList = async <ListItemType>(
  path: string,
  requireAuth = false,
  queryParams: { [key: string]: unknown } = {},
  pagination = {
    pageNumber: 1,
    pageSize: 10,
  }
): Promise<GetListActionResult<ListItemType> | BaseRequestResponse> => {
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
    const request = await fetch(`${path}?${params.join("&")}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...authorizationHeader,
      },
    });
    const response = await request.json();
    return databaseResponse<ListItemType>(request.ok, response, true);
  } catch (error) {
    return Promise.reject(getErrorResponse(error.message));
  }
};

export const getItem = async <ListItemType>(
  path: string,
  requireAuth = false,
  queryParams: { [key: string]: unknown } = {},
  returnFile = false
): Promise<GetItemActionResult<ListItemType> | BaseRequestResponse> => {
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
    const request = await fetch(`${path}?${params.join("&")}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...authorizationHeader,
      },
    });
    const response = returnFile ? await request : await request.json();
    return databaseResponse<ListItemType>(
      request.ok,
      response,
      false,
      returnFile
    );
  } catch (error) {
    return Promise.reject(getErrorResponse(error.message));
  }
};

export const databaseResponse = async <ListItemType>(
  isSuccesfullResponse: boolean,
  response:
    | GetListActionResult<ListItemType>
    | GetItemActionResult<ListItemType>,
  multipleResults = false,
  returnFile = false
): Promise<
  | GetListActionResult<ListItemType>
  | GetItemActionResult<ListItemType>
  | BaseRequestResponse
> => {
  const baseResult = multipleResults
    ? {
        results: (response as GetListActionResult<ListItemType>).results,
        paging: {
          totalCount: (response as GetListActionResult<ListItemType>).paging
            ?.totalCount,
          pageSize: (response as GetListActionResult<ListItemType>).paging
            ?.pageSize,
          pageNumber: (response as GetListActionResult<ListItemType>).paging
            ?.pageNumber,
        },
      }
    : { result: (response as GetItemActionResult<ListItemType>).result };
  if (isSuccesfullResponse) {
    const file = returnFile && response.blob && (await response.blob());
    return Promise.resolve({
      ...baseResult,
      ...(returnFile && { result: file }),
      responseStatus: ResponseStatus.Success,
      message: response.message,
    });
  }

  return Promise.reject(getErrorResponse(response.message));
};
