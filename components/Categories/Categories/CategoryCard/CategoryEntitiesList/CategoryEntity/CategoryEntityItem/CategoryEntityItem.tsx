import { Text } from "../../../../../../../components/Themed";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CategoryStackRoutesProps } from "../../../../../../../infrastructure/router/interfaces";
import { CategoryStackRoutes } from "../../../../../../../infrastructure/router/enums";

const CategoryEntityItem = () => {
  const { params } =
    useRoute<
      CategoryStackRoutesProps<CategoryStackRoutes.CategoryEntityItem>
    >();
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: params.categoryEntityTitle });
  }, [params.categoryEntityTitle]);

  return <Text></Text>;
};

export default CategoryEntityItem;
