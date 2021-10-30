import * as React from "react";
import { Button, StyleSheet } from "react-native";
import { RootStackScreenProps } from "types";

import { Text, View } from "../components/Themed";

export default function TabTwoScreen({
  navigation,
}: RootStackScreenProps<"Root">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button
        title="Not Found"
        onPress={() => navigation.replace("NotFound")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
