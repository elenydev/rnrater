import * as ImagePickerExpo from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { Button, StyleSheet, TextInput, ScrollView, Image } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "../../Themed";
import { useCustomForm } from "../../../hooks/useCustomForm";
import { Controller } from "react-hook-form";
import { defaultValues, validationRules } from "./formConfig";
import { serializeImage } from "../../../utils/serializeImage";
import { CreateUserParams } from "../../../api/auth/post/interfaces";
import { CheckBox } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { getFormManager } from "../../../managers/FormManager/selectors";
import { FormInstanceName } from "../../../managers/FormManager/enums";
import { createUserTrigger } from "../domain/actions";

export const SignUp = () => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState<string | undefined>();
  const formManager = useSelector(getFormManager);
  const { formInstance, formError } = useCustomForm({
    defaultValues,
  });
  const { setValue, clearErrors, control, handleSubmit } = formInstance;

  const handleSignUp = useCallback((credentials: CreateUserParams) => {
    dispatch(createUserTrigger(credentials));
  }, []);

  const handleAvatarPick = useCallback(async () => {
    const permission = await ImagePickerExpo.requestCameraPermissionsAsync();

    if (permission.granted) {
      const imagePickResult = await ImagePickerExpo.launchImageLibraryAsync({
        mediaTypes: ImagePickerExpo.MediaTypeOptions.Images,
      });

      if (imagePickResult) {
        const serializedImage = serializeImage(imagePickResult);
        if (serializedImage) {
          setValue("avatar", serializedImage);
          clearErrors("avatar");
          setImagePreview(serializedImage.uri);
        }
      }
    }
  }, []);

  useEffect(() => {
    formManager.setFormInstance({
      formName: FormInstanceName.CreateUser,
      formInstance,
      additionalActions: () => setImagePreview(undefined),
    });
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ ...styles.container }}
      keyboardShouldPersistTaps="never"
    >
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
          rules={validationRules.firstName}
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
          rules={validationRules.lastName}
        />
        <Controller
          name="nickName"
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
          rules={validationRules.nickName}
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

        <Controller
          name="policy"
          control={control}
          render={({ field }) => (
            <View style={styles.policyBox}>
              <Text>Accept Our Policy</Text>
              <CheckBox
                checked={field.value}
                onPress={() => (
                  setValue("policy", !field.value), field.onChange(!field.value)
                )}
              />
            </View>
          )}
          rules={validationRules.policy}
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
          rules={validationRules.avatar}
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

        <View>
          {formError && <Text style={styles.validationText}>{formError}</Text>}
        </View>

        <View style={styles.buttonsContainer}>
          <Button title="Sing Up" onPress={handleSubmit(handleSignUp)} />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
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
    marginTop: 14,
  },
  avatarPicker: {
    marginRight: 0,
    justifyContent: "center",
  },
  imageBox: {
    marginTop: 20,
    borderRadius: 50,
  },
  policyBox: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
});
