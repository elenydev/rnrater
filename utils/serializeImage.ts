import * as ImagePicker from "expo-image-picker";

export interface SerializedImage {
  fileName: string;
  uri: string;
  width: number;
  height: number;
  type?: "image" | "video";
  exif?: {
    [key: string]: any;
  };
  base64?: string;
  path: string;
}

export const serializeImage = (
  imagePickResult: ImagePicker.ImagePickerResult
): SerializedImage | undefined => {
  if (!imagePickResult.cancelled) {
    const fileName = imagePickResult.uri.split("ImagePicker/")[1];
    return {
      ...imagePickResult,
      fileName,
      path: imagePickResult.uri
    };
  }
};
