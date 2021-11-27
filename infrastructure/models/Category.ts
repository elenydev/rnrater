import { Post } from "./Post";

export interface Category {
  id: string;
  name: string;
  posts: Post[];
}
