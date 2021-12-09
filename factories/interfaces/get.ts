import { BaseRequestResponse } from "../../infrastructure/api/interfaces";

export interface GetListActionResult<ListItemType> extends BaseRequestResponse {
  results?: ListItemType[];
}

export interface GetItemActionResult<ListItemType> extends BaseRequestResponse {
    result?: ListItemType;
  }
  