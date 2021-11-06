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
import CategoriesEntitiesList from "../screens/Categories/EntitiesList/EntitiesList";
import CategoriesEntity from "../screens/Categories/EntitiesList/Entity/Entity";
import TabTwoScreen from "../screens/TabTwoScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import SignInScreen from "../screens/Auth/SignInScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
  AuthScreensList,
  CategoryScreensList,
} from "../infrastructure/router/interfaces";
import LinkingConfiguration from "./LinkingConfiguration";

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
        name="SignIn"
        component={SignInScreen}
        options={{ title: "Sign In" }}
      />
      <AuthRoutes.Screen
        name="SignUp"
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
        name="CategoryEntities"
        component={CategoriesEntitiesList}
        options={{ title: "Entities" }}
      />
      <CategoryRoutes.Screen
        name="CategoryEntity"
        component={CategoriesEntity}
        options={{ title: "Entity" }}
      />
    </CategoryRoutes.Group>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      {AuthNavigation()}
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Category"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      {CategoryNavigation()}
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Categories"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Categories"
        component={Categories}
        options={({ navigation }: RootTabScreenProps<"Categories">) => ({
          title: "Categories",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Root")}
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
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
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
