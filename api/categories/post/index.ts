import { API_URL } from "../../../utils/api";
import { post } from "../../../factories/Post";
import { BaseRequestResponse } from "../../../infrastructure/api/interfaces";
import { CreateCategoryParams } from "./interfaces";

export const createCategory = async (
  data: CreateCategoryParams
): Promise<BaseRequestResponse> => {
  const formData = new FormData();
  formData.append("name", data.name);
  const categoryImage = {
    ...data.categoryImage,
    type: `image/${data.categoryImage.type}`,
  };
  formData.append("categoryImage", categoryImage);
  return await post(API_URL.CATEGORIES.CREATE_CATEGORY, formData, true, true);
};
