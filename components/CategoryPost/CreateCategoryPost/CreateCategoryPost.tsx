import Loader from "../../../components/Loader";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Form from "./Form/Form";
import { useCategoryItems } from "../hooks/useCategoryItems";
import { CategoryStackRoutesProps } from "../../../infrastructure/router/interfaces";
import { CategoryStackRoutes } from "../../../infrastructure/router/enums";
import { useRoute } from "@react-navigation/native";

const CategoryCreate = () => {
  const { params } =
    useRoute<
      CategoryStackRoutesProps<CategoryStackRoutes.CreateCategoryPost>
    >();
  const { isLoading } = useCategoryItems({ categoryId: params.categoryId });

  return (
    <ScrollView
      contentContainerStyle={{ ...styles.container }}
      keyboardShouldPersistTaps="never"
    >
      {isLoading ? <Loader /> : <Form />}
    </ScrollView>
  );
};

export default CategoryCreate;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
