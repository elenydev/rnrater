import { BaseRequestResponse } from "../../infrastructure/api/interfaces";

export interface PostItemActionResult<ReturnItemType>
  extends BaseRequestResponse {
  result: ReturnItemType;
}

export interface PostItemsActionResult<ReturnItemType>
  extends BaseRequestResponse {
  results: ReturnItemType[];
}
