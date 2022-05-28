import { CategoryPost } from "../../../infrastructure/models/CategoryPost";
import { getList } from "../../../factories/Get";
import { API_URL } from "../../../utils/api";
import {
  GetCategoryPostListParams,
  GetCategoryPostsListActionResult,
} from "./interfaces";

export const getCategoryPostItemsList = async (
  params: GetCategoryPostListParams
): Promise<GetCategoryPostsListActionResult> => {
  const { paging, categoryId } = params;

  return await getList<CategoryPost>(
    API_URL.CATEGORY_POST.GET_LIST,
    true,
    { categoryId },
    paging
  );
};
