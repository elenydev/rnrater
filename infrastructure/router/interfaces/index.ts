import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  AuthStackRoutes,
  CategoryStackRoutes,
  RootScreenTabs as RootScreenTabsList,
  RootStackRoutes,
} from "../enums";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

interface GlobalHistoryNavigateScreenParams {
  screen: keyof AuthScreensList | keyof CategoryScreensList | keyof RootScreenTabs;
}

export interface GlobalHistory {
  navigate: (
    rootScreen: RootStackRoutes,
    { screen }: GlobalHistoryNavigateScreenParams
  ) => void;
}

export type RootStackParamList = {
  [RootStackRoutes.Auth]: NavigatorScreenParams<AuthScreensList> | undefined;
  [RootStackRoutes.Root]: NavigatorScreenParams<RootScreenTabs> | undefined;
  [RootStackRoutes.Category]:
    | NavigatorScreenParams<CategoryScreensList>
    | undefined;
  [RootStackRoutes.NotFound]: undefined;
};

export type AuthStackScreenRoutes = NativeStackNavigationProp<AuthScreensList>;

export type RootStackScreenRoutes =
  NativeStackNavigationProp<RootStackParamList>;

export type CategoryStackScreenRoutes = NativeStackNavigationProp<
  {
    [CategoryStackRoutes.CategoryEntities]: {
      categoryId: string;
    };
    [CategoryStackRoutes.CategoryEntity]: {
      categoryEntityId: string;
    };
  },
  keyof CategoryScreensList
>;

export type CategoryStackRoutesProps<
  RouteName extends keyof CategoryScreensList
> = RouteProp<
  {
    [CategoryStackRoutes.CategoryEntities]: {
      categoryId: string;
    };
    [CategoryStackRoutes.CategoryEntity]: {
      categoryEntityId: string;
    };
  },
  RouteName
>;

export type AuthScreensList = {
  [AuthStackRoutes.SignUp]: undefined;
  [AuthStackRoutes.SignIn]: undefined;
};

export type CategoryScreensList = {
  [CategoryStackRoutes.CategoryEntities]: undefined;
  [CategoryStackRoutes.CategoryEntity]: undefined;
};

export type RootScreenTabs = {
  [RootScreenTabsList.Categories]: undefined;
  [RootScreenTabsList.TabTwo]: undefined;
};

export type ScreensList = {
  [RootStackRoutes.Auth]: undefined;
  [RootStackRoutes.Root]: undefined;
  [RootStackRoutes.NotFound]: undefined;
  [AuthStackRoutes.SignUp]: undefined;
  [AuthStackRoutes.SignIn]: undefined;
  [RootStackRoutes.Category]: undefined;
  [RootScreenTabsList.TabTwo]: undefined;
};

export type GlobalScreenProps<Screen extends keyof ScreensList> =
  CompositeScreenProps<
    NativeStackScreenProps<ScreensList, Screen>,
    NativeStackScreenProps<ScreensList>
  >;

export type AuthTabScreenProps<Screen extends keyof AuthScreensList> =
  CompositeScreenProps<
    NativeStackScreenProps<AuthScreensList, Screen>,
    NativeStackScreenProps<AuthScreensList>
  >;

export type RootTabScreenProps<Screen extends keyof RootScreenTabs> =
  CompositeScreenProps<
    BottomTabScreenProps<RootScreenTabs, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
