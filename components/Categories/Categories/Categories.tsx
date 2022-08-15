import * as React from 'react';

import { FlatList, StyleSheet } from 'react-native';

import CategoryCard from '../../Categories/Categories/CategoryCard/CategoryCard';
import Loader from '../../../components/Loader';
import { useCategories } from '../hooks/useCategories';
import { Text, View } from '../../../components/Themed';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { CategoryStackScreenRoutes } from '../../../infrastructure/router/interfaces';
import { CategoryStackRoutes } from '../../../infrastructure/router/enums';

export default function Categories () {
  const { isLoading, loadCategories, categoriesList } = useCategories();
  const navigation = useNavigation<CategoryStackScreenRoutes>();
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    isMounted.current = true;

    if (isMounted) {
      loadCategories();
    }

    return () => {
      isMounted.current = false;
    };
  }, []);

  const goToAddCategory = React.useCallback(() => {
    navigation.navigate(CategoryStackRoutes.CategoryCreate);
  }, []);

  return isLoading
    ? (
    <Loader />
      )
    : (
    <>
      <View style={styles.listWrapper}>
        <FlatList
          data={categoriesList}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => <CategoryCard category={itemData.item} />}
          ListFooterComponent={
            <View style={styles.buttonBox}>
              <Button
                title={'Add Category'}
                style={styles.button}
                onPress={goToAddCategory}
              />
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyList}>
              <Text>List of categories is empty</Text>
            </View>
          }
          contentContainerStyle={{
            flexGrow: 1,
            display: 'flex'
          }}
          refreshing={isLoading}
          onRefresh={loadCategories}
        />
      </View>
    </>
      );
}

const styles = StyleSheet.create({
  listWrapper: {
    flex: 1
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
  },
  emptyList: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
