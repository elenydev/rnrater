import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Form from "./Form/Form";

const CategoryCreate = () => {
  return (
    <ScrollView
      contentContainerStyle={{ ...styles.container }}
      keyboardShouldPersistTaps="never"
    >
      <Form />
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
