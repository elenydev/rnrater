import { getFormManager } from "../../../managers/FormManager/selectors";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormInstanceName } from "../../../managers/FormManager/enums";
import { useCustomForm } from "../../../hooks/useCustomForm";
import { defaultValues, validationRules } from "./formConfig";
import { Controller } from "react-hook-form";
import { StyleSheet, Image, TextInput, Button } from "react-native";
import { View, Text } from "../../../components/Themed";
import * as ImagePickerExpo from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { serializeImage } from "../../../utils/serializeImage";
import { PostCategoryPostParams } from "../../../api/categoryPost/post/interfaces";
import { useCategoryItems } from "../hooks/useCategoryItems";
import { useRoute } from "@react-navigation/native";
import { CategoryStackRoutes } from "../../../infrastructure/router/enums";
import { CategoryStackRoutesProps } from "../../../infrastructure/router/interfaces";

const Form = () => {
  const dispatch = useDispatch();
  const { params } =
    useRoute<CategoryStackRoutesProps<CategoryStackRoutes.CreateCategoryPost>>();
  const { createCategoryPost } = useCategoryItems({
    categoryId: params.categoryId,
  });
  const [imagePreview, setImagePreview] = useState<string | undefined>();
  const formManager = useSelector(getFormManager);
  const { formInstance, formError } = useCustomForm({
    defaultValues,
  });
  const { setValue, clearErrors, control, handleSubmit } = formInstance;

  formManager.setFormInstance({
    formName: FormInstanceName.CreateCategoryPost,
    formInstance,
    additionalActions: () => setImagePreview(undefined),
  });

  const handleCreateCategoryPost = useCallback(
    (data: Omit<PostCategoryPostParams, "categoryId">) => {
      dispatch(createCategoryPost(data));
    },
    []
  );

  const handleCategoryPostImagePick = useCallback(async () => {
    const permission = await ImagePickerExpo.requestCameraPermissionsAsync();

    if (permission.granted) {
      const imagePickResult = await ImagePickerExpo.launchImageLibraryAsync({
        mediaTypes: ImagePickerExpo.MediaTypeOptions.Images,
      });

      if (imagePickResult) {
        const serializedImage = serializeImage(imagePickResult);
        if (serializedImage) {
          setValue("categoryPostImage", serializedImage);
          clearErrors("categoryPostImage");
          setImagePreview(serializedImage.uri);
        }
      }
    }
  }, []);

  return (
    <View style={styles.formContainer}>
      {imagePreview && (
        <View style={styles.imageBox}>
          <Image
            source={{ uri: imagePreview }}
            style={{ width: 200, height: 200 }}
            resizeMode="cover"
          />
        </View>
      )}

      <Controller
        name="categoryPostImage"
        control={control}
        render={({ field }) => (
          <FontAwesome.Button
            {...field}
            name="photo"
            size={10}
            iconStyle={styles.categoryImagePicker}
            onPress={handleCategoryPostImagePick}
          />
        )}
        rules={validationRules.categoryPostImage}
      />

      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            value={field.value}
            onChangeText={(value) => field.onChange(value)}
            style={styles.input}
            placeholder="Category Name"
          />
        )}
        rules={validationRules.title}
      />

      <View>
        {formError && <Text style={styles.validationText}>{formError}</Text>}
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          title="Create Category Post"
          onPress={handleSubmit(handleCreateCategoryPost)}
        />
      </View>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    alignItems: "center",
    width: "80%",
    paddingHorizontal: 15,
    shadowColor: "#000",
    elevation: 2,
  },
  input: {
    width: "90%",
    fontSize: 16,
    padding: 5,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    marginVertical: 30,
  },
  validationContainer: {
    padding: 10,
    textAlign: "center",
  },
  validationText: {
    color: "#ff0000",
    marginTop: 14,
  },
  categoryImagePicker: {
    marginRight: 0,
    justifyContent: "center",
  },
  imageBox: {
    marginVertical: 30,
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
    marginBottom: 15,
  },
});
