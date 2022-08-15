import { User } from './User';

export interface Comment {
  id: string
  createdAt: Date
  author: User
  content: string
}
