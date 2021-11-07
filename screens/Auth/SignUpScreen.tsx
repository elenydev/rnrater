import {
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import React, { useCallback, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Text, View } from "../../components/Themed";
import { GlobalScreenProps } from "../../infrastructure/router/interfaces";
import { EMAIL_REGEX } from "../../constants/Util";
import {
  AuthStackRoutes,
  RootStackRoutes,
} from "../../infrastructure/router/enums";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";

interface State {
  firstName?: string;
  lastName?: string;
  nickname?: string;
  email?: string;
  password?: string;
  avatar?: string;
}

const defaultValues: State = {
  firstName: undefined,
  lastName: undefined,
  nickname: undefined,
  email: undefined,
  password: undefined,
  avatar: undefined,
};

const SignUpScreen = ({
  navigation,
}: GlobalScreenProps<AuthStackRoutes.SignIn>) => {
  const [imagePreview, setImagePreview] = useState<string | undefined>();
  const [formError, setFormError] = useState<string | undefined>();
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const handleSignUp = useCallback(() => {
    navigation.navigate(RootStackRoutes.Root);
    reset();
  }, []);

  const handleAvatarPick = useCallback(async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (permission.granted) {
      const imagePickResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!imagePickResult.cancelled) {
        console.log(imagePickResult.uri);
        setImagePreview(imagePickResult.uri);
      }
    }
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
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                value={field.value}
                onChangeText={(value) => field.onChange(value)}
                style={styles.input}
                placeholder="First Name"
              />
            )}
            rules={{
              required: {
                value: true,
                message: "First Name is required",
              },
            }}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                value={field.value}
                onChangeText={(value) => field.onChange(value)}
                style={styles.input}
                placeholder="Last Name"
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Last Name is required",
              },
            }}
          />
          <Controller
            name="nickname"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                value={field.value}
                onChangeText={(value) => field.onChange(value)}
                style={styles.input}
                placeholder="Nickname"
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Nickname is required",
              },
            }}
          />
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

          <Controller
            name="avatar"
            control={control}
            render={({ field }) => (
              <FontAwesome.Button
                {...field}
                name="photo"
                size={10}
                iconStyle={styles.avatarPicker}
                onPress={handleAvatarPick}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Avatar is required",
              },
            }}
          />
          {imagePreview && (
            <View style={styles.imageBox}>
              <Image
                source={{ uri: imagePreview }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
                resizeMode="cover"
              />
            </View>
          )}

          <View>{formError && <Text>{formError}</Text>}</View>

          <View style={styles.buttonsContainer}>
            <Button title="Sing Up" onPress={handleSignUp} />
          </View>
        </View>
      </View>
    </ScrollView>
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
  avatarPicker: {
    marginRight: 0,
    justifyContent: "center",
  },
  imageBox: {
    // width: 100,
    // height: 100,
    marginTop: 20,
    borderRadius: 50
  },
});

export default SignUpScreen;
