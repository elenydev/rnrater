import { createActionWithPayload } from "../../../utils/redux/actions";
import { createAction } from "@reduxjs/toolkit";
import { CreateCommentParams } from "../../../api/comments/intefaces";
import { GetCommentsListActionResult } from "api/comments/get";
import { GetCommentsListParams } from "./intefaces";

export enum CommentStoreActions {
  GetCommentsListTrigger = "commentsStore/getCommentsListTrigger",
  GetCommentsListSuccess = "commentsStore/getCommentsListSuccess",
  GetCommentsListFailure = "commentsStore/getCommentsListFailure",
  PostCommentTrigger = "commentStore/postCommentTrigger",
  PostCommentFailure = "commentStore/postCommentFailure",
  PostCommentSuccess = "commentStore/postCommentSuccess",
}

export const getCommentsListTrigger = createActionWithPayload<GetCommentsListParams>(
  CommentStoreActions.GetCommentsListTrigger
);

export const getCommentsListFailure = createAction(
  CommentStoreActions.GetCommentsListFailure
);

export const getCommentsListSuccess =
  createActionWithPayload<GetCommentsListActionResult>(
    CommentStoreActions.GetCommentsListSuccess
  );

export const postCommentTrigger = createActionWithPayload<CreateCommentParams>(
  CommentStoreActions.PostCommentTrigger
);

export const postCommentFailure = createAction(
  CommentStoreActions.PostCommentFailure
);

export const postCommentSuccess = createAction(
  CommentStoreActions.PostCommentSuccess
);
