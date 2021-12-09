export const readImage = (image: Blob): ArrayBuffer | string => {
  const fileReader = new FileReader();
  const imageData: (ArrayBuffer | string)[] = [];

  fileReader.readAsDataURL(image);

  fileReader.onloadend = () => {
    imageData.push(fileReader.result);
  };
  return imageData[0];
};
