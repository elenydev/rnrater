import React, { useEffect, useLayoutEffect, useState } from 'react';

import { CategoryStackRoutesProps } from '../../../infrastructure/router/interfaces';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CategoryStackRoutes } from '../../../infrastructure/router/enums';
import { Comments } from '../../../components/Comments/index';
import { StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentCategoryPost } from '../domain/selectors';
import { readImage } from '../../../utils/readImage';

import { Text, View } from '../../../components/Themed';
import { getCategoryPostTrigger } from '../domain/actions';

export const CategoryPost = () => {
  const [postImage, setPostImage] = useState<ArrayBuffer>();
  const currentPost = useSelector(getCurrentCategoryPost);
  const dispatch = useDispatch();

  const { params } =
    useRoute<CategoryStackRoutesProps<CategoryStackRoutes.CategoryPost>>();

  const navigation = useNavigation();

  useEffect(() => {
    if (currentPost == null) {
      const controller = new AbortController();
      dispatch(
        getCategoryPostTrigger({
          categoryPostId: params.categoryEntityId,
          controller
        })
      );

      return () => {
        controller.abort;
      };
    }
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({ title: params.categoryEntityTitle });
  }, [params.categoryEntityTitle]);

  useLayoutEffect(() => {
    if ((currentPost?.image) != null) {
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
        <Text style={styles.description} numberOfLines={2}>
          {currentPost?.description}
        </Text>
      </View>
      <Comments />
    </>
  );
};

export default CategoryPost;

const styles = StyleSheet.create({
  imageWrapper: {
    height: '40%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  imageStyles: {
    height: '70%',
    marginTop: 10,
    width: '80%'
  },
  description: {
    marginVertical: 7,
    fontSize: 16
  }
});
