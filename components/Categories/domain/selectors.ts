import { Paging } from "../../../infrastructure/api/interfaces";
import { Store } from "../../../store/interface";

export const getPaging = (store: Store): Paging => store.categoriesStore.paging;
