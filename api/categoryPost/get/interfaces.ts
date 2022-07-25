import { Paging } from "../../../infrastructure/api/interfaces";
import {
  GetListActionResult,
  GetItemActionResult,
} from "../../../factories/interfaces/get";
import { CategoryPost } from "../../../infrastructure/models/CategoryPost";

export interface GetCategoryPostListParams {
  categoryId: string;
  paging: Paging;
  controller: AbortController
}

export interface GetCategoryPostParams {
  categoryPostId: string;
  controller: AbortController;
}

export type GetCategoryPostsListActionResult =
  GetListActionResult<CategoryPost>;

export type GetCategoryPostActionResult = GetItemActionResult<CategoryPost>;
