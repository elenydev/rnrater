import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../infrastructure/router/interfaces";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Auth: {
        screens: {
          SignUp: {
            screens: {
              SignUpScreen: "signUp",
            },
          },
          SignIn: {
            screens: {
              SignInScreen: "signIn",
            },
          },
        },
      },
      Root: {
        screens: {
          Categories: {
            screens: {
              Categories: "Categories",
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: "two",
            },
          },
        },
      },
      Category: {
        screens: {
          CategoryEntities: {
            screens: {
              AllEntites: "Category Entities",
            },
          },
          CategoryEntity: {
            screens: {
              Entity: "Entity",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};

export default linking;
