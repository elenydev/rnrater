import { Text } from "../../Themed";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { CategoryStackRoutesProps } from "../../../infrastructure/router/interfaces";
import { CategoryStackRoutes } from "../../../infrastructure/router/enums";

const CategoryEntitiesList = () => {
  const { params } = useRoute<CategoryStackRoutesProps<CategoryStackRoutes.CategoryEntities>>();
  return <Text>i'm entites list</Text>;
};

export default CategoryEntitiesList;
