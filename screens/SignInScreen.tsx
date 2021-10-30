import { Button, StyleSheet, TextInput } from "react-native";

import React, { useCallback } from "react";
import { View, Text } from "../components/Themed";
import { AuthTabScreenProps } from "../types";

const SignInScreen = ({ navigation }: AuthTabScreenProps<"SignIn">) => {
  const handleLogin = useCallback(() => {
    console.log("TEST");
  }, []);

  const handleRedirect = useCallback(() => {
    navigation.navigate("SignUp");
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput placeholder="E-mail" />
        <TextInput placeholder="Password" />
        <View style={styles.buttonsContainer}>
          <Button title="Sing In" onPress={handleLogin} />
          <Button title="Sing Up" onPress={handleRedirect} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "50%",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 15,
    shadowColor: "#000",
    elevation: 2,
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
});

export default SignInScreen;
