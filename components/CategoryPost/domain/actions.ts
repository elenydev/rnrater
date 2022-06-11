import { createActionWithPayload } from "../../../utils/redux/actions";
import { createAction } from "@reduxjs/toolkit";
import { GetCategoryPostsListActionResult } from "../../../api/categoryPost/get/interfaces";
import {
  GetCategoryPostsImagesParams,
  GetCategoryPostsListParams,
} from "./interfaces";
import { CategoryPostWithImage } from "../../../infrastructure/models/CategoryPost";
import { PostCategoryPostParams } from "api/categoryPost/post/interfaces";

export enum CategoryPostStoreActions {
  GetCategoryPostsTrigger = "categoryPostStore/getCategoryPostsTrigger",
  GetCategoryPostsSuccess = "categoryPostStore/getCategoryPostsSuccess",
  GetCategoryPostsFailure = "categoryPostStore/getCategoryPostsFailure",
  GetCategoryPostsImagesTrigger = "categoryPostStore/getCategoryPostsImagesTrigger",
  GetCategoryPostsImagesSuccess = "categoryPostStore/getCategoryPostsImagesSuccess",
  GetCategoryPostsImagesFailure = "categoryPostStore/getCategoryPostsImagesFailure",
  PostCategoryPostTrigger = "categoryPostStore/postCategoryPostTrigger",
  PostCategoryPostFailure = "categoryPostStore/postCategoryPostFailure",
  PostCategoryPostSuccess = "categoryPostStore/postCategoryPostSuccess",
}

export const getCategoryPostsTrigger =
  createActionWithPayload<GetCategoryPostsListParams>(
    CategoryPostStoreActions.GetCategoryPostsTrigger
  );
export const getCategoryPostsFailure = createAction(
  CategoryPostStoreActions.GetCategoryPostsFailure
);
export const getCategoryPostsSuccess =
  createActionWithPayload<GetCategoryPostsListActionResult>(
    CategoryPostStoreActions.GetCategoryPostsSuccess
  );

export const getCategoryPostsImagesTrigger =
  createActionWithPayload<GetCategoryPostsImagesParams>(
    CategoryPostStoreActions.GetCategoryPostsImagesTrigger
  );

export const getCategoryPostsImagesFailure = createAction(
  CategoryPostStoreActions.GetCategoryPostsImagesFailure
);

export const getCategoryPostsImagesSuccess = createActionWithPayload<
  CategoryPostWithImage[]
>(CategoryPostStoreActions.GetCategoryPostsImagesSuccess);

export const postCategoryPostTrigger =
  createActionWithPayload<PostCategoryPostParams>(
    CategoryPostStoreActions.PostCategoryPostTrigger
  );

export const postCategoryPostFailure = createAction(
  CategoryPostStoreActions.PostCategoryPostFailure
);

export const postCategoryPostSuccess = createAction(
  CategoryPostStoreActions.PostCategoryPostSuccess
);
