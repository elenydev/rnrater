import {
  CategoryPost,
  CategoryPostWithImage
} from '../../../infrastructure/models/CategoryPost';
import { Paging } from '../../../infrastructure/api/interfaces';

export interface CategoryPostsStore {
  isLoading: boolean
  paging: Paging
  list: CategoryPostWithImage[]
  currentCategoryPost?: CategoryPostWithImage
}

export interface GetCategoryPostsListParams {
  categoryId: string
  controller: AbortController
}

export interface GetCategoryPostsImagesParams {
  categoryPosts: CategoryPost[]
  controller: AbortController
}

export interface GetCategoryPostParams {
  categoryPostId: string
  controller: AbortController
}

export interface GetCategoryPostImageParams {
  controller: AbortController
  categoryPostId: string
}

export interface GetCategoryPostImageActionParams {
  categoryPost: CategoryPost
  controller: AbortController
}
