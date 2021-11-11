import { Category } from "../../infrastructure/components/interfaces/Category";
import * as React from "react";
import { FlatList } from "react-native";

import CategoryCard from "../../components/Category/CategoryCard/CategoryCard";

const dummyCat: Category[] = [
  {
    name: "Movies",
    id: "Movies",
  },
  {
    name: "Music",
    id: "Music",
  },
  {
    name: "Cars",
    id: "Cars",
  },
  {
    name: "Memes",
    id: "Memes",
  },
];

export default function Categories() {
  return (
    <FlatList
      data={dummyCat}
      keyExtractor={(item) => item.name}
      renderItem={(itemData) => <CategoryCard category={itemData.item} />}
    />
  );
}
