import {
  CategoryPost,
  CategoryPostWithImage,
} from "../../../infrastructure/models/CategoryPost";
import { Paging } from "../../../infrastructure/api/interfaces";

export interface CategoryPostsStore {
  isLoading: boolean;
  paging: Paging;
  list: CategoryPostWithImage[];
  currentCategoryPost?: CategoryPostWithImage
}

export interface GetCategoryPostsListParams {
  categoryId: string;
}

export interface GetCategoryPostsImagesParams {
  categoryPosts: CategoryPost[];
}

export interface GetCategoryPostImageParams {
  categoryPostId: string;
}