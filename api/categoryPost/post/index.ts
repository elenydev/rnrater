import { API_URL } from '../../../utils/api';
import { post } from '../../../factories/Post';
import { BaseRequestResponse } from '../../../infrastructure/api/interfaces';
import { PostCategoryPostParams } from './interfaces';

export const createCategoryPost = async (
  data: PostCategoryPostParams
): Promise<BaseRequestResponse> => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('categoryId', data.categoryId);
  formData.append('description', data.description);
  const categoryImage = {
    ...data.categoryPostImage,
    type: `image/${data.categoryPostImage.type}`
  };
  formData.append('categoryPostImage', categoryImage);
  return await post(API_URL.CATEGORY_POST.CREATE_CATEGORY_POST, formData, true, true);
};
