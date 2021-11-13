import { ResponseStatus } from "./enums";

export interface BaseRequestResponse {
  responseStatus: ResponseStatus;
  message: string;
}

export interface ApiError {
  message: string;
}

