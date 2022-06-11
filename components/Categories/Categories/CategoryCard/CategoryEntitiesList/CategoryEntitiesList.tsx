import { Text, View } from "../../../../Themed";
import React, { useCallback, useLayoutEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { CategoryStackRoutesProps } from "../../../../../infrastructure/router/interfaces";
import { CategoryStackRoutes } from "../../../../../infrastructure/router/enums";
import { FlatList, StyleSheet } from "react-native";
import CategoryEntity from "./CategoryEntity/CategoryEntity";
import { useNavigation } from "@react-navigation/native";
import { CategoryStackScreenRoutes } from "../../../../../infrastructure/router/interfaces";
import { Button } from "react-native-elements";

const dummyEntity = [
  {
    title: "Fancy cars",
    description: `Check this out, that's a nice car`,
    id: "1",
  },
  {
    title: "Fancy carr",
    description: `Check this out, that's a nice car`,
    id: "1",
  },
  {
    title: "Fancy cara",
    description: `Check this out, that's a nice car`,
    id: "1",
  },
  {
    title: "Fancy carz",
    description: `Check this out, that's a nice car`,
    id: "1",
  },
  {
    title: "Fancy cart",
    description: `Check this out, that's a nice car`,
    id: "1",
  },
  {
    title: "Fancy cary",
    description: `Check this out, that's a nice car`,
    id: "1",
  },
  {
    title: "Fancy caru",
    description: `Check this out, that's a nice car`,
    id: "1",
  },
];

const CategoryEntitiesList = () => {
  const { params } =
    useRoute<CategoryStackRoutesProps<CategoryStackRoutes.CategoryEntities>>();
  const navigation = useNavigation<CategoryStackScreenRoutes>();

  useLayoutEffect(() => {
    navigation.setOptions({ title: params.categoryName });
  }, [navigation, params]);

  const goToAddCategoryPost = useCallback(() => {
    navigation.navigate(CategoryStackRoutes.CreateCategoryPost, {
      categoryId: params.categoryId,
    });
  }, []);

  return (
    <View style={styles.entitiesWrapper}>
      <FlatList
        data={dummyEntity}
        keyExtractor={(item) => item.title}
        renderItem={(itemData) => <CategoryEntity entity={itemData.item} />}
        ListEmptyComponent={
          <View style={styles.emptyList}>
            <Text>List of category posts is empty</Text>
          </View>
        }
        contentContainerStyle={{
          flexGrow: 1,
          display: "flex",
        }}
        ListFooterComponent={
          <View style={styles.buttonBox}>
            <Button
              title={"Add Category Post"}
              style={styles.button}
              onPress={goToAddCategoryPost}
            />
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  entitiesWrapper: {
    backgroundColor: "#fff",
  },
  emptyList: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});

export default CategoryEntitiesList;
