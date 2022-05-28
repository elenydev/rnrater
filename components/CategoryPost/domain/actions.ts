import { createActionWithPayload } from "../../../utils/redux/actions";
import { createAction } from "@reduxjs/toolkit";
import { GetCategoryPostsListActionResult } from "../../../api/categoryPost/get/interfaces";
import { GetCategoryPostsListParams } from "./interfaces";

export enum CategoryPostStoreActions {
  GetCategoryPostItemsTrigger = "categoriesStore/getCategoryItemsTrigger",
  GetCategoryPostItemSuccess = "categoriesStore/getCategoryItemSuccess",
  GetCategoryPostItemFailure = "categoriesStore/getCategoryItemFailure",
}

export const getCategoryItemsTrigger =
  createActionWithPayload<GetCategoryPostsListParams>(
    CategoryPostStoreActions.GetCategoryPostItemsTrigger
  );
export const getCategoryItemsFailure = createAction(
  CategoryPostStoreActions.GetCategoryPostItemFailure
);
export const getCategoryItemsSuccess =
  createActionWithPayload<GetCategoryPostsListActionResult>(
    CategoryPostStoreActions.GetCategoryPostItemSuccess
  );
