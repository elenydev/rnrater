import { Category, CategoryWithCover } from '../../../infrastructure/models/Category';
import { Paging } from '../../../infrastructure/api/interfaces';

export interface CategoriesStore {
  isLoading: boolean
  paging: Paging
  list: CategoryWithCover[]
}

export interface GetCategoriesCoverImagesParams {
  categories: Category[]
}
