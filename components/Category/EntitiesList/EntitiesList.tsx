import { Text } from "../../../components/Themed";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { CategoryStackRoutesProps } from "../../../infrastructure/router/interfaces";

const EntitiesList = () => {
  const { params } = useRoute<CategoryStackRoutesProps<"CategoryEntities">>();
  console.log(params);
  return <Text>i'm entites list</Text>;
};

export default EntitiesList;
