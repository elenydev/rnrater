import { Button, StyleSheet, TextInput } from "react-native";

import React, { useCallback } from "react";
import { Controller } from "react-hook-form";
import { Text, View } from "../../components/Themed";
import {
  AuthStackScreenRoutes,
  RootStackScreenRoutes,
} from "../../infrastructure/router/interfaces";
import {
  AuthStackRoutes,
  RootStackRoutes,
} from "../../infrastructure/router/enums";
import { useNavigation } from "@react-navigation/native";
import { useCustomForm } from "../../hooks/useCustomForm";
import { defaultValues, validationRules } from "./formConfig";
import { postAuthenticateUser } from "../../api/auth/postAuthenticateUser";
import { AuthenticateUserParams } from "../../api/auth/interfaces";
import { successToast, errorToast } from "../../services/toast";

const SignIn = () => {
  const navigation = useNavigation<
    RootStackScreenRoutes | AuthStackScreenRoutes
  >();

  const { reset, control, formError, handleSubmit } = useCustomForm({
    defaultValues,
  });

  const handleLogin = useCallback(
    async (credentials: AuthenticateUserParams) => {
      try {
        const result = await postAuthenticateUser(credentials);
        successToast(result.message);
        reset();
        (navigation as RootStackScreenRoutes).navigate(RootStackRoutes.Root);
      } catch (error) {
        errorToast(error.message);
      }
    },
    []
  );

  const handleRedirect = useCallback(() => {
    (navigation as AuthStackScreenRoutes).navigate(AuthStackRoutes.SignUp);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              value={field.value}
              onChangeText={(value) => field.onChange(value)}
              style={styles.input}
              placeholder="E-mail"
              keyboardType="email-address"
            />
          )}
          rules={validationRules.email}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              value={field.value}
              onChangeText={(value) => field.onChange(value)}
              style={styles.input}
              placeholder="Password"
              secureTextEntry
            />
          )}
          rules={validationRules.password}
        />

        <View>
          {formError && <Text style={styles.validationText}>{formError}</Text>}
        </View>

        <View style={styles.buttonsContainer}>
          <Button title="Sing In" onPress={handleSubmit(handleLogin)} />
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
    fontSize: 16,
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

export default SignIn;
