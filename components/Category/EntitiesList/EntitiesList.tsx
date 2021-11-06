import { Text } from "../../../components/Themed";
import React from "react";
import { useRoute } from "@react-navigation/native";

const EntitiesList = () => {
  const route = useRoute();
  console.log(route.params)
  return <Text>i'm entites list</Text>;
};

export default EntitiesList;
