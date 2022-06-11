import { SerializedImage } from "../../../utils/serializeImage";

export interface FormState {
  title?: string;
  categoryPostImage?: SerializedImage;
}

export const defaultValues: FormState = {
  title: undefined,
  categoryPostImage: undefined,
};

export const validationRules = {
  title: {
    required: {
      value: true,
      message: "Category name is required",
    },
  },
  categoryPostImage: {
    required: {
      value: true,
      message: "Category image is required",
    },
  },
};
