import React, { useLayoutEffect, useState } from "react";
import StarRating from 'react-native-star-rating';

import { CategoryStackRoutesProps } from "../../../infrastructure/router/interfaces";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CategoryStackRoutes } from "../../../infrastructure/router/enums";
import { Comments } from "../../../components/Comments/index";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { getCurrentCategoryPost } from "../domain/selectors";
import { readImage } from "../../../utils/readImage";
import { Image } from "react-native";
import { View } from "../../../components/Themed";
import { Rating } from "react-native-elements";

export const CategoryPost = () => {
  const [postImage, setPostImage] = useState<ArrayBuffer>();
  const currentPost = useSelector(getCurrentCategoryPost);

  const { params } =
    useRoute<CategoryStackRoutesProps<CategoryStackRoutes.CategoryPost>>();

  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: params.categoryEntityTitle });
  }, [params.categoryEntityTitle]);

  useLayoutEffect(() => {
    if (currentPost?.image) {
      readImage(currentPost.image, setPostImage);
    }
  }, [currentPost?.image]);

  return (
    <>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: postImage as unknown as string }}
          resizeMode="stretch"
          resizeMethod="resize"
          style={styles.imageStyles}
        />
        <Rating
        />
      </View>
      <Comments />
    </>
  );
};

export default CategoryPost;

const styles = StyleSheet.create({
  imageWrapper: {
    height: "40%",
    display: "flex",
    flexDirection: "column",
    alignItems: 'center'
  },
  imageStyles: {
    height: '70%',
    marginTop: 10,
    width: '80%'
  }
});
