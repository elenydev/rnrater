import { UserStore } from "../components/Auth/domain/interfaces";
import { FormsStore } from "../managers/FormManager/interfaces";
import { HistoryStore } from '../managers/HistoryManager/interfaces';

export interface Store {
  readonly userStore: UserStore;
  readonly formsStore: FormsStore;
  readonly historyStore: HistoryStore;
}
