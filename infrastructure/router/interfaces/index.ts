import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthScreensList> | undefined;
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Category: NavigatorScreenParams<CategoryScreensList> | undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type CategoryStackScreenProps =
  NativeStackNavigationProp<
    {
      CategoryEntities: {
        categoryId: string;
      };
      CategoryEntity: {
        categoryEntityId: string;
      };
    },
    keyof CategoryScreensList
  >;

export type AuthScreensList = {
  SignUp: undefined;
  SignIn: undefined;
};

export type CategoryScreensList = {
  CategoryEntities: undefined;
  CategoryEntity: undefined;
};

export type RootTabParamList = {
  Categories: undefined;
  TabTwo: undefined;
};

export type ScreensList = {
  Auth: undefined;
  Root: undefined;
  NotFound: undefined;
  SignUp: undefined;
  SignIn: undefined;
  Categories: undefined;
  TabTwo: undefined;
  TabThree: undefined;
  Category: undefined;
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

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
