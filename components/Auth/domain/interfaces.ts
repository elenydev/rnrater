import { User } from "../../../infrastructure/models/User";

export interface UserStore {
  user?: User;
  isLoading: boolean;
}
