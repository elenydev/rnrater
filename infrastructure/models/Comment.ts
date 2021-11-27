import { User } from "./User";
import { Post } from './Post';

export interface Comment {
  id: string;
  createdAt: Date;
  author: User;
  post: Post;
}
