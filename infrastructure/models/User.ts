import { Comment } from "./Comment";
import { CategoryPost } from "./CategoryPost";

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: Blob;
  evaluatedPosts: CategoryPost[];
  comments: Comment[];
}
