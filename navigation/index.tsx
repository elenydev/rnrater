import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import NotFoundScreen from "../screens/NotFoundScreen";
import Categories from "../screens/Categories/Categories";
import CategoryEntitiesList from "../screens/Categories/CategoryEntitiesList/CategoryEntitiesList";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import SignInScreen from "../screens/Auth/SignInScreen";
import {
  RootStackParamList,
  RootTabScreenProps,
  AuthScreensList,
  CategoryScreensList,
  RootScreenTabs,
  GlobalHistory,
} from "../infrastructure/router/interfaces";
import LinkingConfiguration from "./LinkingConfiguration";
import {
  AuthStackRoutes,
  CategoryStackRoutes,
  RootStackRoutes,
  RootScreenTabs as RootScreenTabsList,
} from "../infrastructure/router/enums";
import { useNavigation } from "@react-navigation/native";
import { setHistoryManager } from "../managers/HistoryManager/actions";
import HistoryManager from "../managers/HistoryManager/HistoryManager";
import { useDispatch } from "react-redux";
import Profile from "../components/Profile/Profile";
import { socket } from "../services/sockets";
import CategoryCreate from "../screens/Categories/CategoryCreate/CategoryCreate";
import CreateCategoryPost from "../screens/Categories/CreateCategoryPost/CreateCategoryPost";
import CategoryPost from "../screens/Categories/CategoryPost/CategoryPost";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const AuthRoutes = createNativeStackNavigator<AuthScreensList>();

function AuthNavigation() {
  return (
    <AuthRoutes.Group>
      <AuthRoutes.Screen
        name={AuthStackRoutes.SignIn}
        component={SignInScreen}
        options={{ title: "Sign In" }}
      />
      <AuthRoutes.Screen
        name={AuthStackRoutes.SignUp}
        component={SignUpScreen}
        options={{ title: "Sign Up" }}
      />
    </AuthRoutes.Group>
  );
}

const CategoryRoutes = createNativeStackNavigator<CategoryScreensList>();

function CategoryNavigation() {
  return (
    <CategoryRoutes.Group>
      <CategoryRoutes.Screen
        name={CategoryStackRoutes.CategoryEntities}
        component={CategoryEntitiesList}
      />
      <CategoryRoutes.Screen
        name={CategoryStackRoutes.CategoryPost}
        component={CategoryPost}
      />
      <CategoryRoutes.Screen
        name={CategoryStackRoutes.CategoryCreate}
        component={CategoryCreate}
        options={{ title: "Create Category" }}
      />
      <CategoryRoutes.Screen
        name={CategoryStackRoutes.CreateCategoryPost}
        component={CreateCategoryPost}
        options={{ title: "Create Category Post" }}
      />
    </CategoryRoutes.Group>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  dispatch(
    setHistoryManager(
      new HistoryManager(navigation as unknown as GlobalHistory)
    )
  );
  return (
    <Stack.Navigator>
      {AuthNavigation()}
      <Stack.Screen
        name={RootStackRoutes.Root}
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />

      {CategoryNavigation()}
      <Stack.Screen
        name={RootStackRoutes.NotFound}
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootScreenTabs>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName={RootScreenTabsList.Categories}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name={RootScreenTabsList.Categories}
        component={Categories}
        options={({
          navigation,
        }: RootTabScreenProps<RootScreenTabsList.Categories>) => ({
          title: "Categories",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate(RootScreenTabsList.Categories)}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name={RootScreenTabsList.TabTwo}
        component={Profile}
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="user-circle" color={color} />
          ),
          headerLeft: () => <Pressable></Pressable>,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
