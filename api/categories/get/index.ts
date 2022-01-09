import { getList } from "../../../factories/Get";
import { GetListActionResult } from "../../../factories/interfaces/get";
import { Paging } from "../../../infrastructure/api/interfaces";
import { Category } from "../../../infrastructure/models/Category";
import { API_URL } from "../../../utils/api";

export type GetCategoriesListActionResult = GetListActionResult<Category>;

export const getCategoriesList = async (
  paging: Paging
): Promise<GetCategoriesListActionResult> => {
  return await getList<Category>(API_URL.CATEGORIES.GET_LIST, true, {}, paging);
};
