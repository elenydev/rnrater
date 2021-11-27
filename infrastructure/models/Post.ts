import { Category } from "./Category";
import { Comment } from "./Comment";
import { User } from "./User";

export interface Post {
    id: string;
    imageUrl: string;
    rates: number[];
    averageRates: number;
    comments: Comment[];
    evaluators: User[];
    category: Category;
  }