import { createActionWithPayload } from "../../../utils/redux/actions";
import { createAction } from "@reduxjs/toolkit";
import { CreateCommentParams } from "../../../api/comments/intefaces";

export enum CommentStoreActions {
  PostCommentTrigger = "commentStore/postCommentTrigger",
  PostCommentFailure = "commentStore/postCommentFailure",
  PostCommentSuccess = "commentStore/postCommentSuccess",
}

export const postCommentTrigger = createActionWithPayload<CreateCommentParams>(
  CommentStoreActions.PostCommentTrigger
);

export const postCommentFailure = createAction(
  CommentStoreActions.PostCommentFailure
);

export const postCommentSuccess = createAction(
  CommentStoreActions.PostCommentSuccess
);
