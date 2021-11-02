import { Category } from "../../../infrastructure/components/interfaces/Category";
import React, { FC } from "react";
import { View, Text } from "../../../components/Themed";
import { ImageBackground, StyleSheet } from "react-native";

interface ComponentProps {
  category: Category;
}

const CategoryCard: FC<ComponentProps> = (props: ComponentProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <ImageBackground
          style={styles.image}
          source={{
            uri: "https://facebook.github.io/react/img/logo_og.png",
          }}
          resizeMode="cover"
        />
      </View>
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
    position: "relative",
  },
  image: {
    width: "100%",
    height: "auto",
  },
});

export default CategoryCard;
