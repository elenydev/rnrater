import { createAction } from "@reduxjs/toolkit";
import { CreateCategoryParams } from "../../../api/categories/post/interfaces";
import { GetCategoriesListActionResult } from "../../../api/categories/get";
import { createActionWithPayload } from "../../../utils/redux/actions";

export enum CategoriesStoreActions {
  GetCategoriesListTrigger = "categoriesStore/getCategoriesListTrigger",
  GetCategoriesListSuccess = "categoriesStore/getCategoriesListSuccess",
  GetCategoriesListFailure = "categoriesStore/getCategoriesListFailure",
  CreateCategoryTrigger = "categoriesStore/createCategoryTrigger",
  CreateCategorySuccess = "categoriesStore/createCategorySuccess",
  CreateCategoryFailure = "categoriesStore/createCategoryFailure",
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

export const createCategoryTrigger =
  createActionWithPayload<CreateCategoryParams>(
    CategoriesStoreActions.CreateCategoryTrigger
  );

export const createCategorySuccess = createAction(
  CategoriesStoreActions.CreateCategorySuccess
);
export const createCategoryFailure = createAction(
  CategoriesStoreActions.CreateCategoryFailure
);
