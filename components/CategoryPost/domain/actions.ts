import { createActionWithPayload } from "../../../utils/redux/actions";
import { createAction } from "@reduxjs/toolkit";
import { GetCategoryPostsListActionResult } from "../../../api/categoryPost/get/interfaces";
import { GetCategoryPostsListParams } from "./interfaces";

export enum CategoryPostStoreActions {
  GetCategoryPostItemsTrigger = "categoriesStore/getCategoryPostsTrigger",
  GetCategoryPostItemSuccess = "categoriesStore/getCategoryPostsSuccess",
  GetCategoryPostItemFailure = "categoriesStore/getCategoryPostsFailure",

}

export const getCategoryPostsTrigger =
  createActionWithPayload<GetCategoryPostsListParams>(
    CategoryPostStoreActions.GetCategoryPostItemsTrigger
  );
export const getCategoryPostsFailure = createAction(
  CategoryPostStoreActions.GetCategoryPostItemFailure
);
export const getCategoryPostsSuccess =
  createActionWithPayload<GetCategoryPostsListActionResult>(
    CategoryPostStoreActions.GetCategoryPostItemSuccess
  );
