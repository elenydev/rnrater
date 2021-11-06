import { Category } from "../../../infrastructure/components/interfaces/Category";
import React, { FC, useCallback } from "react";
import { View, Text } from "../../../components/Themed";
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from '@react-navigation/native';

interface ComponentProps {
  category: Category;
}

const CategoryCard: FC<ComponentProps> = (props: ComponentProps) => {
  const navigation = useNavigation();
  
  const onCardPress = useCallback(() => {
    navigation.navigate('CategoryEntities');
  }, [navigation, props.category.id]);

  return (
    <View style={styles.container}>
      <TouchableHighlight style={styles.item} onPress={onCardPress}>
        <ImageBackground
          style={styles.image}
          source={require("../../../assets/images/icon.png")}
          resizeMode="stretch"
        >
          <View style={styles.contentWrapper}>
            <Text>{props.category.name}</Text>
          </View>
        </ImageBackground>
      </TouchableHighlight>
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
    height: "100%",
    width: "100%",
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default CategoryCard;
