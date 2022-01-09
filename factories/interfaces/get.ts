import { BaseRequestResponse, PagingInfo } from "../../infrastructure/api/interfaces";

export interface GetListActionResult<ListItemType> extends BaseRequestResponse {
  results?: ListItemType[];
  paging?: PagingInfo;
}

export interface GetItemActionResult<ListItemType> extends BaseRequestResponse {
    result?: ListItemType;
  }
  