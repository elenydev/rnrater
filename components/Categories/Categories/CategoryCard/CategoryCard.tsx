import { CategoryWithCover } from "../../../../infrastructure/models/Category";
import React, { FC, useCallback, useLayoutEffect, useState } from "react";
import { View, Text } from "../../../../components/Themed";
import { ImageBackground, StyleSheet, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CategoryStackScreenRoutes } from "../../../../infrastructure/router/interfaces";
import { CategoryStackRoutes } from "../../../../infrastructure/router/enums";
import { readImage } from "../../../../utils/readImage";
import Loader from "../../../../components/Loader";

interface ComponentProps {
  category: CategoryWithCover;
}

const CategoryCard: FC<ComponentProps> = (props: ComponentProps) => {
  const navigation = useNavigation<CategoryStackScreenRoutes>();
  const [categoryImage, setCategoryImage] = useState<ArrayBuffer>();

  const onCardPress = useCallback(() => {
    navigation.navigate(CategoryStackRoutes.CategoryEntities, {
      categoryId: props.category.id,
      categoryName: props.category.name,
    });
  }, [navigation, props.category.id]);

  useLayoutEffect(() => {
    if (props.category.coverImage) {
      readImage(props.category.coverImage, setCategoryImage);
    }
  }, [props.category.coverImage]);

  return (
    <View style={styles.container}>
      {categoryImage ? (
        <TouchableHighlight style={styles.item} onPress={onCardPress}>
          <ImageBackground
            style={styles.image}
            imageStyle= {{
              borderRadius: 10
            }}
            source={{ uri: categoryImage as unknown as string }}
            resizeMode="stretch"
          >
            <View style={styles.contentWrapper}>
              <Text
                style={styles.text}
              >{props.category.name}</Text>
            </View>
          </ImageBackground>
        </TouchableHighlight>
      ) : (
        <Loader />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  item: {
    flex: 1,
    elevation: 5,
    borderRadius: 10,
    shadowRadius: 8,
    shadowColor: "black",
    shadowOpacity: 0.25,
    marginBottom: 20,
    width: "80%",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: "transparent",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    textShadowColor: 'white',
    textShadowRadius: 10
  }
});

export default CategoryCard;
