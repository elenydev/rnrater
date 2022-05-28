import { CategoriesStore } from "../components/Categories/domain/interfaces";
import { UserStore } from "../components/Auth/domain/interfaces";
import { FormsStore } from "../managers/FormManager/interfaces";
import { HistoryStore } from "../managers/HistoryManager/interfaces";
import { CategoryPostsStore } from "../components/CategoryPost/domain/interfaces";

export interface Store {
  readonly userStore: UserStore;
  readonly formsStore: FormsStore;
  readonly historyStore: HistoryStore;
  readonly categoriesStore: CategoriesStore;
  readonly categoryPostsStore: CategoryPostsStore;
}
