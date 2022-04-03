import { Category } from "../../../infrastructure/models/Category";
import { Paging } from "../../../infrastructure/api/interfaces";

export interface CategoriesStore {
  isLoading: boolean;
  paging: Paging;
  list: Category[];
}

export interface GetCategoriesCoverImagesParams {
  categories: Category[];
}
