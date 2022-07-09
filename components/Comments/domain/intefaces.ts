import { PagingInfo } from "../../../infrastructure/api/interfaces";

export interface CommentStore {
  paging: PagingInfo,
  isLoading: boolean
}