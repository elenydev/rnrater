import { ResponseStatus } from "./enums";

export interface BaseRequestResponse extends Partial<Response> {
  responseStatus: ResponseStatus;
  message: string;
}

export interface ApiError {
  message: string;
}

