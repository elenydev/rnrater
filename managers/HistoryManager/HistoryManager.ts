import { RootStackRoutes } from "infrastructure/router/enums";
import {
  GlobalHistory,
  GlobalHistoryScreen,
} from "../../infrastructure/router/interfaces";

export default class HistoryManager {
  history: GlobalHistory;

  constructor(navigationHistory: GlobalHistory) {
    this.history = navigationHistory;
  }

  public navigate<Params>(
    screen: GlobalHistoryScreen | RootStackRoutes,
    params?: Params
  ): void {
    this.history.navigate<Params>(screen, params);
  }

  public navigateNestedRoute<Params extends Object>(
    rootScreen: RootStackRoutes,
    screen: GlobalHistoryScreen,
    params?: Params
  ): void {
    this.navigate<Params>(rootScreen, {
      screen,
      ...params,
    } as unknown as Params);
  }
}
