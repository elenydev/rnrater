import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../infrastructure/router/interfaces";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      auth: {
        screens: {
          signUp: {
            screens: {
              signUp: "signUp",
            },
          },
          signIn: {
            screens: {
              signInScreen: "signIn",
            },
          },
        },
      },
      root: {
        screens: {
          categories: {
            screens: {
              categories: "categories",
            },
          },
          tabTwo: {
            screens: {
              tabTwoScreen: "two",
            },
          },
        },
      },
      category: {
        screens: {
          categoryEntities: {
            screens: {
              allEntites: "Category Entities",
            },
          },
          categoryEntity: {
            screens: {
              entity: "Entity",
            },
          },
          createCategoryPost: {
            screens: {
              createCategoryPost: 'Create Category Post'
            }
          }
        },
      },
      notFound: "*",
    },
  },
};

export default linking;
