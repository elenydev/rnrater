import { Category } from "../../../infrastructure/components/interfaces/Category";
import * as React from "react";

import { FlatList } from "react-native";

import CategoryCard from "../../Categories/Categories/CategoryCard/CategoryCard";
import Loader from "../../../components/Loader";
import { useCategories } from "../hooks/useCategories";

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
  const { isLoading, loadCategories } = useCategories();

  React.useEffect(() => {
    loadCategories();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <FlatList
      data={dummyCat}
      keyExtractor={(item) => item.name}
      renderItem={(itemData) => <CategoryCard category={itemData.item} />}
    />
  );
}
