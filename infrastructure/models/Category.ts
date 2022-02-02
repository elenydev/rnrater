import { CategoryPost } from "./CategoryPost";

export interface Category {
  id: string;
  name: string;
  categoryImageUrl: string;
  categoryPosts: CategoryPost[];
}
