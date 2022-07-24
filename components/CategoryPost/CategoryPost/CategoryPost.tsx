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

  return <Comments />;
};

export default CategoryPost;