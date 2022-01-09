import { createAction } from "@reduxjs/toolkit";
import { GetCategoriesListActionResult } from "../../../api/categories/get";
import { createActionWithPayload } from "../../../utils/redux/actions";

export enum CategoriesStoreActions {
  GetCategoriesListTrigger = "categoriesStore/getCategoriesListTrigger",
  GetCategoriesListSuccess = "categoriesStore/getCategoriesListSuccess",
  GetCategoriesListFailure = "categoriesStore/getCategoriesListFailure",
}

export const getCategoriesListTrigger = createAction(
  CategoriesStoreActions.GetCategoriesListTrigger
);
export const getCategoriesListFailure = createAction(
  CategoriesStoreActions.GetCategoriesListFailure
);
export const getCategoriesListSuccess =
  createActionWithPayload<GetCategoriesListActionResult>(
    CategoriesStoreActions.GetCategoriesListSuccess
  );
