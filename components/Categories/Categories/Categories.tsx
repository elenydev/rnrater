import { Category } from "../../../infrastructure/components/interfaces/Category";
import * as React from "react";

import { FlatList, StyleSheet } from "react-native";

import CategoryCard from "../../Categories/Categories/CategoryCard/CategoryCard";
import Loader from "../../../components/Loader";
import { useCategories } from "../hooks/useCategories";
import { Text, View } from "../../../components/Themed";
import { Button, ListItem } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { CategoryStackScreenRoutes } from "../../../infrastructure/router/interfaces";
import { CategoryStackRoutes } from "../../../infrastructure/router/enums";

export default function Categories() {
  const { isLoading, loadCategories, categoriesList } = useCategories();
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
      <View style={styles.listWrapper}>
        <FlatList
          data={categoriesList}
          keyExtractor={(item) => item.id}
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
          ListEmptyComponent={
            <View style={styles.emptyList}>
              <Text>List of categories is empty</Text>
            </View>
          }
          contentContainerStyle={{
            flexGrow: 1,
            display: "flex",
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  listWrapper: {
    flex: 1,
  },
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
  emptyList: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
