import { UserStore } from "../components/Auth/domain/interfaces";
import { FormsStore } from "../managers/FormManager/interfaces";

export interface Store {
  readonly userStore: UserStore;
  readonly formsStore: FormsStore;
}
