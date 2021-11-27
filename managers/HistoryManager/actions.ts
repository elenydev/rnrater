import { createActionWithPayload } from "../../utils/redux/actions";
import HistoryManager from "./HistoryManager";

export enum HistoryStoreActions {
  setHistoryManager = "SetHistoryManager",
}

export const setHistoryManager = createActionWithPayload<HistoryManager>(
  HistoryStoreActions.setHistoryManager
);
