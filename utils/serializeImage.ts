import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';

export interface SerializedImage {
  name: string
  type: string
  uri: string
}

export const serializeImage = (
  imagePickResult: ImagePicker.ImagePickerResult
): SerializedImage | undefined => {
  if (!imagePickResult.cancelled) {
    const name = imagePickResult.uri.split('ImagePicker/')[1];
    const type = name.split('.').pop();

    return {
      name,
      uri:
        Platform.OS === 'ios'
          ? imagePickResult.uri.replace('file://', '')
          : imagePickResult.uri,
      type: type!
    };
  }
};
