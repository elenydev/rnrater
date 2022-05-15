import { Paging } from "../../../infrastructure/api/interfaces";
import { GetListActionResult } from "../../../factories/interfaces/get";
import { CategoryPost } from "../../../infrastructure/models/CategoryPost";

export interface GetCategoryPostItemsListParams {
  categoryId: string;
  paging: Paging
}

export type GetCategoryItemsListActionResult =
  GetListActionResult<CategoryPost>;