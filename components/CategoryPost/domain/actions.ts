import { createActionWithPayload } from "../../../utils/redux/actions";
import { createAction } from "@reduxjs/toolkit";
import { GetCategoryItemsListActionResult } from "../../../api/categoryPost/get/interfaces";

export enum CategoryPostStoreActions {
  GetCategoryPostItemsTrigger = "categoriesStore/getCategoryItemsTrigger",
  GetCategoryPostItemSuccess = "categoriesStore/getCategoryItemSuccess",
  GetCategoryPostItemFailure = "categoriesStore/getCategoryItemFailure",
}

export const getCategoryItemsTrigger = createActionWithPayload(
  CategoryPostStoreActions.GetCategoryPostItemsTrigger
);
export const getCategoryItemsFailure = createAction(
  CategoryPostStoreActions.GetCategoryPostItemFailure
);
export const getCategoryItemsSuccess =
  createActionWithPayload<GetCategoryItemsListActionResult>(
    CategoryPostStoreActions.GetCategoryPostItemSuccess
  );
