import { CategoryWithCover } from '../../../infrastructure/models/Category';
import { Paging } from '../../../infrastructure/api/interfaces';
import { Store } from '../../../store/interface';

export const getPaging = (store: Store): Paging => store.categoriesStore.paging;
export const getCategorieslist = (store: Store): CategoryWithCover[] => store.categoriesStore.list;
export const getIsLoadingCategories = (store: Store): boolean => store.categoriesStore.isLoading;
