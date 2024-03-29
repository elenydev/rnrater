import { getFormManager } from '../../../../managers/FormManager/selectors';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormInstanceName } from '../../../../managers/FormManager/enums';
import { useCustomForm } from '../../../../hooks/useCustomForm';
import { defaultValues, validationRules } from './formConfig';
import { Controller } from 'react-hook-form';
import { StyleSheet, Image, TextInput, Button } from 'react-native';
import { View, Text } from '../../../../components/Themed';
import * as ImagePickerExpo from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { serializeImage } from '../../../../utils/serializeImage';
import { createCategoryTrigger } from '../../../../components/Categories/domain/actions';
import { CreateCategoryParams } from '../../../../api/categories/post/interfaces';

const Form = () => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState<string | undefined>();
  const formManager = useSelector(getFormManager);
  const { formInstance, formError } = useCustomForm({
    defaultValues
  });
  const { setValue, clearErrors, control, handleSubmit } = formInstance;

  const handleCreateCategory = useCallback((data: CreateCategoryParams) => {
    dispatch(createCategoryTrigger(data));
  }, []);

  const handleCategoryImagePick = useCallback(async () => {
    const permission = await ImagePickerExpo.requestCameraPermissionsAsync();

    if (permission.granted) {
      const imagePickResult = await ImagePickerExpo.launchImageLibraryAsync({
        mediaTypes: ImagePickerExpo.MediaTypeOptions.Images
      });

      if (imagePickResult) {
        const serializedImage = serializeImage(imagePickResult);
        if (serializedImage != null) {
          setValue('categoryImage', serializedImage);
          clearErrors('categoryImage');
          setImagePreview(serializedImage.uri);
        }
      }
    }
  }, []);

  useEffect(() => {
    formManager.setFormInstance({
      formName: FormInstanceName.CreateCategory,
      formInstance,
      additionalActions: () => setImagePreview(undefined)
    });
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
        name="categoryImage"
        control={control}
        render={({ field }) => (
          <FontAwesome.Button
            {...field}
            name="photo"
            size={10}
            iconStyle={styles.categoryImagePicker}
            onPress={handleCategoryImagePick}
          />
        )}
        rules={validationRules.categoryImage}
      />

      <Controller
        name="name"
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
        rules={validationRules.name}
      />

      <View>
        {formError && <Text style={styles.validationText}>{formError}</Text>}
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          title="Create Category"
          onPress={handleSubmit(handleCreateCategory)}
        />
      </View>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    alignItems: 'center',
    width: '80%',
    paddingHorizontal: 15,
    shadowColor: '#000',
    elevation: 2
  },
  input: {
    width: '90%',
    fontSize: 16,
    padding: 5,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginVertical: 30
  },
  validationContainer: {
    padding: 10,
    textAlign: 'center'
  },
  validationText: {
    color: '#ff0000',
    marginTop: 14
  },
  categoryImagePicker: {
    marginRight: 0,
    justifyContent: 'center'
  },
  imageBox: {
    marginVertical: 30
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    marginBottom: 15
  }
});
