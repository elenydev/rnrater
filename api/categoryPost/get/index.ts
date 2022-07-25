import { CategoryPost } from "../../../infrastructure/models/CategoryPost";
import { getItem, getList } from "../../../factories/Get";
import { API_URL } from "../../../utils/api";
import {
  GetCategoryPostActionResult,
  GetCategoryPostListParams,
  GetCategoryPostParams,
  GetCategoryPostsListActionResult,
} from "./interfaces";
import {
  GetCategoryPostImageParams,
  GetCategoryPostsImagesParams,
  GetCategoryPostsListParams,
} from "../../../components/CategoryPost/domain/interfaces";
import { GetItemActionResult } from "factories/interfaces/get";

export const getCategoryPostItemsList = async (
  params: GetCategoryPostListParams
): Promise<GetCategoryPostsListActionResult> => {
  const { paging, categoryId, controller } = params;

  return await getList<CategoryPost>(
    API_URL.CATEGORY_POST.GET_LIST,
    true,
    { categoryId },
    paging,
    controller
  );
};

export type GetCategoryPostImageResult = GetItemActionResult<Blob>;

export const getCategoryPostImage = async (
  params: GetCategoryPostImageParams
): Promise<GetCategoryPostImageResult> => {
  const { categoryPostId, controller } = params;

  return await getItem<Blob>(
    API_URL.CATEGORY_POST.GET_CATEGORY_POST_IMAGE,
    true,
    { categoryPostId: categoryPostId },
    true,
    controller
  );
};

export const getCategoryPostItem = async (
  params: GetCategoryPostParams
): Promise<GetCategoryPostActionResult> => {
  const { categoryPostId, controller } = params;

  return await getItem<CategoryPost>(
    API_URL.CATEGORY_POST.GET_LIST,
    true,
    {
      categoryPostId,
    },
    false,
    controller
  );
};

export const getCategoryPostsImages = async (
  params: GetCategoryPostsImagesParams
): Promise<GetCategoryPostImageResult[]> => {
  const { categoryPosts, controller } = params;

  const images = await Promise.all([
    ...categoryPosts.map((categoryPost) =>
      getCategoryPostImage({ categoryPostId: categoryPost.id, controller })
    ),
  ]);

  return images;
};
