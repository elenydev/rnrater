import { Category } from "../infrastructure/components/interfaces/Category";
import * as React from "react";
import { FlatList, ScrollView, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import CategoryCard from "../components/Category/CategoryCard/CategoryCard";

const dummyCat: Category[] = [
  {
    name: "Movies",
  },
  {
    name: "Music",
  },
  {
    name: "Cars",
  },
  {
    name: "Memes",
  },
];

export default function TabOneScreen() {
  return (
      <FlatList
        data={dummyCat}
        keyExtractor={(item) => item.name}
        renderItem={(itemData) => <CategoryCard category={itemData.item} />}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },
});
