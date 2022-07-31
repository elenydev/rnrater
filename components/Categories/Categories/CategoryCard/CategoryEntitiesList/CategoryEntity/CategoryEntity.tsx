import { Text, View } from "../../../../../Themed";
import React, {
  FC,
  memo,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { Image, StyleSheet, TouchableHighlight } from "react-native";
import { CategoryStackScreenRoutes } from "../../../../../../infrastructure/router/interfaces";
import { useNavigation } from "@react-navigation/native";
import { CategoryStackRoutes } from "../../../../../../infrastructure/router/enums";
import { useCategoryItems } from "../../../../../../components/CategoryPost/hooks/useCategoryItems";
import { readImage } from "../../../../../../utils/readImage";
import { useDispatch } from "react-redux";
import { setCurrentCategoryPost } from "../../../../../../components/CategoryPost/domain/actions";

interface ComponentProps {
  id: string;
  categoryId: string;
}

const CategoryEntity: FC<ComponentProps> = (props: ComponentProps) => {
  const navigation = useNavigation<CategoryStackScreenRoutes>();
  const [categoryEntityImage, setCategoryEntityImage] = useState<ArrayBuffer>();
  const { list } = useCategoryItems({ categoryId: props.categoryId });
  const dispatch = useDispatch();

  const item = useMemo(() => {
    return list.find(({ id }) => props.id === id)!;
  }, [list, props.id]);

  const redirectToCategoryPost = useCallback(() => {
    dispatch(setCurrentCategoryPost(item));
    navigation.navigate(CategoryStackRoutes.CategoryPost, {
      categoryEntityId: item.id,
      categoryEntityTitle: item.title,
    });
  }, [item]);

  useLayoutEffect(() => {
    if (item.image) {
      readImage(item.image, setCategoryEntityImage);
    }
  }, [item.image]);

  return (
    <View style={styles.wrapper}>
      <TouchableHighlight style={styles.item} onPress={redirectToCategoryPost}>
        <View style={styles.card}>
          <Image
            source={{ uri: categoryEntityImage as unknown as string }}
            resizeMode="stretch"
            resizeMethod="resize"
            style={styles.image}
          />
          <View style={styles.typographyWrapper}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.description} numberOfLines={2}>
              {item.description}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default memo(CategoryEntity);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: 280,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  item: {
    flex: 1,
    width: "85%",
    elevation: 5,
    borderRadius: 10,
    shadowRadius: 8,
    shadowColor: "black",
    shadowOpacity: 0.25,
    overflow: "hidden",
  },
  image: {
    height: "70%",
    width: "100%",
  },
  typographyWrapper: {
    height: "30%",
    flex: 1,
    padding: 10,
    paddingTop: 5,
  },
  card: {
    flexDirection: "column",
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
  },
});
