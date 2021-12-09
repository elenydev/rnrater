import { Comment } from "./Comment";
import { Post } from "./Post";

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  evaluatedPosts: Post[];
  comments: Comment[];
}
