import { createActionWithPayload } from "../../../utils/redux/actions";
import { createAction } from "@reduxjs/toolkit";
import { CreateCommentParams } from "../../../api/comments/intefaces";
import { GetCommentsListActionResult } from "api/comments/get";
import { GetCommentsListParams } from "./intefaces";
import { Paging } from "../../../infrastructure/api/interfaces";
import { Comment } from "../../../infrastructure/models/Comment";

export enum CommentStoreActions {
  GetCommentsListTrigger = "commentsStore/getCommentsListTrigger",
  GetCommentsListSuccess = "commentsStore/getCommentsListSuccess",
  GetCommentsListFailure = "commentsStore/getCommentsListFailure",
  ClearCommentsList = 'commentsStore/clearCommentsList',
  PostCommentTrigger = "commentStore/postCommentTrigger",
  PostCommentFailure = "commentStore/postCommentFailure",
  PostCommentSuccess = "commentStore/postCommentSuccess",
  UpdatePaging = "commentsStore/updatePaging",
  AddNewComment = "commentsStore/addNewComment"
}

export const getCommentsListTrigger =
  createActionWithPayload<GetCommentsListParams>(
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

export const updatePaging = createActionWithPayload<Paging>(
  CommentStoreActions.UpdatePaging
);

export const clearCommentsList = createAction(CommentStoreActions.ClearCommentsList);

export const addNewComment = createActionWithPayload<Comment>(CommentStoreActions.AddNewComment)
