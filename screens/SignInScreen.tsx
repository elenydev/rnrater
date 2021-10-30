import { Button, StyleSheet, TextInput } from "react-native";

import React, { useCallback, useState } from "react";
import { Text, View } from "../components/Themed";
import { GlobalScreenProps, ValidationStatus } from "../types";
import SignInValidator from "../validators/SignInValidator";

const SignInScreen = ({ navigation }: GlobalScreenProps<"SignIn">) => {
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [validation, setValidation] = useState<ValidationStatus>({
    validationError: false,
  });

  const handleLogin = useCallback(() => {
    const validationStatus = validateFields();
    if (!validationStatus.validationError) {
      navigation.navigate("Root");
    }
  }, [email, password]);

  const handleRedirect = useCallback(() => {
    navigation.navigate("SignUp");
  }, []);

  const validateFields = useCallback(() => {
    const validationStatus = new SignInValidator(
      email,
      password
    ).getValidationStatus();

    setValidation(validationStatus);
    return validationStatus;
  }, [validation, email, password]);

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
        {validation.validationError && (
          <View style={styles.validationContainer}>
            <Text style={styles.validationText}>{validation.message}</Text>
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
