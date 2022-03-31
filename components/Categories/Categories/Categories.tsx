import { Category } from "../../../infrastructure/components/interfaces/Category";
import * as React from "react";

import { FlatList, StyleSheet } from "react-native";

import CategoryCard from "../../Categories/Categories/CategoryCard/CategoryCard";
import Loader from "../../../components/Loader";
import { useCategories } from "../hooks/useCategories";
import { View } from "../../../components/Themed";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { CategoryStackScreenRoutes } from "../../../infrastructure/router/interfaces";
import { CategoryStackRoutes } from "../../../infrastructure/router/enums";

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
  const navigation = useNavigation<CategoryStackScreenRoutes>();

  React.useEffect(() => {
    loadCategories();
  }, []);

  const goToAddCategory = React.useCallback(() => {
    navigation.navigate(CategoryStackRoutes.categoryCreate);
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <FlatList
        data={dummyCat}
        keyExtractor={(item) => item.name}
        renderItem={(itemData) => <CategoryCard category={itemData.item} />}
        ListFooterComponent={
          <View style={styles.buttonBox}>
            <Button
              title={"Add Category"}
              style={styles.button}
              onPress={goToAddCategory}
            />
          </View>
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  buttonBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 20,
  },
  button: {
    width: "30%",
  },
});
