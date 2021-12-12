import { Category } from "../../../infrastructure/components/interfaces/Category";
import * as React from "react";

import { FlatList } from "react-native";

import { useSelector } from "react-redux";
import { getUserStoreLoading } from "../../../components/Auth/domain/selectors";

import CategoryCard from "../../Categories/Categories/CategoryCard/CategoryCard";
import Loader from "../../../components/Loader";

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
  const isLoading = useSelector(getUserStoreLoading);
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
