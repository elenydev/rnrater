import { Text, View } from '../../../../Themed';
import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { CategoryStackRoutesProps, CategoryStackScreenRoutes } from '../../../../../infrastructure/router/interfaces';
import { CategoryStackRoutes } from '../../../../../infrastructure/router/enums';
import { FlatList, StyleSheet } from 'react-native';
import CategoryEntity from './CategoryEntity/CategoryEntity';

import { Button } from 'react-native-elements';
import { useCategoryItems } from '../../../../../components/CategoryPost/hooks/useCategoryItems';
import Loader from '../../../../../components/Loader';

const CategoryEntitiesList = () => {
  const { params } =
    useRoute<CategoryStackRoutesProps<CategoryStackRoutes.CategoryEntities>>();
  const navigation = useNavigation<CategoryStackScreenRoutes>();
  const { isLoading, loadCategoryItems, list } = useCategoryItems({
    categoryId: params.categoryId
  });
  const controller = useRef<AbortController | undefined>();

  useEffect(() => {
    controller.current = new AbortController();
    if (controller.current) {
      loadCategoryItems(controller.current);
    }

    return () => {
      controller.current?.abort();
    };
  }, [params.categoryId]);

  useLayoutEffect(() => {
    navigation.setOptions({ title: params.categoryName });
  }, [navigation, params]);

  const goToAddCategoryPost = useCallback(() => {
    navigation.navigate(CategoryStackRoutes.CreateCategoryPost, {
      categoryId: params.categoryId
    });
  }, []);

  const refreshCategoryItems = useCallback(() => {
    if (controller.current != null) {
      loadCategoryItems(controller.current);
    }
  }, []);

  return (
    <View style={styles.entitiesWrapper}>
      {isLoading
        ? (
        <Loader />
          )
        : (
        <FlatList
          data={list}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <CategoryEntity
              id={itemData.item.id}
              categoryId={params.categoryId}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyList}>
              <Text>List of category posts is empty</Text>
            </View>
          }
          contentContainerStyle={{
            flexGrow: 1,
            display: 'flex'
          }}
          ListFooterComponent={
            <View style={styles.buttonBox}>
              <Button
                title={'Add Category Post'}
                style={styles.button}
                onPress={goToAddCategoryPost}
              />
            </View>
          }
          refreshing={isLoading}
          onRefresh={refreshCategoryItems}
        />
          )}
    </View>
  );
};

const styles = StyleSheet.create({
  entitiesWrapper: {
    backgroundColor: '#fff'
  },
  emptyList: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  buttonBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 20
  },
  button: {
    width: '30%'
  }
});

export default CategoryEntitiesList;
