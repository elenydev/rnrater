import { StyleSheet, ScrollView } from "react-native";
import React from "react";

import { CategoryStackRoutesProps } from "../../../infrastructure/router/interfaces";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CategoryStackRoutes } from "../../../infrastructure/router/enums";
import { Comments } from "../../../components/Comments/index";

export const CategoryPost = () => {
  const { params } =
    useRoute<CategoryStackRoutesProps<CategoryStackRoutes.CategoryPost>>();

  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: params.categoryEntityTitle });
  }, [params.categoryEntityTitle]);

  return (
    <ScrollView
      contentContainerStyle={{ ...styles.container }}
      keyboardShouldPersistTaps="never"
    >
      <Comments />
    </ScrollView>
  );
};

export default CategoryPost;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
