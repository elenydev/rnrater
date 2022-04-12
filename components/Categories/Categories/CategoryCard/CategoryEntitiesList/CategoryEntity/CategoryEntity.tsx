import { Text, View } from "../../../../../Themed";
import React, { FC, useCallback } from "react";
import { Image, StyleSheet, TouchableHighlight } from "react-native";
import { CategoryStackScreenRoutes } from "../../../../../../infrastructure/router/interfaces";
import { useNavigation } from "@react-navigation/native";
import { CategoryStackRoutes } from "../../../../../../infrastructure/router/enums";

interface ComponentProps {
  entity: {
    title: string;
    description: string;
    id: string;
  };
}

const CategoryEntity: FC<ComponentProps> = (props: ComponentProps) => {
  const navigation = useNavigation<CategoryStackScreenRoutes>();

  const redirectToCategoryItem = useCallback(() => {
    navigation.navigate(CategoryStackRoutes.CategoryEntityItem, {
      categoryEntityId: props.entity.id,
      categoryEntityTitle: props.entity.title,
    });
  }, [props.entity.id]);

  return (
    <View style={styles.wrapper}>
      <TouchableHighlight style={styles.item} onPress={redirectToCategoryItem}>
        <View style={styles.card}>
          <Image
            source={require("../../../../../../assets/images/gtr.jpg")}
            resizeMode="stretch"
            resizeMethod="resize"
            style={styles.image}
          />
          <View style={styles.typographyWrapper}>
            <Text style={styles.title} numberOfLines={1}>
              {props.entity.title}
            </Text>
            <Text style={styles.description} numberOfLines={2}>
              {props.entity.description}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default CategoryEntity;

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
