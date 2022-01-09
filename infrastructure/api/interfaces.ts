import { ResponseStatus } from "./enums";

export interface BaseRequestResponse extends Partial<Response> {
  responseStatus: ResponseStatus;
  message: string;
}

export interface BaseRequestResponse extends Partial<Response> {
  responseStatus: ResponseStatus;
  message: string;
}

export interface ApiError {
  message: string;
}

export interface Paging {
  pageNumber: number;
  pageSize: number;
  totalCount?: number;
}

export interface PagingInfo extends Paging {
  totalCount: number;
}
