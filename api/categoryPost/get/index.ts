import { CategoryPost } from "../../../infrastructure/models/CategoryPost";
import { getList } from "../../../factories/Get";
import { API_URL } from "../../../utils/api";
import {
  GetCategoryItemsListActionResult,
  GetCategoryPostItemsListParams,
} from "./interfaces";

export const getCategoryPostItemsList = async (
  params: GetCategoryPostItemsListParams
): Promise<GetCategoryItemsListActionResult> => {
  const { paging, categoryId } = params;

  return await getList<CategoryPost>(
    API_URL.CATEGORY_POST.GET_LIST,
    true,
    { categoryId },
    paging
  );
};
