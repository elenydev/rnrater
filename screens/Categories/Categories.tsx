import { Category } from "../../infrastructure/components/interfaces/Category";
import * as React from "react";
import { FlatList } from "react-native";

import CategoryCard from "../../components/Category/CategoryCard/CategoryCard";

const dummyCat: Category[] = [
  {
    name: "Movies",
    id: "1",
  },
  {
    name: "Music",
    id: "2",
  },
  {
    name: "Cars",
    id: "3",
  },
  {
    name: "Memes",
    id: "4",
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
