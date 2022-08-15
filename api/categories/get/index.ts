import { getItem, getList } from '../../../factories/Get';
import {
  GetItemActionResult,
  GetListActionResult
} from '../../../factories/interfaces/get';
import { Paging } from '../../../infrastructure/api/interfaces';
import { Category } from '../../../infrastructure/models/Category';
import { API_URL } from '../../../utils/api';

export type GetCategoriesListActionResult = GetListActionResult<Category>;

export const getCategoriesList = async (
  paging: Paging
): Promise<GetCategoriesListActionResult> => {
  return await getList<Category>(API_URL.CATEGORY.GET_LIST, true, {}, paging);
};

export type GetCategoryCoverImageResult = GetItemActionResult<Blob>;

export const getCategoryCoverImage = async (
  categoryId: string
): Promise<GetCategoryCoverImageResult> => {
  return await getItem<Blob>(
    API_URL.CATEGORY.GET_CATEGORY_COVER_IMAGE,
    true,
    { categoryId },
    true
  );
};

export const getCategoriesCoverImages = async (
  categories: Category[]
): Promise<GetCategoryCoverImageResult[]> => {
  const covers = await Promise.all([
    ...categories.map(async (category) => await getCategoryCoverImage(category.id))
  ]);

  return covers;
};
