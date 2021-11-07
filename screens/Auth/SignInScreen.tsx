import {
  Button,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Text, View } from "../../components/Themed";
import { GlobalScreenProps } from "../../infrastructure/router/interfaces";
import { EMAIL_REGEX } from "../../constants/Util";
import { AuthStackRoutes, RootStackRoutes } from "infrastructure/router/enums";

interface State {
  email?: string;
  password?: string;
}

const defaultValues: State = {
  email: undefined,
  password: undefined,
};

const SignInScreen = ({
  navigation,
}: GlobalScreenProps<AuthStackRoutes.SignIn>) => {
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const handleLogin = useCallback(() => {
    navigation.navigate(RootStackRoutes.Root);
    reset();
  }, []);

  const handleRedirect = useCallback(() => {
    navigation.navigate(AuthStackRoutes.SignUp);
  }, []);

  useEffect(() => {
    const formErrors = errors ? Object.keys(errors) : undefined;
    const firstErrorKey = formErrors?.length ? formErrors[0] : undefined;
    setFormError(
      firstErrorKey
        ? errors[firstErrorKey as keyof typeof errors]?.message
        : undefined
    );
  }, [errors.email, errors.password]);

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
          rules={{
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value: EMAIL_REGEX,
              message: "Please provide correct e-mail",
            },
          }}
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
          rules={{
            required: {
              value: true,
              message: "Password is required",
            },
          }}
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

export default SignInScreen;
