import { createActionWithPayload } from "../../../utils/redux/actions";
import { createAction } from "@reduxjs/toolkit";
import { GetCategoryPostsListActionResult } from "../../../api/categoryPost/get/interfaces";
import {
  GetCategoryPostsImagesParams,
  GetCategoryPostsListParams,
} from "./interfaces";
import { CategoryPostWithImage } from "../../../infrastructure/models/CategoryPost";

export enum CategoryPostStoreActions {
  GetCategoryPostsTrigger = "categoryPostStore/getCategoryPostsTrigger",
  GetCategoryPostsSuccess = "categoryPostStore/getCategoryPostsSuccess",
  GetCategoryPostsFailure = "categoryPostStore/getCategoryPostsFailure",
  GetCategoryPostsImagesTrigger = "categoryPostStore/getCategoryPostsImagesTrigger",
  GetCategoryPostsImagesSuccess = "categoryPostStore/getCategoryPostsImagesSuccess",
  GetCategoryPostsImagesFailure = "categoryPostStore/getCategoryPostsImagesFailure",
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
