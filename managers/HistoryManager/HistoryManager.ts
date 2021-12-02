import { GlobalHistory } from "../../infrastructure/router/interfaces";

export default class HistoryManager {
  history: GlobalHistory

  constructor(navigationHistory: GlobalHistory) {
    this.history = navigationHistory;
  }
}
