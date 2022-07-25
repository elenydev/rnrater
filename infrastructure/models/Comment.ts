import { User } from "./User";
import { CategoryPost } from './CategoryPost';

export interface Comment {
  id: string;
  createdAt: Date;
  author: User;
  post: CategoryPost;
  content: string;
}
