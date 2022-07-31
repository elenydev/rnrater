import { SerializedImage } from "../../../utils/serializeImage";

export interface PostCategoryPostParams {
  title: string;
  categoryId: string;
  categoryPostImage: SerializedImage;
  description: string;
}
