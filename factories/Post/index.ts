import { getErrorResponse } from "../../utils/getErrorResponse";
import { AuthKeys, ResponseStatus } from "../../infrastructure/api/enums";
import { BaseRequestResponse } from "../../infrastructure/api/interfaces";
import { getAuthValue } from "../../services/auth";
import { Alert } from "react-native";

export const post = async (
  path: string,
  body: Object,
  requireAuth = false,
  includeFile = false,
  queryParams: { [key: string]: unknown } = {}
): Promise<BaseRequestResponse> => {
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
    return databaseResponse(request.ok, response);
  } catch (error) {
    return Promise.reject(getErrorResponse(error.message));
  }
};

export const databaseResponse = (
  isSuccesfullResponse: boolean,
  response: BaseRequestResponse
): Promise<BaseRequestResponse> => {
  if (isSuccesfullResponse) {
    return Promise.resolve({
      responseStatus: ResponseStatus.Success,
      message: response.message,
    });
  }
  return Promise.reject(getErrorResponse(response.message));
};
