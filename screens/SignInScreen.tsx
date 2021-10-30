import { Button, StyleSheet, TextInput } from "react-native";

import React, { useCallback, useState } from "react";
import { Text, View } from "../components/Themed";
import { GlobalScreenProps } from "../types";

const SignInScreen = ({ navigation }: GlobalScreenProps<"SignIn">) => {
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [validationError, setValidationError] = useState<boolean>(false);

  const handleLogin = useCallback(() => {
    const error = validateFields();
    if (!error) {
      navigation.navigate("Root");
    }
  }, [email, password]);

  const handleRedirect = useCallback(() => {
    navigation.navigate("SignUp");
  }, []);

  const validateFields = useCallback(() => {
    const validationError =
      email?.trim().length! < 1 ||
      !email?.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i) ||
      password?.trim().length! < 1;
    setValidationError(validationError);
    return validationError;
  }, [validationError, email, password]);

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="E-mail"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholder="Password"
        />
        {validationError && (
          <View style={styles.validationContainer}>
            <Text style={styles.validationText}>
              Please provide correct values
            </Text>
          </View>
        )}
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
    width: "60%",
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
    marginTop: 30,
    marginBottom: 15,
  },
  input: {
    width: "90%",
    fontSize: 20,
    padding: 5,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  validationContainer: {
    padding: 10,
    textAlign: "center",
  },
  validationText: {
    color: "#ff0000",
  },
});

export default SignInScreen;
