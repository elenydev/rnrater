import { SetStateAction } from "react";

export const readImage = (
  image: Blob,
  callback: (
    imageContent: ArrayBuffer | SetStateAction<ArrayBuffer | undefined>
  ) => void
): void => {
  const fileReader = new FileReader();

  fileReader.onloadend = () => {
    callback(fileReader.result as ArrayBuffer);
  };
  return fileReader.readAsDataURL(image);
};
