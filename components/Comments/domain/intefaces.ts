import { Comment } from "../../../infrastructure/models/Comment";
import { Paging, PagingInfo } from "../../../infrastructure/api/interfaces";

export interface CommentStore {
  paging: PagingInfo;
  isLoading: boolean;
  list: Comment[];
}

export interface GetCommentsListParams {
  controller: AbortController;
  categoryPostId: string;
}

export interface AddNewCommentPayload {
  
}
