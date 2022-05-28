import { CategoryPostWithImage } from "infrastructure/models/CategoryPost";
import { Paging } from "../../../infrastructure/api/interfaces";

export interface CategoryPostsStore {
  isLoading: boolean;
  paging: Paging;
  list: CategoryPostWithImage[];
}

export interface GetCategoryPostsListParams {
  categoryId: string;
}
