import { Store } from '../../store/interface';

export const getHistoryManager = (state: Store) => state.historyStore.manager;
