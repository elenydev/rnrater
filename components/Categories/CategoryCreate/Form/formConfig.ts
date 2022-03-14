import { SerializedImage } from "../../../../utils/serializeImage";

export interface FormState {
  name?: string;
  categoryImage?: SerializedImage;
}

export const defaultValues: FormState = {
  name: undefined,
  categoryImage: undefined,
};

export const validationRules = {
  name: {
    required: {
      value: true,
      message: "Category name is required",
    },
  },
  categoryImage: {
    required: {
      value: true,
      message: "Category image is required",
    },
  },
};
