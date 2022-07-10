import { Category } from "./Category";
import { Comment } from "./Comment";
import { User } from "./User";

export interface CategoryPost {
  id: string;
  imageUrl: string;
  rates: number[];
  averageRates: number;
  comments: Comment[];
  evaluators: User[];
  category: Category;
  title: string;
}

export interface CategoryPostWithImage extends CategoryPost {
  image: Blob
}