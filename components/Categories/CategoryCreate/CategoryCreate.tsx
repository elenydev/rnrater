import Loader from "../../../components/Loader";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useCategories } from "../hooks/useCategories";
import Form from "./Form/Form";

const CategoryCreate = () => {
  const { isLoading } = useCategories();

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
